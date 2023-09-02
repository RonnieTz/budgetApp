import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
  name: String,
  value: Number,
  date: String,
  comments: String,
  bank: String,
  user: String,
});

const bankSchema = new Schema({ name: String, type: String, user: String });

export const Transaction =
  models.Transaction || model("Transaction", transactionSchema);

export const Bank = models.Bank || model("Bank", bankSchema);
