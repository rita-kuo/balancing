import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 白名單路徑
  const publicPaths = ["/login", "/dashboard"];
  if (
    publicPaths.some((path) => pathname.endsWith(path)) ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 從 cookie 讀 token 與 expires
  const token = request.cookies.get("token")?.value;
  const expires = request.cookies.get("expires")?.value;

  if (!expires || !token || parseInt(expires) < Date.now()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
