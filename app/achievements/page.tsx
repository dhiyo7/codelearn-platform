import { AchievementsPage } from "@/components/achievements/achievements-page"
import { Navbar } from "@/components/navigation/navbar"

export default function Achievements() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AchievementsPage />
    </div>
  )
}