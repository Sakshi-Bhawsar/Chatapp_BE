import { NextRequest, NextResponse } from "next/server";
import axiosServerInterceptor from "../axiosInterceptor";

export async function GET(request:NextRequest){
     try{
       const path= `/api/get/all/users`;
       const response = await axiosServerInterceptor.get(path);
       console.log("Feed response:", response.data);
       return NextResponse.json(response.data,{status:response.status})

     }catch(error){
        console.error("Feed error:", error);
        return NextResponse.json({message:"Internal Server"},{status:500})
     }
}