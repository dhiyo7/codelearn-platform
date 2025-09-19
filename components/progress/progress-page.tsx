"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Clock, Target, Trophy, Flame, CheckCircle } from "lucide-react"

const weeklyProgress = [
  { day: "Mon", hours: 2.5, lessons: 3 },
  { day: "Tue", hours: 1.8, lessons: 2 },
  { day: "Wed", hours: 3.2, lessons: 4 },
  { day: "Thu", hours: 2.1, lessons: 3 },
  { day: "Fri", hours: 4.0, lessons: 5 },
  { day: "Sat", hours: 3.5, lessons: 4 },
  { day: "Sun", hours: 2.8, lessons: 3 },
]

const monthlyProgress = [
  { month: "Jan", completed: 12, started: 15 },
  { month: "Feb", completed: 18, started: 20 },
  { month: "Mar", completed: 25, started: 28 },
  { month: "Apr", completed: 22, started: 25 },
  { month: "May", completed: 30, started: 32 },
  { month: "Jun", completed: 28, started: 30 },
]

const skillDistribution = [
  { name: "JavaScript", value: 35, color: "#8B5CF6" },
  { name: "Python", value: 25, color: "#3B82F6" },
  { name: "React", value: 20, color: "#10B981" },
  { name: "Node.js", value: 15, color: "#F59E0B" },
  { name: "Other", value: 5, color: "#EF4444" },
]

const courseProgress = [
  { name: "Full-Stack JavaScript", progress: 65, totalLessons: 48, completedLessons: 31 },
  { name: "Python for Data Science", progress: 42, totalLessons: 32, completedLessons: 13 },
  { name: "Mobile App Development", progress: 23, totalLessons: 64, completedLessons: 15 },
  { name: "DevOps Fundamentals", progress: 8, totalLessons: 40, completedLessons: 3 },
]

// Define an interface for the progress data structure
interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  completionRate: number;
  weeklyProgress: { day: string; hours: number; lessons: number }[];
  monthlyProgress: { month: string; completed: number; started: number }[];
  skillDistribution: { name: string; value: number; color: string }[];
  courseProgress: { name: string; progress: number; totalLessons: number; completedLessons: number }[];
  learningGoals: { description: string; current: number; total: number; icon: string }[];
}

const iconComponents: { [key: string]: React.ElementType } = {
  CheckCircle,
  Clock,
  Target,
};

export function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/progress');
        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }
        const data = await response.json();
        setProgressData(data);
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

  if (!progressData) {
    return <div className="text-center">No progress data available.</div>;
  }

  const {
    currentStreak,
    longestStreak,
    totalHours,
    completionRate,
    weeklyProgress,
    monthlyProgress,
    skillDistribution,
    courseProgress,
    learningGoals,
  } = progressData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Learning Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and analyze your progress over time.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak} days</div>
            <p className="text-xs text-muted-foreground">Longest: {longestStreak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground\">+8h this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground\">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Activity</CardTitle>
              <CardDescription>Your learning hours and lessons completed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8B5CF6" name="Hours" />
                  <Bar dataKey="lessons" fill="#3B82F6" name="Lessons" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
              <CardDescription>Courses started vs completed over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="started" stroke="#3B82F6" name="Started" />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" name="Completed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
              <CardDescription>Breakdown of your learning focus by technology</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Your progress in currently enrolled courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {courseProgress.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </p>
                  </div>
                  <Badge variant="outline">{course.progress}%</Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
          <CardDescription>Track your progress towards your learning objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningGoals.map((goal, index) => {
              const Icon = iconComponents[goal.icon];
              const progressValue = (goal.current / goal.total) * 100;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {Icon && <Icon className={`h-5 w-5 ${
                      progressValue === 100 ? 'text-green-500' : 
                      goal.icon === 'Clock' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />}
                    <div>
                      <p className="font-medium">{goal.description}</p>
                      <p className="text-sm text-muted-foreground">{goal.current} of {goal.total} completed</p>
                    </div>
                  </div>
                  <Progress value={progressValue} className="w-24 h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}