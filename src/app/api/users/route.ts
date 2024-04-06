
import User from "@/db/models/User";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";


export const GET = catchAsyncError(async (req) => {
  const users = await User.find();
  return NextResponse.json({ users: users }, { status: 200 });
});


export const POST = catchAsyncError(async (req) => {
  const userData = await req.json();
  await User.create(userData);
  return NextResponse.json({ message: "User created" }, { status: 201 });
});