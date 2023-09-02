import { connectDB } from "@/utilities/mongoose";
import { Transaction } from "@/utilities/models";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { name, value, user, bank, comments, date } = await request.json();
  await connectDB();
  try {
    const res = await Transaction.create({
      name,
      value,
      user,
      bank,
      date,
    });
    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed" });
  }
};

export const GET = async (request: Request) => {
  const index = request.url.search("user");
  const user = request.url.slice(index + 5);
  await connectDB();
  const data = await Transaction.find({ user });
  return NextResponse.json(data);
};

export const DELETE = async (request: Request) => {
  const index = request.url.search("id");
  const id = request.url.slice(index + 3);

  await connectDB();
  const res = await Transaction.findByIdAndDelete(id);
  console.log(res);

  return NextResponse.json(res);
};
