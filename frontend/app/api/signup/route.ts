import { NextRequest, NextResponse } from "next/server";
import axiosServerInterceptor from "../axiosInterceptor";

export async function POST(request: NextRequest) {
  try {
    console.log("Inside signup POST api route");

    const data = await request.json();

    const response = await axiosServerInterceptor.post(
      "/api/auth/signup",
      data
    );

    console.log("Backend response:", response.data);

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error(
      "Error in signup POST api route:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { message: "Signup failed" },
      { status: error?.response?.status || 500 }
    );
  }
}
