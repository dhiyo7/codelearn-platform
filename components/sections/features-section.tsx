import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Trophy, Code2, Zap, Target, BookOpen, MessageSquare, BarChart3 } from "lucide-react"

const features = [
  {
    title: "Interactive Learning",
    description: "Learn by doing with hands-on coding challenges and real-world projects that build your portfolio.",
    icon: Code2,
  },
  {
    title: "AI-Powered Assistance",
    description: "Get personalized help and feedback from our AI tutor that adapts to your learning style.",
    icon: Brain,
  },
  {
    title: "Expert Mentorship",
    description: "Connect with industry professionals who provide guidance and career advice.",
    icon: Users,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and achievement milestones.",
    icon: BarChart3,
  },
  {
    title: "Community Support",
    description: "Join study groups, participate in coding challenges, and learn from peers worldwide.",
    icon: MessageSquare,
  },
  {
    title: "Industry Certifications",
    description: "Earn recognized certificates that validate your skills to potential employers.",
    icon: Trophy,
  },
  {
    title: "Adaptive Curriculum",
    description: "Personalized learning paths that adjust based on your progress and goals.",
    icon: Target,
  },
  {
    title: "Fast-Track Learning",
    description: "Accelerated courses designed to get you job-ready in the shortest time possible.",
    icon: Zap,
  },
  {
    title: "Comprehensive Library",
    description: "Access to extensive documentation, tutorials, and reference materials.",
    icon: BookOpen,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform combines the best of interactive learning, community support, and expert guidance to accelerate
            your coding journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-semibold leading-7 text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
