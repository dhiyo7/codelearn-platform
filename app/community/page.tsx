import { CommunityPage } from "@/components/community/community-page"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"

export default function Community() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <CommunityPage />
      </div>
    </AuthProvider>
  )
}
