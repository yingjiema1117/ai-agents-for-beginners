import { BookOpen, Smartphone, Home, Car, Gamepad2, Shirt, Coffee, MoreHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { CategoryCard } from '@/components/category-card'
import { prisma } from '@/lib/db'

const iconMap = {
  BookOpen,
  Smartphone,
  Home,
  Car,
  Gamepad2,
  Shirt,
  Coffee,
  MoreHorizontal,
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  })
  
  return categories.map(category => ({
    name: category.name,
    icon: iconMap[category.icon as keyof typeof iconMap] || MoreHorizontal,
    count: category._count.products,
  }))
}

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 8,
    where: {
      status: 'active'
    },
    include: {
      seller: {
        select: {
          name: true,
          university: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return products
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            留学生专属二手交易平台
          </h1>
          <p className="text-xl opacity-90 mb-6">
            安全便捷的校园二手交易，让你的留学生活更加经济实惠
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              开始购买
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              发布商品
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">热门分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">最新商品</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            查看更多 →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
