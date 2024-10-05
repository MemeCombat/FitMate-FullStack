import { NextResponse } from "next/server";
import PackageModel from "../../../db/models/Package";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const { type } = await request.json();
    console.log("type: ", type);

    let token, price;

    switch (type.toUpperCase()) {
      case "BRONZE":
        token = 1;
        price = 5000;
        break;
      case "SILVER":
        token = 2;
        price = 10000;
        break;
      case "GOLD":
        token = 3;
        price = 15000;
        break;
      default:
        throw new Error("Invalid package type");
    }

    const description = `${type.toUpperCase()} package`;

    await PackageModel.createPackage(
      type.toUpperCase(),
      token,
      price,
      description
    );
    return NextResponse.json({ message: "Success create package" });
  } catch (error) {
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    return NextResponse.json({ message }, { status });
  }
}

export async function GET(request) {
  try {
    const packages = await PackageModel.getPackage();
    return NextResponse.json(packages);
  } catch (error) {
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    return NextResponse.json({ message }, { status });
  }
}

export async function PATCH(request) {
  try {
    const { id, newType } = await request.json();

    if (!id || !newType) {
      return NextResponse.json(
        { message: "Missing id or newType" },
        { status: 400 }
      );
    }

    const validTypes = ["BRONZE", "SILVER", "GOLD"];
    if (!validTypes.includes(newType.toUpperCase())) {
      return NextResponse.json(
        { message: "Invalid package type" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(id);

    const updatedPackage = await PackageModel.updatePackage(
      objectId,
      newType.toUpperCase()
    );

    console.log("Updated package:", updatedPackage);

    if (!updatedPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    console.error("Error in PATCH route:", error);
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const result = await PackageModel.deletePackage(id);

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ message: result.message }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in DELETE route:", error);
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    return NextResponse.json({ message }, { status });
  }
}
