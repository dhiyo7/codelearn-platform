import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AuthProvider } from "@/lib/auth"

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  )
}
