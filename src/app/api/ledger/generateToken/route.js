import midtransClient from "midtrans-client";

import { NextResponse } from "next/server";
import LedgerModel from "../../../../db/models/Ledger";
import UserModel from "../../../../db/models/User"

// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});


async function generateTransaction(userId , productId , price) {
  try {
    const transaction = await snap.createTransaction({
      transaction_details: [
        {
          id: random(100000, 99999),
          price: 2000,
          quantity: 1,
          name: "FitToken",
        },
      ],
      credit_card: {
        secure: true,
      },
      transaction_details: {
        order_id: _.random(100000, 999999),
        gross_amount: 2000,
      },
      customer_details: {
        first_name: "budi",
        last_name: "pratama",
        email: "budi.pra@example.com",
        phone: "08111222333",
      },
    });
    const transactionToken = transaction.token;
    const transactionUrl = transaction.redirect_url;
    return { transactionToken, transactionUrl };
  } catch (error) {
    console.error("Error generating transaction:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to generate transaction" }), {
      status: 500,
    });
  }
}

export async function POST(request){
  try {
    const userId = request.headers.get("x-user-id");
    const { transactionType  , packageId } = await request.json();
    const user = await UserModel.findById(userId);
    if(!user) throw {message: "User Not Found" , status: 404};
    
    const ledger = {
      userId,
      transactionType,
      status: "pending",
    };
  
    const AddToken = await LedgerModel.createLedger(ledger);
  
    const productId = AddToken.insertedId;
    const { transactionToken, transactionUrl } = await generateTransaction(userId , productId , price);
    return NextResponse.json({ transactionToken, transactionUrl });
  } catch (error) {
    console.log("error: ", error);
  }

}