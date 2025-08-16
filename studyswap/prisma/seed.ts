import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建分类
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: '教材书籍' },
      update: {},
      create: {
        name: '教材书籍',
        nameEn: 'Textbooks',
        description: '教科书、参考书、学习资料',
        icon: 'BookOpen',
      },
    }),
    prisma.category.upsert({
      where: { name: '电子设备' },
      update: {},
      create: {
        name: '电子设备',
        nameEn: 'Electronics',
        description: '手机、电脑、平板、耳机等电子产品',
        icon: 'Smartphone',
      },
    }),
    prisma.category.upsert({
      where: { name: '家居用品' },
      update: {},
      create: {
        name: '家居用品',
        nameEn: 'Home & Living',
        description: '家具、装饰品、厨房用品',
        icon: 'Home',
      },
    }),
    prisma.category.upsert({
      where: { name: '交通工具' },
      update: {},
      create: {
        name: '交通工具',
        nameEn: 'Transportation',
        description: '自行车、滑板、电动车',
        icon: 'Car',
      },
    }),
    prisma.category.upsert({
      where: { name: '服装配饰' },
      update: {},
      create: {
        name: '服装配饰',
        nameEn: 'Fashion',
        description: '衣服、鞋子、包包、饰品',
        icon: 'Shirt',
      },
    }),
  ])

  // 创建测试用户
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'test1@example.com' },
      update: {},
      create: {
        email: 'test1@example.com',
        name: '李同学',
        university: '清华大学',
        city: '北京',
        country: '中国',
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'test2@example.com' },
      update: {},
      create: {
        email: 'test2@example.com',
        name: '王同学',
        university: '北京大学',
        city: '北京',
        country: '中国',
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'test3@example.com' },
      update: {},
      create: {
        email: 'test3@example.com',
        name: '张同学',
        university: '人民大学',
        city: '北京',
        country: '中国',
        verified: true,
      },
    }),
  ])

  // 创建示例商品
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: '微观经济学教材 (第9版)',
        description: '曼昆微观经济学原理，九成新，无笔记涂画，适合经济学专业学生使用。',
        price: 88,
        images: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        condition: 'good',
        city: '北京',
        university: '清华大学',
        categoryId: categories[0].id, // 教材书籍
        sellerId: users[0].id,
      },
    }),
    prisma.product.create({
      data: {
        title: 'MacBook Air M1 13寸 256GB',
        description: 'MacBook Air M1芯片，13英寸，256GB存储，几乎全新，保修还有1年，包装盒配件齐全。',
        price: 6800,
        images: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        condition: 'like_new',
        city: '北京',
        university: '北京大学',
        categoryId: categories[1].id, // 电子设备
        sellerId: users[1].id,
      },
    }),
    prisma.product.create({
      data: {
        title: 'IKEA书桌椅套装',
        description: 'IKEA书桌加转椅套装，使用半年，九成新，非常适合学习办公。搬家急售。',
        price: 280,
        images: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        condition: 'good',
        city: '北京',
        university: '人民大学',
        categoryId: categories[2].id, // 家居用品
        sellerId: users[2].id,
      },
    }),
    prisma.product.create({
      data: {
        title: 'iPhone 14 Pro 128GB 深空黑',
        description: 'iPhone 14 Pro，128GB，深空黑色，使用3个月，无磨损，有贴膜保护。',
        price: 5200,
        images: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
        condition: 'like_new',
        city: '北京',
        university: '清华大学',
        categoryId: categories[1].id, // 电子设备
        sellerId: users[0].id,
      },
    }),
    prisma.product.create({
      data: {
        title: '数据结构与算法分析教材',
        description: 'Weiss著，数据结构与算法分析C++版本，经典教材，八成新。',
        price: 45,
        images: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
        condition: 'fair',
        city: '北京',
        university: '北京大学',
        categoryId: categories[0].id, // 教材书籍
        sellerId: users[1].id,
      },
    }),
  ])

  console.log('Database has been seeded!')
  console.log('Categories created:', categories.length)
  console.log('Users created:', users.length)
  console.log('Products created:', products.length)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })