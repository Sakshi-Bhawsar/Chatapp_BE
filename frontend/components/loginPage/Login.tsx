import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import Link from "next/link"

const Login = () => {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"

        >
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
                            <Input type="email" placeholder="you@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>

                        <Button className="w-full">Login</Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Do not have an account?{" "}
                            <Link href="signup">
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
