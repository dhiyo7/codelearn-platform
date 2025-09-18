"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Clock, TrendingUp, Plus, MessageSquare, Calendar } from "lucide-react"

const mentorStats = [
  {
    title: "My Courses",
    value: "8",
    change: "+2 this month",
    icon: BookOpen,
  },
  {
    title: "Total Students",
    value: "1,247",
    change: "+89 this week",
    icon: Users,
  },
  {
    title: "Avg. Completion",
    value: "78%",
    change: "+5% improvement",
    icon: TrendingUp,
  },
  {
    title: "Hours Taught",
    value: "156",
    change: "+12 this week",
    icon: Clock,
  },
]

const myCourses = [
  {
    name: "Full-Stack JavaScript",
    students: 542,
    completion: 78,
    status: "active",
    lastUpdated: "2 days ago",
  },
  {
    name: "React Advanced Patterns",
    students: 234,
    completion: 65,
    status: "active",
    lastUpdated: "1 week ago",
  },
  {
    name: "Node.js Masterclass",
    students: 189,
    completion: 82,
    status: "draft",
    lastUpdated: "3 days ago",
  },
]

const recentStudents = [
  { name: "Emma Wilson", course: "Full-Stack JavaScript", progress: 85, lastActive: "2 hours ago" },
  { name: "James Brown", course: "React Advanced Patterns", progress: 62, lastActive: "5 hours ago" },
  { name: "Sofia Garcia", course: "Full-Stack JavaScript", progress: 94, lastActive: "1 day ago" },
  { name: "Michael Chen", course: "Node.js Masterclass", progress: 45, lastActive: "2 days ago" },
]

export function MentorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentorStats.map((stat) => (
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
        {/* My Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Manage and track your course performance</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{course.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.students} students • Updated {course.lastUpdated}
                      </p>
                    </div>
                    <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Avg. Completion</span>
                      <span>{course.completion}%</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Student Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
            <CardDescription>Students who recently engaged with your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/generic-placeholder-graphic.png?key=${student.name}`} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.progress}%</p>
                    <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Students
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for course management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Create Course
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              View Students
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Session
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
