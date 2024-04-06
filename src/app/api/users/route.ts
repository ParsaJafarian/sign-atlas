import User from "@/db/models/User";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = catchAsyncError(async (req) => {
  const users = await User.find();
  return NextResponse.json({ users: users }, { status: 200 });
});

export const POST = catchAsyncError(async (req) => {
  const userData = await req.json();
  userData.password = await bcrypt.hash(userData.password, 12);
  await User.create(userData);
  return NextResponse.json({ message: "User created" }, { status: 201 });
});
