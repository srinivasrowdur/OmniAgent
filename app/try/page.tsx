import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { AgentSelector } from "@/components/agent-selector"

export default function TryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6 max-w-screen-xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-xl mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter mb-6">Try OmniAgent</h1>
          <p className="text-muted-foreground mb-8">
            Select an agent to start a conversation. Each agent has different capabilities and specialties.
          </p>

          <AgentSelector />
        </div>
      </main>
    </div>
  )
}

