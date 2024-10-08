import { NextResponse } from "next/server";

const {ZodError} = require("zod")

export default function ErrorHandler(error) {
    const message  = error.message ||"Internal Server Error"
    const status = error.status || 500

    if(error instanceof ZodError) {
        const errFormat = error.issues[0].path[0].toString() + " " +
                          error.issues[0].message.toLowerCase();
        return new NextResponse(JSON.stringify({ error: errFormat }), { status: 400});  
    } else if(error instanceof Error) {
            return new NextResponse(JSON.stringify({ error: error.message }), { status: 400});
    } else {
        return new NextResponse(JSON.stringify({ message }), { status});
    }
}

class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}