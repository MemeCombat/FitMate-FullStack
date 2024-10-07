import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const midtransResponse = await request.json();
        console.log("midtransResponse: ", midtransResponse);
        return NextResponse.json(midtransResponse)
    } catch (error) {
        console.log("error: ", error);
      let message = error.message || "Internal Server Error";
      let status = error.status || 500;
      return NextResponse.json({ message }, { status });
    }
  }