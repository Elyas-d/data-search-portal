"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality here
    window.dispatchEvent(
      new CustomEvent("search", {
        detail: { query, isLoading: true },
      }),
    )

    // Simulate search delay
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("search", {
          detail: {
            query,
            isLoading: false,
            results: query.trim() ? generateMockResults(query) : [],
          },
        }),
      )
    }, 1500)
  }

  // Generate mock results for demo purposes
  const generateMockResults = (query: string) => {
    if (query.toLowerCase().includes("empty")) return []

    // Create some sample tags that will work with our filters
    const possibleTags = [
      "CSV",
      "JSON",
      "XML",
      "API",
      "PDF",
      "Daily",
      "Weekly",
      "Monthly",
      "Quarterly",
      "Yearly",
      "Government",
      "Academic",
      "Commercial",
      "Non-profit",
      "Crowdsourced",
      "Public Domain",
      "Open License",
      "Research Only",
      "Commercial Use",
      "open data",
      query.toLowerCase(),
    ]

    return Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => {
      // Generate 2-4 random tags for each result
      const numTags = Math.floor(Math.random() * 3) + 2
      const tags = []
      for (let j = 0; j < numTags; j++) {
        const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)]
        if (!tags.includes(randomTag)) {
          tags.push(randomTag)
        }
      }

      return {
        id: `result-${i}`,
        title: `${query} Dataset ${i + 1}`,
        description: `This is a sample dataset related to "${query}" with various metrics and indicators.`,
        author: `Data Provider ${i + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
        tags: tags,
      }
    })
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="flex w-full max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search for open data resources..."
          className="w-full h-14 pl-5 pr-16 rounded-l-lg text-base shadow-md focus-visible:ring-2 transition-all duration-200 border-r-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          className="h-14 px-6 rounded-l-none rounded-r-lg shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <Search className="h-5 w-5 mr-2" />
          <span>Search</span>
        </Button>
      </div>
    </form>
  )
}
