import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clear existing data in the correct order
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'member@example.com',
      name: 'Alex Member',
      password: hashedPassword,
      role: Role.MEMBER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'mentor@example.com',
      name: 'Sarah Mentor',
      password: hashedPassword,
      role: Role.MENTOR,
    },
  });
  
  console.log('Created users');

  // Create Courses, Modules, and Lessons
  const course1 = await prisma.course.create({
    data: {
      title: 'Full-Stack JavaScript',
      description: 'A comprehensive course on modern JavaScript development.',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Module 1: Introduction to JavaScript',
            lessons: {
              create: [
                { title: 'Variables and Data Types', content: '...' },
                { title: 'Functions and Scope', content: '...' },
              ],
            },
          },
          {
            title: 'Module 2: React Fundamentals',
            lessons: {
              create: [
                { title: 'Components and Props', content: '...' },
                { title: 'State and Lifecycle', content: '...' },
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
      description: 'Learn Python for data analysis and visualization.',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Module 1: Python Basics',
            lessons: {
              create: [
                { title: 'Introduction to Python', content: '...' },
                { title: 'Data Structures', content: '...' },
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
      userId: user1.id,
      courseId: course1.id,
      progress: 50,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: user1.id,
      courseId: course2.id,
      progress: 25,
    },
  });
  
  console.log('Created enrollments');

  // Create Progress
  const course1Lessons = await prisma.lesson.findMany({ where: { module: { courseId: course1.id } } });
  if (course1Lessons.length > 0) {
      await prisma.progress.create({
          data: {
              userId: user1.id,
              lessonId: course1Lessons[0].id,
              completed: true,
          }
      });
  }
  if (course1Lessons.length > 1) {
      await prisma.progress.create({
          data: {
              userId: user1.id,
              lessonId: course1Lessons[1].id,
              completed: true,
          }
      });
  }

  console.log('Created progress');

  // Create Achievements
  await prisma.achievement.create({
    data: {
      userId: user1.id,
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