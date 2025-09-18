import type { Achievement } from "@/types/auth"

export const achievements: Achievement[] = [
  {
    id: "first-course",
    title: "Getting Started",
    description: "Enroll in your first course",
    icon: "🎯",
    unlockedAt: new Date("2024-01-15"),
  },
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "👶",
    unlockedAt: new Date("2024-01-16"),
  },
  {
    id: "week-streak",
    title: "Consistent Learner",
    description: "Learn for 7 days in a row",
    icon: "🔥",
    unlockedAt: new Date("2024-01-23"),
  },
  {
    id: "javascript-master",
    title: "JavaScript Master",
    description: "Complete 10 JavaScript challenges",
    icon: "🏆",
    unlockedAt: new Date("2024-02-01"),
  },
  {
    id: "fast-learner",
    title: "Speed Demon",
    description: "Complete 5 lessons in one day",
    icon: "⚡",
    unlockedAt: new Date("2024-02-05"),
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Solve 25 coding problems",
    icon: "🧩",
    unlockedAt: new Date("2024-02-10"),
  },
  {
    id: "course-complete",
    title: "Course Crusher",
    description: "Complete your first course",
    icon: "🎓",
  },
  {
    id: "mentor-helper",
    title: "Community Helper",
    description: "Help 10 fellow students",
    icon: "🤝",
  },
  {
    id: "month-streak",
    title: "Dedicated Student",
    description: "Learn for 30 days in a row",
    icon: "📚",
    progress: 23,
    maxProgress: 30,
  },
  {
    id: "code-warrior",
    title: "Code Warrior",
    description: "Solve 100 coding challenges",
    icon: "⚔️",
    progress: 67,
    maxProgress: 100,
  },
  {
    id: "project-builder",
    title: "Project Builder",
    description: "Complete 5 projects",
    icon: "🏗️",
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 3 different courses",
    icon: "🔍",
    progress: 2,
    maxProgress: 3,
  },
]

export const achievementCategories = [
  { id: "all", name: "All Achievements", count: achievements.length },
  { id: "unlocked", name: "Unlocked", count: achievements.filter((a) => a.unlockedAt).length },
  { id: "in-progress", name: "In Progress", count: achievements.filter((a) => a.progress && !a.unlockedAt).length },
  { id: "locked", name: "Locked", count: achievements.filter((a) => !a.unlockedAt && !a.progress).length },
]
