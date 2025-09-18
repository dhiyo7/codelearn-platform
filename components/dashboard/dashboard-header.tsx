"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Plus } from "lucide-react"

export function DashboardHeader() {
  const { user } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            {user?.role === "admin"
              ? "Manage your platform and monitor progress"
              : user?.role === "mentor"
                ? "Guide your students and track their progress"
                : "Continue your learning journey"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, students..." className="pl-10 w-64" />
          </div>

          {/* Quick Actions */}
          {user?.role === "mentor" && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Button>
          )}

          {user?.role === "admin" && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}

          {/* Notifications */}
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
