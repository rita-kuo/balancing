import { NextRequest, NextResponse } from "next/server";
import HttpError from "@/app/api/HttpError";
import { getMeAsUser } from "@/app/api/me/me.service";

/**
 * Get the current user.
 * @returns user?
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(await getMeAsUser(request));
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error);
      return new NextResponse(error.message, { status: error.statusCode });
    }
    throw error;
  }
}
