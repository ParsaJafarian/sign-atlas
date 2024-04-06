import seed from "@/db/seeds";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";

export const GET = catchAsyncError(async (req) => {
  await seed(10);
  return NextResponse.json({ message: "Database seeded" }, { status: 200 });
});
