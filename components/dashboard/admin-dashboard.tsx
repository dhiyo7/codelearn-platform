"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, TrendingUp, DollarSign, Eye, MoreHorizontal } from "lucide-react"

const adminStats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active Courses",
    value: "247",
    change: "+8%",
    changeType: "positive" as const,
    icon: BookOpen,
  },
  {
    title: "Course Completions",
    value: "8,921",
    change: "+23%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
]

const recentUsers = [
  { name: "Alice Johnson", email: "alice@example.com", role: "member", joinDate: "2 hours ago" },
  { name: "Bob Smith", email: "bob@example.com", role: "mentor", joinDate: "5 hours ago" },
  { name: "Carol Davis", email: "carol@example.com", role: "member", joinDate: "1 day ago" },
  { name: "David Wilson", email: "david@example.com", role: "member", joinDate: "2 days ago" },
]

const topCourses = [
  { name: "Full-Stack JavaScript", students: 1542, completion: 78, revenue: "$12,450" },
  { name: "Python for Data Science", students: 1235, completion: 82, revenue: "$9,870" },
  { name: "Mobile App Development", students: 892, completion: 65, revenue: "$7,340" },
  { name: "DevOps Fundamentals", students: 678, completion: 71, revenue: "$5,420" },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>New user registrations in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/generic-placeholder-graphic.png?key=${user.name}`} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={user.role === "mentor" ? "default" : "secondary"} className="text-xs">
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View All Users
            </Button>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
            <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{course.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.students} students • {course.revenue}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Completion Rate</span>
                      <span>{course.completion}%</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View All Courses
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BookOpen className="h-6 w-6 mb-2" />
              Course Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
