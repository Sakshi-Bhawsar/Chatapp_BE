import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"

const Signup = () => {
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

        <CardContent>
          <form className="space-y-2">
            {/* Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input type="text" placeholder="Sakshi Bhawsar" />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

             <div className="space-y-1">
              <Label>Upload picture</Label>
              <Input type="file" />
            </div>

            <Button className="w-full">Sign Up</Button>

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
