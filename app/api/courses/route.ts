import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        tags: true,
        instructor: {
          select: {
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        enrollments: {
          select: {
            id: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    // Calculate average rating and total students for each course
    const coursesWithAggregates = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const averageRating =
        totalReviews > 0
          ? course.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
          : 0;
      
      const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

      return {
        ...course,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
        totalStudents: course.enrollments.length,
        totalLessons,
      };
    });

    return NextResponse.json(coursesWithAggregates);
  } catch (error) {
    console.error('[COURSES_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}