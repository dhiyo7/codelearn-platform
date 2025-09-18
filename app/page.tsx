import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CoursesPreview } from "@/components/sections/courses-preview"
import { CommunitySection } from "@/components/sections/community-section"
import { StatsSection } from "@/components/sections/stats-section"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <CoursesPreview />
          <CommunitySection />
        </main>
      </div>
    </AuthProvider>
  )
}
