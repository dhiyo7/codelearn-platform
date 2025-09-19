"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Trophy,
  User,
  Settings,
  GraduationCap,
  Package,
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role?.toLowerCase() || "member"
  const userId = session?.user?.id

  // Definisikan item navigasi di dalam komponen untuk mengakses data sesi
  const navItems = {
    member: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/courses", icon: BookOpen, label: "Courses" },
      { href: "/community", icon: Users, label: "Community" },
      { href: "/achievements", icon: Trophy, label: "Achievements" },
      { href: `/profile/${userId}`, icon: User, label: "Profile" },
    ],
    mentor: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/mentor/courses", icon: GraduationCap, label: "My Courses" },
      { href: "/mentor/students", icon: Users, label: "My Students" },
      { href: "/community", icon: Users, label: "Community" },
      { href: `/profile/${userId}`, icon: User, label: "Profile" },
    ],
    admin: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/users", icon: Users, label: "Manage Users" },
      { href: "/admin/courses", icon: BookOpen, label: "Manage Courses" },
      { href: "/admin/settings", icon: Settings, label: "System Settings" },
    ],
  }

  const items = navItems[userRole] || navItems.member

  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>CodeLearn</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {items.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === item.href
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid items-start text-sm font-medium">
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/settings"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  )
}