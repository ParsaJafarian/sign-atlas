import { IUser } from "@/db/models/User";
import { getUserFromSession } from "@/lib/auth";
import catchAsyncError from "@/lib/catchAsyncError";
import { NextResponse } from "next/server";

export const GET = catchAsyncError(async (req) => {
    const user: IUser = await getUserFromSession();
    //TODO change enrollments 
    const enrollments = user.enrollments;
    return NextResponse.json(enrollments, { status: 200 });
});