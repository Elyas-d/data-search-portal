import { Calendar, User, Tag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Script from "next/script"

type DataCardProps = {
  data: {
    id: string
    title: string
    description: string
    author: string
    date: string
    tags: string[]
  }
}

export function DataCard({ data }: DataCardProps) {
  // Schema.org structured data for Dataset
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: data.title,
    description: data.description,
    creator: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: data.date,
    keywords: data.tags.join(", "),
  }

  return (
    <>
      <Script
        id={`structured-data-${data.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] h-full flex flex-col border-border bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold line-clamp-2">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground/80 text-sm line-clamp-3 mb-4">{data.description}</p>
          <div className="flex flex-wrap gap-2 mt-2" aria-label="Dataset tags">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground transition-colors duration-200 hover:bg-muted/80"
              >
                <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-4 text-xs text-foreground/60 flex flex-col items-start gap-2">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>Author: {data.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>Published: {data.date}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
