import axios from "axios";
import { api } from "./axiosinterceptors";

export const userSignup=async(name:string,email:string,password:string,confirmPassword:string,pictureUrl:string | null)=>{
    try{
        const path= `/api/signup`;
        console.log("Signup Path:", path);
        const res = await api.post(path,{name,email,password,confirmPassword,pictureUrl})
        console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

