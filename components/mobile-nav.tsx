"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 bg-background">
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <Link
              href="#features"
              className="flex items-center text-lg font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center text-lg font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

