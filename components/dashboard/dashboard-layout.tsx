"use client"

import { useSession } from "next-auth/react"
import { AdminDashboard } from "./admin-dashboard"
import { MentorDashboard } from "./mentor-dashboard"
import { MemberDashboard } from "./member-dashboard"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { LoginForm } from "@/components/auth/login-form"

export function DashboardLayout() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Access Dashboard</h2>
            <p className="text-muted-foreground mt-2">Please sign in to continue</p>
          </div>
          <LoginForm />
        </div>
      </div>
    )
  }

  const renderDashboard = () => {
    switch (session?.user?.role?.toLowerCase()) {
      case "admin":
        return <AdminDashboard />
      case "mentor":
        return <MentorDashboard />
      case "member":
        return <MemberDashboard />
      default:
        return <MemberDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6">{renderDashboard()}</main>
        </div>
      </div>
    </div>
  )
}