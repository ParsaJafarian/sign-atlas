import User from "@/db/models/User";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(async (req, { params }: { params: any }) => {
  const { id } = params;
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user: user }, { status: 200 });
});
