
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  const users = await User.find();
  return NextResponse.json({ users: users }, { status: 200 });
};


export const POST = async (req: NextRequest) => {
  const userData = await req.json();
  await User.create(userData);
  return NextResponse.json({ message: "User created" }, { status: 201 });
};