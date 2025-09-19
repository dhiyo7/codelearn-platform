import { CommunityPage } from "@/components/community/community-page"
import { Navbar } from "@/components/navigation/navbar"

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CommunityPage />
    </div>
  )
}