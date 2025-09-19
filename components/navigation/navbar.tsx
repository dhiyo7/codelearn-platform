"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import { Code2, Menu, X, Settings, LogOut, User, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  const navigation = [
    { name: "Courses", href: "/courses" },
    { name: "Community", href: "/community" },
    { name: "Achievements", href: "/achievements" },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">CodeLearn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            {isAuthenticated && session.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || "/placeholder.svg"} alt={session.user.name || ""} />
                      <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">{session?.user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${session.user.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt={session?.user?.name || ""} />
                      <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-foreground">{session?.user?.name}</div>
                    <div className="text-sm font-medium leading-none text-muted-foreground">{session?.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link href={`/profile/${session?.user?.id}`} className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                  <Link href="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  <Link href="/settings" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
                  <a onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent">Sign out</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}