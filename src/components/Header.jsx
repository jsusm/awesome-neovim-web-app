import React from 'react'
import { Button } from './Button'
import { Menu, Moon } from 'lucide-react'

export function Header() {
  return (
    <div className="flex fixed bottom-8 right-4 gap-2 z-20 flex-col">
      <Button className="px-0 py-0 w-8 h-8 flex justify-center items-center text-gray-800">
        <Menu size={20} />
      </Button>
      <Button className="px-0 py-0 w-8 h-8 flex justify-center items-center text-gray-800">
        <Moon size={20} />
      </Button>
    </div>
  )
}
