import { NextRequest } from "next/server";
import { isBefore } from "date-fns";
import { parseInt } from "lodash";
import { execute } from "@/app/_util/prisma";
import HttpError from "@/app/api/HttpError";

export const getMeAsUser = async (request: NextRequest) => {
  const expires = request.cookies.get("expires")?.value;

  if (!expires || isBefore(new Date(parseInt(expires)), new Date())) {
    throw new HttpError(401, "Token expired or not found. Please login again.");
  }

  const token = request.cookies.get("token")?.value;

  const email = (
    await execute((client) =>
      client.loginInfo.findFirst({ where: { idToken: token } }),
    )
  )?.email;

  if (!email)
    throw new HttpError(401, "Token expired or not found. Please login again.");

  const user = await execute((client) =>
    client.user.findUnique({
      where: { email: email },
    }),
  );

  if (!user) throw new HttpError(404, "User not found");

  return user;
};
