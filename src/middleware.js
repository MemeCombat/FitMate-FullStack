import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifyWithJose } from "./app/helpers/jwt";
import ErrorHandler from "./app/helpers/errorHandler";

async function auth(request) {
  const authCookie = cookies().get("Authorization");
  console.log("authCookie: ", authCookie);
  if (!authCookie) throw { message: "Unouthorized", status: 400 };
  const [type, token] = authCookie.value.split(" ");
  console.log("token: ", token);

  if (type !== "Bearer") throw new Error("Invalid Token");
  const payload = await verifyWithJose(token);
  console.log(payload, "ini payload");
  const requestHeaders = new Headers(request.headers);
  console.log("payloadTyped: ", payload);
  requestHeaders.set("x-user-id", payload._id);
  
  return requestHeaders;
}

export async function middleware(request) {
  try {
    // Authentication
    const requestHeaders = await auth(request);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    return ErrorHandler(err);
  }
}
export const config = {
   //midleware cuman buat protect back end klo nge fetch
  matcher: ["/api/store/", "/api/productPhoto" , "/api/generatedPhoto" , "/api/ledger" , "/api/ledger/generateToken"], //midleware cuman buat protect back end klo nge fetch
};
