import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <li>
                <Link
                  href="https://github.com"
                  className="flex items-center text-foreground/70 hover:text-primary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>GitHub</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>

          <p className="text-sm text-foreground/60 text-center max-w-md">
            Built for academic use, no data tracking. This platform is designed to provide open access to research data.
          </p>

          <p className="text-xs text-foreground/50 text-center">
            &copy; {new Date().getFullYear()} Smart Open Data Search Portal
          </p>
        </div>
      </div>
    </footer>
  )
}
