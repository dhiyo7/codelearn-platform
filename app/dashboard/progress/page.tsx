import { ProgressPage } from "@/components/progress/progress-page"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AuthProvider } from "@/lib/auth"

export default function Progress() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <ProgressPage />
            </main>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
