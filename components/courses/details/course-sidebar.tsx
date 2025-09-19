"use client"

import { useState } from "react"
import { CourseDetails } from "@/types/course"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Film, Smartphone, Infinity, Trophy, FileText, Heart } from "lucide-react"
import Link from "next/link"

interface CourseSidebarProps {
  course: CourseDetails
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleEnroll = () => {
    // TODO: Implement enrollment logic
    console.log("Enrolling in course:", course.id)
  }

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={course.imageUrl || "/placeholder.svg"}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full h-16 w-16 p-0 bg-primary/90 hover:bg-primary">
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">
              {typeof course.price === "number" ? (course.price === 0 ? "Free" : `$${course.price}`) : "Price not available"}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </Button>
          </div>

          {course.isEnrolled ? (
            <Button asChild size="lg" className="w-full">
              <Link href={`/courses/${course.id}/lesson/1`}>Continue Learning</Link>
            </Button>
          ) : (
            <Button size="lg" className="w-full" onClick={handleEnroll}>
              Enroll Now
            </Button>
          )}

          <div className="space-y-3 pt-4">
            <h4 className="font-semibold">This course includes:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Film className="h-4 w-4" />
                <span>{course.duration} of on-demand video</span>
              </li>
              <li className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                <span>{course.totalLessons} lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="h-4 w-4" />
                <span>Access on mobile and TV</span>
              </li>
              <li className="flex items-center gap-3">
                <Infinity className="h-4 w-4" />
                <span>Full lifetime access</span>
              </li>
              <li className="flex items-center gap-3">
                <Trophy className="h-4 w-4" />
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}