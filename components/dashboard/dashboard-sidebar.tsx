"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Home,
  BookOpen,
  Users,
  Trophy,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText,
  UserCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, logout } = useAuth()

  const getNavigationItems = () => {
    const baseItems = [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Courses", href: "/courses", icon: BookOpen },
      { name: "Community", href: "/community", icon: MessageSquare },
      { name: "Achievements", href: "/achievements", icon: Trophy },
    ]

    const roleSpecificItems = {
      admin: [
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "User Management", href: "/dashboard/users", icon: Users },
        { name: "Course Management", href: "/dashboard/course-management", icon: FileText },
        { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      ],
      mentor: [
        { name: "My Courses", href: "/dashboard/my-courses", icon: GraduationCap },
        { name: "Students", href: "/dashboard/students", icon: UserCheck },
        { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
        { name: "Analytics", href: "/dashboard/mentor-analytics", icon: BarChart3 },
      ],
      member: [
        { name: "My Learning", href: "/dashboard/learning", icon: GraduationCap },
        { name: "Progress", href: "/dashboard/progress", icon: BarChart3 },
        { name: "Certificates", href: "/dashboard/certificates", icon: Trophy },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[user?.role || "member"] || [])]
  }

  const navigationItems = getNavigationItems()

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-sidebar-primary" />
              <span className="text-lg font-bold text-sidebar-foreground">CodeLearn</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    user?.role === "admin"
                      ? "bg-red-500/10 text-red-500"
                      : user?.role === "mentor"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {user?.role}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium ml-3">Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
