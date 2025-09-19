import CourseCatalog from '@/components/courses/course-catalog';
import { CourseSummary } from '@/types/course';
import { prisma } from '@/lib/prisma';
import { GetServerSideProps } from 'next';

async function getCourses(): Promise<CourseSummary[]> {
  // This logic is similar to our API route, but executed on the server during build/request time.
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

    // We remove the large fields that are not needed for the summary card
    const { modules, reviews, enrollments, description, ...rest } = course;

    return {
      ...rest,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews,
      totalStudents: course.enrollments.length,
      totalLessons,
    };
  });

  return coursesWithAggregates;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Courses</h1>
      <CourseCatalog courses={courses} />
    </div>
  );
}