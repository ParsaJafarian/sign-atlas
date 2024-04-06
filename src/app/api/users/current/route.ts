import { getUserFromSession } from "@/lib/auth";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";

export const GET = catchAsyncError(async (req) => {
    const user = await getUserFromSession();
    return NextResponse.json(user, { status: 200 });
});