import { CourseDetail } from "@/components/courses/course-detail"
import { Navbar } from "@/components/navigation/navbar"
import { courses } from "@/lib/data/courses"
import { notFound } from "next/navigation"
import { CourseDetails } from "@/types/course"
import { CourseHeader } from "@/components/courses/details/course-header"
import { CourseSidebar } from "@/components/courses/details/course-sidebar"
import { CourseContent } from "@/components/courses/details/course-content"

async function getCourseDetails(id: string): Promise<CourseDetails | null> {
  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch course data")
  }

  return res.json()
}

interface CoursePageProps {
  params: {
    id: string 
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseDetails(params.id) 

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <CourseHeader course={course} />
          <CourseContent course={course} />
        </div>
        <div>
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  )
}