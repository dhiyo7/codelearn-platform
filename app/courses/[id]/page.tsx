import { CourseDetail } from "@/components/courses/course-detail"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"
import { courses } from "@/lib/data/courses"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.id === params.id)

  if (!course) {
    notFound()
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <CourseDetail course={course} />
      </div>
    </AuthProvider>
  )
}
