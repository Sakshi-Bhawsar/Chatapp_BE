'use client'
import { useEffect, useState } from "react";
import LandingPage from "@/components/Home/Home";
import Login from "@/components/loginPage/Login";
import userStore from "@/store/auth";

export default function Home() {
   const {flag} = userStore();
   const [isHydrated, setIsHydrated] = useState(false);

   useEffect(() => {
      setIsHydrated(true);
   }, []);

   if (!isHydrated) {
      return(
        <div className=" flex justify-center items-center font-semibold h-screen">loading...</div>
      )
   }

  return (
    <div className="">
     {flag ==0 ? <Login/> : <LandingPage />}
    </div>
  );
}
