import React from 'react'
import { Button } from './Button'
import { Moon } from 'lucide-react'
import { TableOfContent } from './TOC'
import { useTheme } from '../context/theme'

export function Header() {
  const {toggleTheme} = useTheme()
  return (
    <div className="flex fixed bottom-8 right-4 gap-2 z-20 flex-col">
      <TableOfContent />
      <Button 
        className="px-0 py-0 w-8 h-8 flex justify-center items-center text-gray-800 dark:text-gray-200"
        onClick={() => {
          toggleTheme()
        }}
      >
        <Moon size={20} />
      </Button>
    </div>
  )
}
