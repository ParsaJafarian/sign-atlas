import Course from "@/db/models/Course";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";

export const GET = catchAsyncError(async (req) => {
    const courses = await Course.find();
    return NextResponse.json({ courses}, {status: 200})
});