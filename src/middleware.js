import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyWithJose } from "./helpers/jwt";

export async function middleware(request) {
  const authorization = cookies().get("Authorization")?.value;
  const isLoggedIn = !!authorization;

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!authorization)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = (await verifyWithJose) < { _id: string } > token;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!authorization) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlists", "/wishlist"],
};
