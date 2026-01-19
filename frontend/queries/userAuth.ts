import axios from "axios";
import { api } from "./axiosinterceptors";
import userStore from "@/store/auth";

export const userSignup = async (name: string, email: string, password: string, confirmPassword: string, pictureUrl: string | null) => {
    try {
        const path = `/api/signup`;
        console.log("Signup Path:", path);
        const res = await api.post(path, { name, email, password, confirmPassword, pictureUrl })
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        const { setFlag, setUser } = userStore.getState()
        const path = `/api/login`;
        const response = await api.post(path, { email, password });
        response.data.success ? (
            setFlag(1),
            setUser(response?.data?.user)
        )
            :
            (setFlag(0));
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
