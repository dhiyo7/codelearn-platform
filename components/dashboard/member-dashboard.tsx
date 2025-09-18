"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, Target, Play, ArrowRight, Calendar, Star } from "lucide-react"
import Link from "next/link"

const learningStats = [
  {
    title: "Courses Enrolled",
    value: "6",
    change: "+2 this month",
    icon: BookOpen,
  },
  {
    title: "Hours Learned",
    value: "47",
    change: "+8 this week",
    icon: Clock,
  },
  {
    title: "Achievements",
    value: "12",
    change: "+3 new badges",
    icon: Trophy,
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "+12% improvement",
    icon: Target,
  },
]

const currentCourses = [
  {
    id: "1",
    name: "Full-Stack JavaScript",
    progress: 65,
    nextLesson: "React Hooks Deep Dive",
    timeLeft: "2h 30m",
    instructor: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Python for Data Science",
    progress: 42,
    nextLesson: "Data Visualization with Matplotlib",
    timeLeft: "1h 45m",
    instructor: "Dr. Alex Chen",
  },
  {
    id: "3",
    name: "Mobile App Development",
    progress: 23,
    nextLesson: "Navigation in React Native",
    timeLeft: "3h 15m",
    instructor: "Mike Rodriguez",
  },
]

const recentAchievements = [
  { name: "JavaScript Master", description: "Completed 10 JavaScript challenges", icon: "🏆", date: "2 days ago" },
  { name: "Fast Learner", description: "Completed 5 lessons in one day", icon: "⚡", date: "1 week ago" },
  { name: "Problem Solver", description: "Solved 25 coding problems", icon: "🧩", date: "2 weeks ago" },
]

const recommendedCourses = [
  {
    id: "4",
    name: "Advanced React Patterns",
    difficulty: "Advanced",
    duration: "8 weeks",
    rating: 4.9,
    students: 2340,
  },
  {
    id: "5",
    name: "Backend API Development",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 1890,
  },
]

export function MemberDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    </div>
                    <Badge variant="outline">{course.progress}%</Badge>
                  </div>

                  <Progress value={course.progress} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Next: {course.nextLesson}</p>
                      <p className="text-muted-foreground">{course.timeLeft} remaining</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/courses/${course.id}/continue`}>
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <Link href="/achievements">
                <Trophy className="h-4 w-4 mr-2" />
                View All Achievements
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your learning progress and interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </div>
                  <Badge variant={course.difficulty === "Advanced" ? "destructive" : "default"}>
                    {course.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <span>{course.students.toLocaleString()} students</span>
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>
                    Enroll Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col" asChild>
              <Link href="/courses">
                <BookOpen className="h-6 w-6 mb-2" />
                Browse Courses
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
              <Link href="/dashboard/progress">
                <Target className="h-6 w-6 mb-2" />
                View Progress
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
              <Link href="/community">
                <Calendar className="h-6 w-6 mb-2" />
                Join Study Group
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
              <Link href="/achievements">
                <Trophy className="h-6 w-6 mb-2" />
                Achievements
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
