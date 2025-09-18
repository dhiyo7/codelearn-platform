"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState } from "@/types/auth"

const AuthContext = createContext<
  AuthState & {
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    signup: (email: string, password: string, name: string) => Promise<void>
  }
>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
})

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@codelearn.com",
    name: "Admin User",
    role: "admin",
    avatar: "/admin-avatar.png",
    joinedAt: new Date("2024-01-01"),
    lastActive: new Date(),
  },
  {
    id: "2",
    email: "mentor@codelearn.com",
    name: "Sarah Johnson",
    role: "mentor",
    avatar: "/mentor-avatar.jpg",
    joinedAt: new Date("2024-02-01"),
    lastActive: new Date(),
  },
  {
    id: "3",
    email: "student@codelearn.com",
    name: "Alex Chen",
    role: "member",
    avatar: "/student-avatar.png",
    joinedAt: new Date("2024-03-01"),
    lastActive: new Date(),
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("codelearn_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication
    const user = mockUsers.find((u) => u.email === email)
    console.log("user", user)
    if (user) {
      localStorage.setItem("codelearn_user", JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    localStorage.removeItem("codelearn_user")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "member",
      joinedAt: new Date(),
      lastActive: new Date(),
    }
    localStorage.setItem("codelearn_user", JSON.stringify(newUser))
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, logout, signup }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
