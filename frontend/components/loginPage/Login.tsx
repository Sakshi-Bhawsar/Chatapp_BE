"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import Link from "next/link"
import { useState } from "react"
import { userLogin } from "@/queries/userAuth"


const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })
    const [err, setErr] = useState({})

    const validation = (name: string, value: string) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return "Email is required"
                } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        return "Invalid email format"
                    } else {
                        return ""
                    }
                }
            case 'password':
                if (!value) {
                    return "Password is required"
                } else if (value.length < 6) {
                    return "Password must be at least 6 characters long"
                } else {
                    return ""
                }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errorMsg = validation(name, value);
        setErr((prevErr) => ({
            ...prevErr,
            [name]: errorMsg
        }));
        setLoginUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        // Handle login logic here
        e.preventDefault();
        let objErr: any = {};
        Object.entries(loginUser).forEach(([key, value]) => {
            if (typeof value === "string") {
                const errorMsg = validation(key, value);
                if (errorMsg) {
                    objErr[key] = errorMsg
                }
            }
        })

        if (Object.keys(objErr).length > 0) {
            setErr(objErr);
            return;
        }
        const res = await userLogin(loginUser.email, loginUser.password);
        console.log("Login response:", res);
    }

    console.log(loginUser);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center" >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Login Card */}
            <Card className="relative z-10 w-95 backdrop-blur-md bg-white/90 shadow-xl border-none rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome Back 👋
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Login to your account
                    </p>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" name="email" value={loginUser.email} onChange={handleChange} placeholder="you@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input type="password" name="password" value={loginUser.password} onChange={handleChange} placeholder="••••••••" />
                        </div>

                        <Button className="w-full cursor-pointer  active:text-gray-500  hover:bg-gray-300 " onClick={handleLogin}>Login</Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Do not have an account?{" "}
                            <Link href="/signup">
                                <span className="text-black font-medium cursor-pointer hover:underline">
                                    Sign up
                                </span>
                            </Link>

                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
