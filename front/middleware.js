import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.url !== "http://localhost:3000/expedition/create_expedition") {
    return NextResponse.redirect(
      new URL("http://localhost:3000/expedition/create_expedition", request.url)
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/expedition/create_expedition",
};
