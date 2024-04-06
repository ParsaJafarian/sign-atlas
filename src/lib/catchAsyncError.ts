import { NextRequest, NextResponse } from "next/server";

/**
 * Catch errors that occur in an async function and return a 500 status code with an error message.
 * @param asyncFunc async function to catch errors from
 * @returns NextResponse json object containing an error message and a 500 status code
 */
export default function catchAsyncError(
  asyncFunc: (req: NextRequest, ...args: any[]) => Promise<any>,
) {
  // Use rest parameters to capture additional arguments
  return async function (
    req: NextRequest,
    ...args: any[]
  ): Promise<NextResponse> {
    try {
      // Pass all arguments to the async function
      return await asyncFunc(req, ...args);
    } catch (error) {
      // Handle errors
      console.log(error);
      return NextResponse.json(
        { message: "Error occurred", error },
        { status: 500 },
      );
    }
  };
}
