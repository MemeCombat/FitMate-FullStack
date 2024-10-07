import { NextResponse } from "next/server";
import { sha512 } from "js-sha512";
import LedgerModel from "@/db/models/Ledger";
import UserModel from "@/db/models/User";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const midtransResponse = await request.json();
    console.log("midtransResponse: ", midtransResponse);
    const { order_id, status_code, gross_amount } = midtransResponse;
    const codeSignatureKey = sha512(
      order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY
    );
    if (midtransResponse.signature_key !== codeSignatureKey) {
      throw { message: "Invalid signature", status: 400 };
    }
    if (midtransResponse.transaction_status === "settlement") {
      const pipeline = [
        {
          $match:
            /**
             * query: The query in MQL.
             */
            {
              _id: new ObjectId(String(order_id)),
            },
        },
        {
          $lookup:
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            {
              from: "package",
              localField: "packageId",
              foreignField: "_id",
              as: "ledger",
            },
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$ledger",
            },
        },
      ];
      const ledger = await LedgerModel.collection()
      .aggregate(pipeline)
      .toArray();
      console.log("ledger: ", ledger[0]);
      const userUpdate = await UserModel.updateToken(
        ledger[0].userId,
        ledger[0].final
      );
      console.log("userUpdate: ", userUpdate);
      if (!userUpdate)
        throw { message: "user not found/update token error", status: 400 };
      await LedgerModel.updateStatus(ledger[0])

    }
    return NextResponse.json(midtransResponse);
  } catch (error) {
    console.log("error: ", error);
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;
    return NextResponse.json({ message }, { status });
  }
}
