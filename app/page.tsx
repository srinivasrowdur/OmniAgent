import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Layers, Zap, Shield, ArrowRight } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { AgentAnimation } from "@/components/agent-animation"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="OmniAgent Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">OmniAgent</span>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
          </nav>

          <div className="flex items-center">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    One Agent to Connect Them All
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Simplify your workflow with a single intelligent agent that communicates with multiple specialized
                    agents behind the scenes.
                  </p>
                </div>
                <div>
                  <Link href="/try">
                    <Button size="lg" className="h-12">
                      Try OmniAgent <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:order-last">
                <AgentAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose One Agent Instead of Many
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  OmniAgent provides a seamless experience by coordinating multiple specialized agents through a single
                  interface.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background">
                <div className="rounded-full bg-primary/10 p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Single Interface</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Communicate with one agent that understands all your needs and coordinates the right specialists.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background">
                <div className="rounded-full bg-primary/10 p-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-Agent Orchestration</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Behind the scenes, OmniAgent coordinates with specialized agents to solve complex problems.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Increased Efficiency</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Save time by eliminating the need to switch between multiple agent interfaces and conversations.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Consistent Experience</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Enjoy a unified, consistent experience regardless of which specialized agents are working for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simplicity Meets Sophistication
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  See how OmniAgent works behind the scenes to deliver a seamless experience.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-12 py-12 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Your Single Point of Contact</h3>
                  <p className="text-muted-foreground">
                    You interact with OmniAgent just like any other conversational AI. Ask questions, give instructions,
                    or request assistance with any task.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Behind the Scenes Orchestration</h3>
                  <p className="text-muted-foreground">
                    OmniAgent intelligently routes your requests to specialized agents with expertise in specific
                    domains, from research to coding to content creation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Unified Response</h3>
                  <p className="text-muted-foreground">
                    You receive a cohesive response that combines the expertise of multiple agents, all delivered
                    through a single, consistent interface.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/agent-orchestration.png"
                  width={500}
                  height={500}
                  alt="Agent Orchestration"
                  className="rounded-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

