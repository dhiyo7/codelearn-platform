import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
        progress: {
          include: {
            lesson: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Placeholder data, as we don't have historical data yet
    const weeklyProgress = [
        { day: "Mon", hours: 0, lessons: 0 },
        { day: "Tue", hours: 0, lessons: 0 },
        { day: "Wed", hours: 0, lessons: 0 },
        { day: "Thu", hours: 0, lessons: 0 },
        { day: "Fri", hours: 0, lessons: 0 },
        { day: "Sat", hours: 0, lessons: 0 },
        { day: "Sun", hours: 0, lessons: 0 },
    ];
    const monthlyProgress = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return { month: d.toLocaleString('default', { month: 'short' }), completed: 0, started: 0 };
    }).reverse();

    const skillDistribution = [
        { name: "JavaScript", value: 0, color: "#8B5CF6" },
        { name: "Python", value: 0, color: "#3B82F6" },
        { name: "React", value: 0, color: "#10B981" },
        { name: "Node.js", value: 0, color: "#F59E0B" },
        { name: "Other", value: 0, color: "#EF4444" },
    ];

    const courseProgress = user.enrollments.map(enrollment => {
        const totalLessons = enrollment.course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
        const completedLessons = user.progress.filter(p => 
            p.completed && enrollment.course.modules.some(m => m.lessons.some(l => l.id === p.lessonId))
        ).length;
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return {
            name: enrollment.course.title,
            progress: Math.round(progress),
            totalLessons,
            completedLessons,
        };
    });
    
    // Placeholder goals
    const learningGoals = [
        { description: "Complete 3 courses this quarter", current: 0, total: 3, icon: "CheckCircle" },
        { description: "Study 20 hours per month", current: 0, total: 20, icon: "Clock" },
        { description: "Build 2 portfolio projects", current: 0, total: 2, icon: "Target" },
    ];

    const completionRate = user.enrollments.length > 0
      ? user.enrollments.reduce((acc, e) => acc + e.progress, 0) / user.enrollments.length
      : 0;

    const progressData = {
      currentStreak: 0, // Placeholder
      longestStreak: 0, // Placeholder
      totalHours: 0, // Placeholder
      completionRate: Math.round(completionRate),
      weeklyProgress,
      monthlyProgress,
      skillDistribution,
      courseProgress,
      learningGoals,
    };

    return NextResponse.json(progressData);
  } catch (error) {
    console.error("Error fetching progress data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}