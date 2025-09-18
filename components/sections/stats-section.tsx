import { Code2, Users, Award, BookOpen } from "lucide-react"

const stats = [
  {
    id: 1,
    name: "Active Students",
    value: "50,000+",
    icon: Users,
    description: "Learning and growing every day",
  },
  {
    id: 2,
    name: "Courses Available",
    value: "200+",
    icon: BookOpen,
    description: "From beginner to advanced",
  },
  {
    id: 3,
    name: "Projects Built",
    value: "1M+",
    icon: Code2,
    description: "Real-world applications created",
  },
  {
    id: 4,
    name: "Certifications",
    value: "25,000+",
    icon: Award,
    description: "Industry-recognized achievements",
  },
]

export function StatsSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by developers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join a thriving community of learners and build your coding career with confidence.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-card p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-4 text-sm font-semibold leading-6 text-muted-foreground">{stat.name}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-foreground">{stat.value}</dd>
                <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
