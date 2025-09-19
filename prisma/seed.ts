import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clear existing data in the correct order
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.review.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  const memberUser = await prisma.user.create({
    data: {
      email: 'member@example.com',
      name: 'Alex Member',
      password: hashedPassword,
      role: Role.MEMBER,
      image: 'https://i.pravatar.cc/150?u=member@example.com',
    },
  });

  const mentorUser = await prisma.user.create({
    data: {
      email: 'mentor@example.com',
      name: 'Sarah Mentor',
      password: hashedPassword,
      role: Role.MENTOR,
      image: 'https://i.pravatar.cc/150?u=mentor@example.com',
    },
  });

  console.log('Created users');

  // Create Categories
  const webDevCategory = await prisma.category.create({
    data: { name: 'Web Development' },
  });

  const dataScienceCategory = await prisma.category.create({
    data: { name: 'Data Science' },
  });

  console.log('Created categories');

  // Create Tags
  const jsTag = await prisma.tag.create({ data: { name: 'JavaScript' } });
  const reactTag = await prisma.tag.create({ data: { name: 'React' } });
  const pythonTag = await prisma.tag.create({ data: { name: 'Python' } });
  const pandasTag = await prisma.tag.create({ data: { name: 'Pandas' } });

  console.log('Created tags');

  // Create Courses, Modules, and Lessons
  const course1 = await prisma.course.create({
    data: {
      title: 'Full-Stack JavaScript',
      description: 'A comprehensive course on modern JavaScript development, from backend to frontend.',
      imageUrl: '/images/courses/full-stack-javascript.jpg',
      isPublished: true,
      difficulty: 'Intermediate',
      duration: 480, // in minutes
      categoryId: webDevCategory.id,
      instructorId: mentorUser.id,
      tags: {
        connect: [{ id: jsTag.id }, { id: reactTag.id }],
      },
      modules: {
        create: [
          {
            title: 'Module 1: Introduction to JavaScript',
            lessons: {
              create: [
                { title: 'Variables and Data Types', content: '...', duration: 25, isFree: true, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
                { title: 'Functions and Scope', content: '...', duration: 35, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
              ],
            },
          },
          {
            title: 'Module 2: React Fundamentals',
            lessons: {
              create: [
                { title: 'Components and Props', content: '...', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
                { title: 'State and Lifecycle', content: '...', duration: 50, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
              ],
            },
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Python for Data Science',
      description: 'Learn Python for data analysis and visualization with libraries like Pandas and Matplotlib.',
      imageUrl: '/images/courses/python-data-science.jpg',
      isPublished: true,
      difficulty: 'Beginner',
      duration: 360, // in minutes
      categoryId: dataScienceCategory.id,
      instructorId: mentorUser.id,
      tags: {
        connect: [{ id: pythonTag.id }, { id: pandasTag.id }],
      },
      modules: {
        create: [
          {
            title: 'Module 1: Python Basics',
            lessons: {
              create: [
                { title: 'Introduction to Python', content: '...', duration: 30, isFree: true, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
                { title: 'Data Structures', content: '...', duration: 40, videoUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Created courses, modules, and lessons');

  // Create Enrollments
  await prisma.enrollment.create({
    data: {
      userId: memberUser.id,
      courseId: course1.id,
      progress: 50,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: memberUser.id,
      courseId: course2.id,
      progress: 25,
    },
  });

  console.log('Created enrollments');
  
  // Create Reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'This course is amazing! The instructor is very clear and the content is top-notch.',
      userId: memberUser.id,
      courseId: course1.id,
    }
  });

  console.log('Created reviews');

  // Create Progress
  const course1Lessons = await prisma.lesson.findMany({ where: { module: { courseId: course1.id } } });
  if (course1Lessons.length > 0) {
      await prisma.progress.create({
          data: {
              userId: memberUser.id,
              lessonId: course1Lessons[0].id,
              completed: true,
          }
      });
  }
  if (course1Lessons.length > 1) {
      await prisma.progress.create({
          data: {
              userId: memberUser.id,
              lessonId: course1Lessons[1].id,
              completed: true,
          }
      });
  }

  console.log('Created progress');

  // Create Achievements
  await prisma.achievement.create({
    data: {
      userId: memberUser.id,
      title: 'JavaScript Novice',
      description: 'Completed the first JavaScript module.',
    },
  });

  console.log('Created achievements');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });