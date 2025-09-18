import { LoginForm } from "@/components/auth/login-form"
import { AuthProvider } from "@/lib/auth"
import Link from "next/link"
import { Code2 } from "lucide-react"

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CodeLearn</span>
            </Link>
          </div>
          <LoginForm />
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
