import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user: user }, { status: 200 });
};
