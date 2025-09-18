"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Calendar } from "lucide-react"

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  lastActiveDate: Date
}

export function StreakCounter({ currentStreak, longestStreak, lastActiveDate }: StreakCounterProps) {
  const isActiveToday = new Date().toDateString() === lastActiveDate.toDateString()

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Learning Streak
            </CardTitle>
            <CardDescription>Keep the momentum going!</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">days</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Longest: {longestStreak} days</span>
          </div>
          <div className={`text-sm ${isActiveToday ? "text-green-500" : "text-muted-foreground"}`}>
            {isActiveToday ? "Active today!" : "Study today to continue"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
