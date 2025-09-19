"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, Target, Play, ArrowRight, Calendar, Star } from "lucide-react"
import Link from "next/link"

// Define interfaces for the dashboard data structures
interface LearningStat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

interface CurrentCourse {
  id: string;
  name: string;
  progress: number;
  nextLesson: string;
  timeLeft: string;
  instructor: string;
}

interface RecentAchievement {
  name: string;
  description: string;
  icon: string;
  date: string;
}

interface RecommendedCourse {
  id: string;
  name: string;
  difficulty: string;
  duration: string;
  rating: number;
  students: number;
}

interface DashboardData {
  learningStats: Omit<LearningStat, 'icon'>[];
  currentCourses: CurrentCourse[];
  recentAchievements: RecentAchievement[];
  recommendedCourses: RecommendedCourse[];
}

const iconMap: { [key: string]: React.ElementType } = {
  "Courses Enrolled": BookOpen,
  "Hours Learned": Clock,
  "Achievements": Trophy,
  "Completion Rate": Target,
};

export function MemberDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center">No dashboard data available.</div>;
  }
  
  const { learningStats, currentCourses, recentAchievements, recommendedCourses } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningStats.map((stat) => {
          const Icon = iconMap[stat.title];
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
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