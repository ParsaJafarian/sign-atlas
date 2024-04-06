import { isAuthenticated } from "@/lib/auth";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";

export const GET = catchAsyncError(async (req) => {
    const authenticated = await isAuthenticated();
    return NextResponse.json({ authenticated }, { status: 200});
});