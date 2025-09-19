import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CourseDetails } from '@/types/course';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
        isPublished: true,
      },
      include: {
        category: true,
        tags: true,
        instructor: true,
        modules: {
          include: {
            lessons: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        enrollments: true,
      },
    });

    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

    const isEnrolled = session?.user?.id
      ? course.enrollments.some(e => e.userId === session.user.id)
      : false;

    const courseDetails: CourseDetails = {
      ...course,
      totalLessons,
      isEnrolled,
    };

    return NextResponse.json(courseDetails);
  } catch (error) {
    console.error('[COURSE_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}