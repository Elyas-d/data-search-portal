"use client"

import { useEffect, useState } from "react"
import { Loader2, Search } from "lucide-react"
import { DataCard } from "@/components/data-card"
import { SidebarFilter } from "@/components/sidebar-filter"

type SearchResult = {
  id: string
  title: string
  description: string
  author: string
  date: string
  tags: string[]
}

type SearchEvent = CustomEvent<{
  query: string
  isLoading: boolean
  results?: SearchResult[]
}>

type FilterEvent = CustomEvent<{
  filters: string[]
}>

export function ResultsSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [allResults, setAllResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    const handleSearch = (event: Event) => {
      const searchEvent = event as SearchEvent
      setIsLoading(searchEvent.detail.isLoading)

      if (!searchEvent.detail.isLoading && searchEvent.detail.results) {
        const results = searchEvent.detail.results
        setAllResults(results)
        applyFiltersToResults(results, activeFilters)
        setHasSearched(true)
      }
    }

    const handleApplyFilters = (event: Event) => {
      const filterEvent = event as FilterEvent
      const filters = filterEvent.detail.filters
      setActiveFilters(filters)
      applyFiltersToResults(allResults, filters)
    }

    window.addEventListener("search", handleSearch)
    window.addEventListener("applyFilters", handleApplyFilters)

    return () => {
      window.removeEventListener("search", handleSearch)
      window.removeEventListener("applyFilters", handleApplyFilters)
    }
  }, [allResults, activeFilters])

  const applyFiltersToResults = (results: SearchResult[], filters: string[]) => {
    if (!filters.length) {
      setFilteredResults(results)
      return
    }

    const filtered = results.filter((result) => {
      // Check if any of the result's tags match any of the active filters
      // Case-insensitive comparison
      return result.tags.some((tag) =>
        filters.some(
          (filter) =>
            tag.toLowerCase() === filter.toLowerCase() || result.title.toLowerCase().includes(filter.toLowerCase()),
        ),
      )
    })

    setFilteredResults(filtered)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16" aria-live="polite" aria-busy="true">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" aria-hidden="true" />
          <p className="text-lg text-foreground/80">Searching for data resources...</p>
        </div>
      )
    }

    if (hasSearched && filteredResults.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center" aria-live="polite">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Search className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-foreground/80 max-w-md">
            We couldn't find any data resources matching your search or filters. Try using different keywords or
            adjusting your filters.
          </p>
        </div>
      )
    }

    if (!hasSearched) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Search className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start your search</h3>
          <p className="text-foreground/80 max-w-md">
            Enter keywords in the search box above to discover open data resources.
          </p>
        </div>
      )
    }

    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-in fade-in duration-500"
        role="feed"
        aria-busy={isLoading}
        aria-label="Search results"
      >
        {filteredResults.map((result) => (
          <div
            key={result.id}
            role="article"
            className="animate-in fade-in slide-in-from-bottom-3 duration-500 stagger-1"
          >
            <DataCard data={result} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Only show sidebar if search has been performed */}
      {hasSearched && <SidebarFilter />}
      <div className="flex-1">{renderContent()}</div>
    </div>
  )
}
