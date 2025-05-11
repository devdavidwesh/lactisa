import { NextRequest, NextResponse } from "next/server";
import {
  protectedRoutes,
  authRoutes,
  loginPage,
  homePage,
} from "./routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();


  // 1. Redirect unauthenticated users from protected routes
  if (!session?.user && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(loginPage, request.url));
  }

  // 2. Redirect authenticated users away from auth routes
  if (session?.user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(homePage, request.url)
    );
  }

  return NextResponse.next();
}
