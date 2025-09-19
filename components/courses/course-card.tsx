"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Star, BookOpen, Play, Heart, ArrowRight } from "lucide-react"
import type { CourseSummary } from "@/types/course"
import Link from "next/link"

interface CourseCardProps {
  course: CourseSummary
}

export function CourseCard({ course }: CourseCardProps) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)

  const getDifficultyColor = (difficulty: string | null | undefined) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border/50">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Course Actions Overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="lg" className="rounded-full h-16 w-16 p-0 bg-primary/90 hover:bg-primary">
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            {/* The description is not available in CourseSummary, so we remove it or use a fallback */}
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {(typeof course.averageRating === 'number' ? course.averageRating : 0).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center space-x-2 mt-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.image || ""} alt={course.instructor.name || ""} />
            <AvatarFallback className="text-xs">{course.instructor.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              {tag.name}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.totalStudents.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button className="flex-1" asChild>
            <Link href={`/courses/${course.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}