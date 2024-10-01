import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ErrorHandler from "./helpers/ErrorHandler";
import { verifyWithJose } from "./app/helpers/jwt";


async function  auth(request) {
    const authCookie = cookies().get('Authorization')
    console.log("authCookie: ", authCookie);
    if(!authCookie) throw {message : "Unouthorize" , status:400};
    const [type, token] = authCookie.value.split(' ')
    console.log("token: ", token);
    if(type !== 'Bearer') throw new Error("Invalid Token");
    const payload = await verifyWithJose<{_id:string}>(token);
    console.log(payload , "ini payload");
    const requestHeaders = new Headers(request.headers);
    console.log("payloadTyped: ", payload);
    requestHeaders.set('x-user-id', payload._id);
    // console.log(requestHeaders, "ini request header");
    return requestHeaders;
}

export  async function middleware(request) {
    try {
        // Authentication
        const requestHeaders = await auth(request);
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    } catch (err) {
        return ErrorHandler(err);
    }
}
export const config = {
  matcher: ["/api/store/"],//midleware cuman buat protect back end klo nge fetch
}
