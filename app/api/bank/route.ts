import { connectDB } from "@/utilities/mongoose";
import { Bank } from "@/utilities/models";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { name, user, type } = await request.json();
  await connectDB();
  try {
    const res = await Bank.create({ name, user, type });
    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed" });
  }
};

export const GET = async (request: Request) => {
  const index = request.url.search("user");
  const user = request.url.slice(index + 5);
  await connectDB();
  const data = await Bank.find({ user });

  console.log("fetching banks to client");

  return NextResponse.json(data);
};

export const DELETE = async (request: Request) => {
  const index = request.url.search("id");
  const id = request.url.slice(index + 3);

  await connectDB();
  await Bank.findByIdAndDelete(id);
  const data = await Bank.find();
  return NextResponse.json(data);
};
