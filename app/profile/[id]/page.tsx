import { UserProfile } from "@/components/community/user-profile"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <UserProfile userId={params.id} />
      </div>
    </AuthProvider>
  )
}
