import database from "../config/mongodb";

const { ObjectId } = require("mongodb");

export default class LedgerModel {
  static collection() {
    return database.collection("ledgers");
  }
  static async createLedger(data) {
    return this.collection().insertOne(data);
  }
}