import { NextRequest,NextResponse } from "next/server";
import axiosServerInterceptor from "../axiosInterceptor";

//NextRequest → Next.js enhanced request object (server-side)
//NextResponse → Used to send response from API route
export async function POST(request:NextRequest){
     try{
        const path= `/api/auth/login`;
        const userData = await request.json();
        const response = await  axiosServerInterceptor.post(path,userData)
        console.log("Login response:", response.data);
        return NextResponse.json(response.data,{status:response.status});
     }catch(error){
        console.error("Login error:", error);
        return NextResponse.json({message:"Internal Server"}, {status:500});
     }
}