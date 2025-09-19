"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Lock, Clock, CheckCircle, Star, Target } from "lucide-react"
import { achievements, achievementCategories } from "@/lib/data/achievements"
import { useSession } from "next-auth/react"

export function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { data: session } = useSession()

  const filteredAchievements = achievements.filter((achievement) => {
    switch (selectedCategory) {
      case "unlocked":
        return achievement.unlockedAt
      case "in-progress":
        return achievement.progress && !achievement.unlockedAt
      case "locked":
        return !achievement.unlockedAt && !achievement.progress
      default:
        return true
    }
  })

  const getAchievementStatus = (achievement: any) => {
    if (achievement.unlockedAt) return "unlocked"
    if (achievement.progress) return "in-progress"
    return "locked"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unlocked":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Lock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unlocked":
        return "border-green-500/20 bg-green-500/5"
      case "in-progress":
        return "border-yellow-500/20 bg-yellow-500/5"
      default:
        return "border-muted bg-muted/20"
    }
  }

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length
  const totalPoints = unlockedCount * 100
  const currentLevel = Math.floor(totalPoints / 500) + 1
  const nextLevelPoints = currentLevel * 500
  const progressToNext = ((totalPoints % 500) / 500) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Achievements</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Track your learning progress and unlock achievements as you master new skills and complete challenges.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentLevel}</div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <Progress value={progressToNext} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{nextLevelPoints - totalPoints} points to next level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unlocked</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unlockedCount}</div>
            <p className="text-xs text-muted-foreground">of {achievements.length} achievements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">{achievements.length - unlockedCount} remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {achievementCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const status = getAchievementStatus(achievement)
              return (
                <Card
                  key={achievement.id}
                  className={`transition-all duration-300 hover:scale-[1.02] ${getStatusColor(status)} ${
                    status === "unlocked" ? "hover:shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription className="text-sm">{achievement.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusIcon(status)}
                    </div>
                  </CardHeader>

                  <CardContent>
                    {achievement.progress && !achievement.unlockedAt && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} className="h-2" />
                      </div>
                    )}

                    {achievement.unlockedAt && (
                      <div className="flex items-center justify-between">
                        <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Unlocked
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {status === "locked" && (
                      <div className="flex items-center justify-center py-4">
                        <Badge variant="outline" className="text-muted-foreground">
                          Keep learning to unlock
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No achievements in this category yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Keep learning to unlock new achievements!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}