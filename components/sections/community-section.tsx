import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"

const communityHighlights = [
  {
    id: 1,
    type: "project",
    title: "AI-Powered Task Manager",
    description: "Built a full-stack task management app with AI suggestions and real-time collaboration.",
    author: {
      name: "Emma Wilson",
      avatar: "/female-developer-avatar.png",
      role: "Full-Stack Developer",
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 12,
    },
    tags: ["React", "Node.js", "AI"],
    image: "/task-manager-app-interface-with-modern-design.jpg",
  },
  {
    id: 2,
    type: "achievement",
    title: "Completed Python Mastery Path",
    description: "Just finished the complete Python curriculum and built 5 real-world projects!",
    author: {
      name: "David Kim",
      avatar: "/male-developer-avatar-with-glasses.jpg",
      role: "Data Scientist",
    },
    stats: {
      likes: 189,
      comments: 28,
      shares: 8,
    },
    tags: ["Python", "Data Science", "Achievement"],
    image: "/python-code-and-data-visualization-charts.jpg",
  },
  {
    id: 3,
    type: "tutorial",
    title: "Building Responsive Layouts",
    description: "Sharing my approach to creating mobile-first responsive designs with CSS Grid and Flexbox.",
    author: {
      name: "Lisa Chen",
      avatar: "/female-designer-avatar.png",
      role: "UI/UX Designer",
    },
    stats: {
      likes: 156,
      comments: 32,
      shares: 15,
    },
    tags: ["CSS", "Design", "Tutorial"],
    image: "/responsive-web-design-layouts-on-different-devices.jpg",
  },
]

export function CommunitySection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Join Our Thriving Community</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Connect with fellow developers, share your projects, and learn from each other's experiences. Our community
            is here to support your growth every step of the way.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {communityHighlights.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="text-sm">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.stats.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.stats.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.stats.shares}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/community">
              Join the Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
