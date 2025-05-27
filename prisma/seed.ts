import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  // Получаем существующего админа
  const admin = await db.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (!admin) {
    throw new Error('Admin user not found');
  }

  // Категории
  const [cardio, strength, flexibility] = await Promise.all([
    db.category.upsert({
      where: { slug: 'cardio' },
      update: {},
      create: { 
        name: 'Кардио', 
        slug: 'cardio', 
        description: 'Кардио тренировки для улучшения выносливости и сжигания калорий' 
      },
    }),
    db.category.upsert({
      where: { slug: 'strength' },
      update: {},
      create: { 
        name: 'Силовые', 
        slug: 'strength', 
        description: 'Силовые тренировки для набора мышечной массы и силы' 
      },
    }),
    db.category.upsert({
      where: { slug: 'flexibility' },
      update: {},
      create: { 
        name: 'Гибкость', 
        slug: 'flexibility', 
        description: 'Тренировки на гибкость и растяжку для улучшения подвижности' 
      },
    }),
  ]);

  // Воркауты
  await db.workout.create({
    data: {
      title: 'Быстрое кардио',
      description: 'Интенсивная кардио тренировка для сжигания жира.',
      duration: 30,
      level: 'beginner',
      calories: 250,
      image_url: '/workouts/cardio1.svg',
      video_url: 'https://youtube.com/cardio1',
      categoryId: cardio.id,
      userId: admin.id,
    },
  });
  await db.workout.create({
    data: {
      title: 'Силовой взрыв',
      description: 'Комплекс для набора мышечной массы.',
      duration: 45,
      level: 'intermediate',
      calories: 400,
      image_url: '/workouts/strength1.svg',
      video_url: 'https://youtube.com/strength1',
      categoryId: strength.id,
      userId: admin.id,
    },
  });
  await db.workout.create({
    data: {
      title: 'Растяжка для всех',
      description: 'Улучшение гибкости и подвижности.',
      duration: 20,
      level: 'beginner',
      calories: 100,
      image_url: '/workouts/flex1.svg',
      video_url: 'https://youtube.com/flex1',
      categoryId: flexibility.id,
      userId: admin.id,
    },
  });

  // Посты блога
  await db.post.create({
    data: {
      title: 'Как начать тренироваться дома',
      content: 'Советы для новичков по домашним тренировкам.',
      image_url: '/blog/home.svg',
      userId: admin.id,
    },
  });
  await db.post.create({
    data: {
      title: 'Питание для набора массы',
      content: 'Что есть, чтобы набирать мышечную массу.',
      image_url: '/blog/mass.svg',
      userId: admin.id,
    },
  });

  // Планы питания
  await db.plan.create({
    data: {
      title: 'План питания для похудения',
      description: 'Сбалансированный рацион для снижения веса.',
      duration: 14,
      level: 'beginner',
      image_url: '/plans/lose.svg',
      userId: admin.id,
    },
  });
  await db.plan.create({
    data: {
      title: 'План питания для набора массы',
      description: 'Питание для роста мышц.',
      duration: 30,
      level: 'intermediate',
      image_url: '/plans/gain.svg',
      userId: admin.id,
    },
  });

  // События планировщика
  await db.plannerEvent.create({
    data: {
      title: 'Утренняя тренировка',
      description: 'Кардио на свежем воздухе',
      start: new Date('2024-06-01T08:00:00Z'),
      end: new Date('2024-06-01T09:00:00Z'),
      userId: admin.id,
    },
  });
  await db.plannerEvent.create({
    data: {
      title: 'Вечерняя растяжка',
      description: 'Расслабляющая тренировка на гибкость',
      start: new Date('2024-06-01T19:00:00Z'),
      end: new Date('2024-06-01T20:00:00Z'),
      userId: admin.id,
    },
  });
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  }); 