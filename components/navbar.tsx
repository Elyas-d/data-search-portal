"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Database } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="bg-background border-b border-border shadow-sm transition-colors duration-300"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            aria-label="Smart Open Data Search Portal Home"
          >
            <Database className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl text-foreground">OpenData</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-6 mr-4">
              <Link
                href="/"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                Privacy
              </Link>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-in slide-in-from-top-5 duration-300">
            <Link
              href="/"
              className="block px-2 py-2 text-foreground/80 hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 text-foreground/80 hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="block px-2 py-2 text-foreground/80 hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
