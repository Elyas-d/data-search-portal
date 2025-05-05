"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type FilterCategory = {
  name: string
  options: string[]
}

const filterCategories: FilterCategory[] = [
  {
    name: "Data Format",
    options: ["CSV", "JSON", "XML", "API", "PDF"],
  },
  {
    name: "Update Frequency",
    options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
  },
  {
    name: "Source Type",
    options: ["Government", "Academic", "Commercial", "Non-profit", "Crowdsourced"],
  },
  {
    name: "License",
    options: ["Public Domain", "Open License", "Research Only", "Commercial Use"],
  },
]

export function SidebarFilter() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

  // Initialize open categories and selected filters
  useEffect(() => {
    const initialOpenCategories: Record<string, boolean> = {}
    const initialSelectedFilters: Record<string, string[]> = {}

    filterCategories.forEach((category) => {
      initialOpenCategories[category.name] = true
      initialSelectedFilters[category.name] = []
    })

    setOpenCategories(initialOpenCategories)
    setSelectedFilters(initialSelectedFilters)
  }, [])

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[category] || []
      const newFilters = currentFilters.includes(option)
        ? currentFilters.filter((item) => item !== option)
        : [...currentFilters, option]

      return {
        ...prev,
        [category]: newFilters,
      }
    })
  }

  const applyFilters = () => {
    // Create a flattened array of all selected filters
    const allSelectedFilters = Object.values(selectedFilters).flat()

    // Dispatch event with selected filters
    window.dispatchEvent(
      new CustomEvent("applyFilters", {
        detail: { filters: allSelectedFilters },
      }),
    )

    // Close mobile filter on apply
    setIsMobileFilterOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: Record<string, string[]> = {}
    Object.keys(selectedFilters).forEach((category) => {
      clearedFilters[category] = []
    })
    setSelectedFilters(clearedFilters)

    window.dispatchEvent(
      new CustomEvent("applyFilters", {
        detail: { filters: [] },
      }),
    )
  }

  const countSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0)
  }

  const filterCount = countSelectedFilters()

  // Sidebar content - reused in both desktop and mobile views
  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
          Filters
        </h3>
        {filterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs hover:bg-muted transition-colors duration-200"
            aria-label="Clear all filters"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator className="mb-4" />

      <div className="space-y-6" role="group" aria-label="Filter options">
        {filterCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer rounded-md p-1.5 -ml-1.5 hover:bg-muted transition-colors duration-200"
              onClick={() => toggleCategory(category.name)}
              role="button"
              aria-expanded={openCategories[category.name]}
              aria-controls={`filter-group-${category.name}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleCategory(category.name)
                }
              }}
            >
              <h4 className="font-medium text-sm">{category.name}</h4>
              <div className="transition-transform duration-200">
                {openCategories[category.name] ? (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
            </div>

            {openCategories[category.name] && (
              <div
                className="pl-2 space-y-1 animate-in slide-in-from-top-2 duration-200"
                id={`filter-group-${category.name}`}
                role="group"
                aria-labelledby={`filter-group-${category.name}-label`}
              >
                {category.options.map((option) => (
                  <div
                    key={option}
                    className="flex items-center space-x-2 rounded-md p-1 -ml-1 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Checkbox
                      id={`${category.name}-${option}`}
                      checked={selectedFilters[category.name]?.includes(option) || false}
                      onCheckedChange={() => toggleFilter(category.name, option)}
                      aria-label={`Filter by ${option}`}
                      className="transition-all duration-200"
                    />
                    <Label htmlFor={`${category.name}-${option}`} className="text-sm cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={applyFilters} className="w-full transition-all duration-300 hover:shadow-md">
          Apply Filters {filterCount > 0 && `(${filterCount})`}
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:block w-64 shrink-0 pr-6 animate-in slide-in-from-left-5 duration-300"
        aria-label="Filter sidebar"
      >
        {filterContent}
      </aside>

      {/* Mobile filter dropdown */}
      <div className="md:hidden mb-4 animate-in fade-in duration-300">
        <Collapsible open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-between transition-colors duration-200"
              aria-label={`${isMobileFilterOpen ? "Hide" : "Show"} filters ${filterCount > 0 ? `(${filterCount} active)` : ""}`}
              aria-expanded={isMobileFilterOpen}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filters {filterCount > 0 && `(${filterCount})`}
              </span>
              <div className="transition-transform duration-200">
                {isMobileFilterOpen ? (
                  <ChevronDown className="h-4 w-4 ml-2" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4 ml-2" aria-hidden="true" />
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 border rounded-md bg-card animate-in slide-in-from-top-2 duration-200">
            {filterContent}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
