"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Code2, Users, Trophy } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export function HeroSection() {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                Latest updates
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                <span>New AI-powered courses</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Master coding with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              interactive learning
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of developers learning to code through hands-on projects, interactive challenges, and
            personalized mentorship. Build real applications while mastering the skills that matter.
          </p>

          <div className="mt-10 flex items-center gap-x-6">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}

            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-x-6 text-sm">
            <div className="flex items-center gap-x-2">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">50,000+ students</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Code2 className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">200+ courses</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Industry certified</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="/modern-coding-dashboard-with-dark-theme-showing-co.jpg"
              alt="CodeLearn Platform Dashboard"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}