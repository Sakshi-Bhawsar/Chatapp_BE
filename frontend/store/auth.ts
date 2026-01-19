import { IUser } from '@/definitions/user';
import {create} from 'zustand'
import { persist, devtools } from "zustand/middleware";

interface AuthStore{
  flag:number;
  setFlag:(flag:number)=>void;
  user:IUser
  setUser:(user:IUser)=>void;
}

const userStore = create<AuthStore>()(
     devtools(
      persist(
        (set)=>({
          flag:0,
          setFlag:(flag:number)=>set({flag}),
          user:{} as IUser,
          setUser:(user:IUser)=>set({user})
        }),
        { name: "auth-store" }
      )
     )
     
)

export default userStore;

