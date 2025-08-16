'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'
import { formatPrice, getImageUrls } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    images: string
    condition: string
    seller: {
      name: string
      university?: string
    }
    createdAt: Date
  }
}

const conditionLabels = {
  new: '全新',
  like_new: '几乎全新',
  good: '九成新',
  fair: '八成新',
  poor: '七成新以下'
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrls = getImageUrls(product.images)
  const mainImage = imageUrls[0] || '/placeholder-image.jpg'

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover"
          />
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              {conditionLabels[product.condition as keyof typeof conditionLabels]}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-2">
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{product.seller.university || '未知学校'}</span>
          </div>
          <span>{product.seller.name}</span>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          {new Date(product.createdAt).toLocaleDateString('zh-CN')}
        </div>
      </div>
    </div>
  )
}