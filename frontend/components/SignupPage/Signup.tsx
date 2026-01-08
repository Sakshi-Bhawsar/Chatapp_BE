"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { useState } from "react"
import { userSignup } from "@/queries/userAuth"
import { useRouter } from "next/navigation"

interface errorType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  pictureUrl?: string;
  [key: string]: string | undefined | null;
}

const Signup = () => {
  const [signupUser, setSignupUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pictureUrl: null,
  })
  const [error, setError] = useState<errorType>({})
  const[apiError,setApiError]=useState<string>('');
  const router= useRouter()

  const isValidate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return "Name is required"
        }
        return "";
      case 'email':
        if (!value.trim()) {
          return "Email is required"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Invalid email address";
        return "";
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!value.trim()) {
          return "Password is required"
        }
        if (value.length < 6) {
          return "Password must be at least 6 characters long"
        }
        return passwordRegex.test(value) ? "" : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

      case 'confirmPassword':
        if (!value.trim()) {
          return "Confirm Password is required"
        }
        if (value !== signupUser.password) {
          return "Passwords do not match"
        }
        return "";

      default:
        return "";
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = isValidate(name, value);
    setError((prev) => ({
      ...prev,
      [name]: errorMsg
    }))

    setSignupUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errObj: errorType = {};
    Object.entries(signupUser).forEach(([key, value]) => {
      if (typeof value === "string") {
        const errorMsg = isValidate(key, value);
        if (errorMsg) {
          errObj[key] = errorMsg;
        }
      }
    })
    if (Object.keys(errObj).length > 0) {
      setError(errObj);
      return;
    }
   const res= await userSignup(
      signupUser.name,
      signupUser.email,
      signupUser.password,
      signupUser.confirmPassword,
      signupUser?.pictureUrl || null
    );
    console.log(res, "res from signup");
    if(res?.sucess){
      router.push('/login');
    } else {
      setApiError(res?.meassage);
    }
  }
  console.log(error, "error");
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Signup Card */}
      <Card className="relative z-10 w-100 backdrop-blur-md bg-white/90 shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">
            Create Account 🚀
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </CardHeader>
        <p className="text-sm text-red-700 bg-red-50 opacity-25">{apiError}</p>
        <CardContent>
          <form className="space-y-2">
            {/* Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input type="text" name="name" value={signupUser.name} onChange={handleChange} placeholder="Sakshi Bhawsar" />
              <p className=" text-red-600 text-xs ">{error?.name}</p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" name="email" value={signupUser.email} onChange={handleChange} placeholder="you@example.com" autoComplete="username" />
              <p className=" text-red-600 text-xs ">{error?.email}</p>

            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <Input type="password" name="password" value={signupUser.password} onChange={handleChange} placeholder="••••••••" autoComplete="new-password" />
              <p className=" text-red-600 text-xs ">{error?.password}</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input type="password" name="confirmPassword" value={signupUser.confirmPassword} onChange={handleChange} placeholder="••••••••" autoComplete="new-password" />
              <p className=" text-red-600 text-xs ">{error?.confirmPassword}</p>
            </div>

            <div className="space-y-1">
              <Label>Upload picture</Label>
              <Input
                type="file"
                name="pictureUrl"
                accept="image/*"
                onChange={handleChange} />
            </div>

            <Button className="w-full hover:bg-gray-300  active:text-gray-900 cursor-pointer" onClick={handleSignup}>Sign Up</Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <span className="text-black font-medium cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
