export type UserRole = "admin" | "mentor" | "member"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  joinedAt: Date
  lastActive: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  lessons: number
  progress?: number
  instructor: string
  tags: string[]
  rating: number
  students: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}
