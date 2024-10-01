import { cookies } from "next/headers";
import { verifyWithJose } from "./helpers/jwt";
import { NextRequest, NextResponse } from "next/server";
import ErrorHandler from "./helpers/ErrorHandler";
import { toast } from "react-toastify";

async function auth(request: NextRequest) {
    const authCookie = cookies().get('Authorization')
    // console.log("authCookie: ", authCookie);
    if(!authCookie) throw {message : "Unouthorize" , status:400};
    const [type, token] = authCookie.value.split(' ')
    // console.log("token: ", token);
    if(type !== 'Bearer') throw new Error("Invalid Token");
    const payload = await verifyWithJose<{_id:string}>(token);
    console.log(payload , "ini payload");

    const requestHeaders = new Headers(request.headers);
    console.log("payloadTyped: ", payload);
    requestHeaders.set('x-user-id', payload._id);
    // console.log(requestHeaders, "ini request header");
    return requestHeaders;
}

export  async function middleware(request:NextRequest) {
    try {
        // Authentication
        const requestHeaders = await auth(request);
        return NextResponse.next({
            request: {
                // New Request Headers
                headers: requestHeaders
            }
        })
    } catch (err) {
        toast(  "error middleware" , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        return ErrorHandler(err);
    }
}
export const config = {
  matcher: [],//midleware cuman buat protect back end klo nge fetch
}
