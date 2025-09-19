"use client"

import { CourseDetails } from "@/types/course" // This is already correct
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, BookOpen, Clock } from "lucide-react"

interface CourseHeaderProps {
  course: CourseDetails
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4 mb-8">
      <p className="text-sm text-muted-foreground">{course.category.name}</p>
      <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
      <p className="text-lg text-muted-foreground">{course.description}</p>
      
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={course.instructor.image || ""} alt={course.instructor.name || ""} />
            <AvatarFallback>{course.instructor.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{course.instructor.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{(typeof course.averageRating === 'number' ? course.averageRating : 0).toFixed(1)}</span>
          <span>({course.totalReviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>{course.totalStudents} students</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
        <div className="flex items-center gap-1.5 text-sm">
          <BookOpen className="h-4 w-4" />
          <span>{course.totalLessons} lessons</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
      </div>
    </div>
  )
}