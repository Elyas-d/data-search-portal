import { SearchBar } from "@/components/search-bar"
import { Navbar } from "@/components/navbar"
import { ResultsSection } from "@/components/results-section"
import Script from "next/script"

export default function Home() {
  // Schema.org structured data for SearchResultsPage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Smart Open Data Search Portal",
    url: "https://opendatasearch.org",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://opendatasearch.org/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    description: "A search portal for open research data resources",
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-muted/30 flex-grow transition-colors duration-300">
        <Navbar />
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Smart Open Data Search Portal
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mb-8">
            Discover, access, and utilize open data resources with our intelligent search platform
          </p>
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24" aria-label="Search Results">
          <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8 transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">Search Results</h2>
            <ResultsSection />
          </div>
        </section>
      </main>
    </>
  )
}
