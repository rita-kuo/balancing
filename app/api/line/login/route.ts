import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/app/_util/prisma";
import { post } from "@/app/_util/api";
import queryString from "querystring";
import { ipAddress } from "@vercel/functions";
import { addSeconds } from "date-fns";

/**
 * login with LINE login response
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_HOST_NAME)
    throw new Error("NEXT_PUBLIC_HOST_NAME is not set");

  if (!process.env.CHANNEL_ID) throw new Error("CHANNEL_ID is not set");

  if (!process.env.CHANNEL_SECRET) throw new Error("CHANNEL_SECRET is not set");

  const req = (await request.json()) as {
    code: string;
    state: string;
  };

  const loginInfo = await execute((client) =>
    client.loginInfo.findFirst({ where: { state: req.state } }),
  );

  if (!loginInfo)
    return new NextResponse(`Login info not found with state: ${req.state}`, {
      status: 400,
    });

  const idToken = await post(
    `https://api.line.me/oauth2/v2.1/token`,
    queryString.stringify({
      grant_type: "authorization_code",
      code: req.code,
      redirect_uri: encodeURI(`${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`),
      client_id: process.env.CHANNEL_ID,
      client_secret: process.env.CHANNEL_SECRET,
    }),
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  )
    .then((res) => res?.json())
    .then((data) => data.id_token as string);

  const profile = (await post(
    `https://api.line.me/oauth2/v2.1/verify`,
    queryString.stringify({
      id_token: idToken,
      client_id: process.env.CHANNEL_ID,
    }),
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  ).then((res) => res?.json())) as {
    exp: number;
    nonce: string;
    name: string;
    picture: string;
    email: string;
  };

  if (loginInfo.nonce !== profile.nonce) throw new Error("Nonce mismatch");
  const expiresAt = addSeconds(new Date(), profile.exp);
  await execute((client) =>
    client.loginInfo.update({
      where: { id: loginInfo.id },
      data: {
        email: profile.email,
        ip: ipAddress(request),
        idToken,
        expiresAt,
        loggedInAt: new Date(),
      },
    }),
  );

  const user = await execute((client) =>
    client.user.findUnique({ where: { email: profile.email } }),
  );

  if (!user)
    await execute((client) =>
      client.user.create({
        data: {
          email: profile.email,
          name: profile.name,
        },
      }),
    ).then();

  const response = new NextResponse();
  response.cookies.set("token", idToken);
  response.cookies.set("expires", expiresAt.getTime().toString());

  return response;
}
