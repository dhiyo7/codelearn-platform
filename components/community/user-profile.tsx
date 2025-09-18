"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, LinkIcon, Trophy, BookOpen, MessageCircle } from "lucide-react"

interface UserProfileProps {
  userId: string
}

const mockUser = {
  id: "1",
  name: "Emma Wilson",
  username: "@emmawilson",
  avatar: "/female-developer-avatar.png",
  role: "member",
  level: 8,
  bio: "Full-stack developer passionate about creating innovative solutions. Love working with React, Node.js, and exploring AI technologies.",
  location: "San Francisco, CA",
  website: "https://emmawilson.dev",
  joinedDate: new Date("2023-06-15"),
  stats: {
    coursesCompleted: 12,
    projectsBuilt: 8,
    communityPosts: 24,
    helpfulAnswers: 45,
  },
  achievements: [
    { id: "1", title: "JavaScript Master", icon: "🏆", unlockedAt: new Date("2024-01-15") },
    { id: "2", title: "Fast Learner", icon: "⚡", unlockedAt: new Date("2024-01-20") },
    { id: "3", title: "Community Helper", icon: "🤝", unlockedAt: new Date("2024-01-25") },
  ],
  currentCourses: [
    { name: "Advanced React Patterns", progress: 75 },
    { name: "Machine Learning Basics", progress: 45 },
    { name: "DevOps Fundamentals", progress: 30 },
  ],
}

export function UserProfile({ userId }: UserProfileProps) {
  const user = mockUser // In real app, fetch user by userId

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.username}</p>
                  <Badge className="mt-2" variant={user.role === "mentor" ? "default" : "secondary"}>
                    Level {user.level} {user.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <LinkIcon className="h-4 w-4" />
                    <a href={user.website} className="text-primary hover:underline">
                      {user.website}
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinedDate.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Follow</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{user.stats.coursesCompleted}</div>
                  <div className="text-xs text-muted-foreground">Courses Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{user.stats.projectsBuilt}</div>
                  <div className="text-xs text-muted-foreground">Projects Built</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{user.stats.communityPosts}</div>
                  <div className="text-xs text-muted-foreground">Community Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{user.stats.helpfulAnswers}</div>
                  <div className="text-xs text-muted-foreground">Helpful Answers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.unlockedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 pb-4 border-b">
                      <Trophy className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Unlocked achievement:</span> Community Helper
                        </p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 pb-4 border-b">
                      <BookOpen className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Completed lesson:</span> Advanced React Hooks
                        </p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 pb-4 border-b">
                      <MessageCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Posted:</span> AI-Powered Task Manager Project
                        </p>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                  <CardDescription>Courses currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.currentCourses.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Showcase of completed projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Projects will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Achievements</CardTitle>
                  <CardDescription>Complete collection of unlocked achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Unlocked {achievement.unlockedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
