import { AchievementsPage } from "@/components/achievements/achievements-page"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"

export default function Achievements() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <AchievementsPage />
      </div>
    </AuthProvider>
  )
}
