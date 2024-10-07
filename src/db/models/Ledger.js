import database from "../config/mongodb";

const { ObjectId } = require("mongodb");

export default class LedgerModel {
  static collection() {
    return database.collection("ledgers");
  }
  static async createLedger(data) {
    return this.collection().insertOne(data);
  }
  static async updateToken(data , token){
    return this.collection().updateOne(
      { _id: new ObjectId(String(data.id)) },
      { $set: { token: data.token } }
    );
  }
  static async updateStatus(data){
    return this.collection().updateOne(
      { _id: new ObjectId(String(data._id)) },
      { $set: { status: "Paid" } }
    );
  }
}