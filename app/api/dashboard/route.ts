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
            course: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const coursesEnrolled = user.enrollments.length;
    // Placeholder values for other stats
    const hoursLearned = 0; 
    const achievementsCount = 0;
    const completionRate = user.enrollments.length > 0
      ? user.enrollments.reduce((acc, e) => acc + e.progress, 0) / user.enrollments.length
      : 0;

    const learningStats = [
      { title: "Courses Enrolled", value: coursesEnrolled.toString(), change: "" },
      { title: "Hours Learned", value: hoursLearned.toString(), change: "" },
      { title: "Achievements", value: achievementsCount.toString(), change: "" },
      { title: "Completion Rate", value: `${Math.round(completionRate)}%`, change: "" },
    ];

    const currentCourses = user.enrollments.map(enrollment => ({
      id: enrollment.course.id,
      name: enrollment.course.title,
      progress: enrollment.progress,
      nextLesson: "TBD",
      timeLeft: "TBD",
      instructor: "TBD",
    }));
    
    // Placeholder for recent achievements
    const recentAchievements = await prisma.achievement.findMany({
        where: { userId: user.id },
        orderBy: { date: 'desc' },
        take: 3,
    });

    // Placeholder for recommended courses
    const recommendedCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
        enrollments: {
          none: {
            userId: user.id,
          },
        },
      },
      take: 2,
    });

    const dashboardData = {
      learningStats,
      currentCourses,
      recentAchievements,
      recommendedCourses: recommendedCourses.map(course => ({
        id: course.id,
        name: course.title,
        difficulty: "Unknown", // You might want to add this to your Course model
        duration: "Unknown", // You might want to add this to your Course model
        rating: 0, // You might want to add this to your Course model
        students: 0, // You might want to add this to your Course model
      })),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}