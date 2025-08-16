'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  category: {
    name: string
    icon: LucideIcon
    count: number
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon

  return (
    <Link
      href={category.count > 0 ? `/categories/${encodeURIComponent(category.name)}` : '#'}
      className="group block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <IconComponent className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          {category.count > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {category.count} 件商品
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}