import { NextResponse } from "next/server";
import PackageModel from "../../../../db/models/Package";

export async function GET(request , {params}) {
  try {
    const packType = params.type;
    console.log("packType: ", packType);
    const packages = await PackageModel.getPackageByType(packType);
    return NextResponse.json(packages);
  } catch (error) {
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    return NextResponse.json({ message }, { status });
  }
}
