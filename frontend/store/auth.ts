import {create} from 'zustand'
import { persist, devtools } from "zustand/middleware";

interface AuthStore{
  flag:number;
  setFlag:(flag:number)=>void;
}

const userStore = create<AuthStore>()(
     devtools(
      persist(
        (set)=>({
          flag:0,
          setFlag:(flag:number)=>set({flag})
        }),
        { name: "auth-store" }
      )
     )
     
)

export default userStore;

