import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to database.");
    await connect("mongodb://localhost/budget");
    console.log("Connected to database.");
  } catch (err) {
    console.log(err);
  }
};
