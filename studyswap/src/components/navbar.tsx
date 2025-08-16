'use client'

import Link from 'next/link'
import { Search, User, Plus, MessageCircle, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">StudySwap</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索商品、品牌或用户..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            <Link
              href="/publish"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              发布商品
            </Link>
            
            <Link
              href="/messages"
              className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>
            
            <Link
              href="/favorites"
              className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
            >
              <Heart className="h-6 w-6" />
            </Link>
            
            <Link
              href="/profile"
              className="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}