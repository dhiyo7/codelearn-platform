import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredCourses = [
  {
    id: 1,
    title: "Full-Stack JavaScript",
    description: "Master modern web development with React, Node.js, and MongoDB",
    thumbnail: "/javascript-coding-course-thumbnail-with-modern-des.jpg",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 15420,
    rating: 4.9,
    progress: 0,
    instructor: "Sarah Johnson",
    tags: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn data analysis, visualization, and machine learning with Python",
    thumbnail: "/python-data-science-course-with-charts-and-graphs.jpg",
    difficulty: "Beginner",
    duration: "8 weeks",
    students: 12350,
    rating: 4.8,
    progress: 0,
    instructor: "Dr. Alex Chen",
    tags: ["Python", "Data Science", "ML"],
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native and Flutter",
    thumbnail: "/mobile-app-development-course-showing-phone-interf.jpg",
    difficulty: "Advanced",
    duration: "16 weeks",
    students: 8920,
    rating: 4.9,
    progress: 0,
    instructor: "Mike Rodriguez",
    tags: ["React Native", "Flutter", "Mobile"],
  },
]

export function CoursesPreview() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Popular Courses</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Start your coding journey with our most popular and highly-rated courses, designed by industry experts.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      course.difficulty === "Beginner"
                        ? "secondary"
                        : course.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {course.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
