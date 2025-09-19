import { Course, Category, Tag, User, Module, Lesson, Review, Enrollment } from "@prisma/client"

export type CourseDetails = Course & {
  category: Category | null
  tags: Tag[]
  instructor: User
  modules: (Module & {
    lessons: Lesson[]
  })[]
  reviews: (Review & {
    user: User
  })[]
  enrollments: Enrollment[]
  totalLessons: number
  isEnrolled: boolean
}

export type CourseSummary = Omit<Course, "description"> & {
  category: Category | null
  tags: Tag[]
  instructor: {
    name: string | null
    image: string | null
  }
  averageRating: number
  totalReviews: number
  totalStudents: number
  totalLessons: number
}