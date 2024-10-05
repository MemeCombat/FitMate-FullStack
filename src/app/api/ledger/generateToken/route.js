import midtransClient from "midtrans-client";

import { NextResponse } from "next/server";
import LedgerModel from "../../../../db/models/Ledger";
import UserModel from "../../../../db/models/User";
import PackageModel from "../../../../db/models/Package";

// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

async function generateTransaction(user, productId, findPackage) {
  try {
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: productId,
        gross_amount: findPackage.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.username,
        last_name: "",
        email: user.email,
        phone: "",
      },
    });
    const transactionToken = transaction.token;
    const transactionUrl = transaction.redirect_url;
    return { transactionToken, transactionUrl };
  } catch (error) {
    console.error("Error generating transaction:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to generate transaction" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    console.log("masuk");
    const userId = request.headers.get("x-user-id");
    console.log("userId: ", userId);
    let { transactionType, PackageType } = await request.json();
    console.log("PackageType: ", PackageType);
    console.log("transactionType: ", transactionType);
    //get user information kayak gimana
    const user = await UserModel.findById(userId);
    console.log("user: ", user);
    if (!user) throw { message: "User Not Found", status: 404 };
    //get harga package nya berapa
    const findPackage = await PackageModel.getPackageByType(
      PackageType.toUpperCase()
    );
    console.log("findPackage: ", findPackage);
    if (!findPackage) throw { message: "Package Not Found", status: 404 };
    let final = 0;
    //check jenis transaction nya apa
    if (transactionType === "topUp") {
      //final buat nge record token user berapa buat bikin history
      final = user.token + findPackage.price;
      console.log("final: ", final);
    } else if (transactionType === "payment") {
      final = user.token - findPackage.price;
      console.log("final: ", final);
    } else {
      throw { message: "Transaction Type Not Found", status: 404 };
    }

    const ledger = {
      userId,
      transactionType,
      status: "pending",
      final,
      packageId: findPackage._id,
    };

    const AddToken = await LedgerModel.createLedger(ledger);

    const productId = AddToken.insertedId;
    const { transactionToken, transactionUrl } = await generateTransaction(
      user,
      productId,
      findPackage
    );

    return NextResponse.json({ transactionToken, transactionUrl });
  } catch (error) {
    console.log("error: ", error);
  }
}
