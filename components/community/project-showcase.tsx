"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Github, Heart, Eye, Star } from "lucide-react"

const showcaseProjects = [
  {
    id: "1",
    title: "AI-Powered Code Review Tool",
    description:
      "An intelligent code review assistant that provides automated feedback and suggestions for improvement using machine learning.",
    author: {
      name: "Sarah Johnson",
      avatar: "/female-developer-avatar.png",
      level: 15,
    },
    image: "/placeholder.svg?key=project1",
    technologies: ["React", "Python", "TensorFlow", "Node.js"],
    likes: 342,
    views: 1250,
    stars: 89,
    liveUrl: "https://ai-code-review.demo.com",
    githubUrl: "https://github.com/sarah/ai-code-review",
  },
  {
    id: "2",
    title: "Real-time Collaboration Whiteboard",
    description:
      "A collaborative drawing and brainstorming tool with real-time synchronization, perfect for remote teams and online learning.",
    author: {
      name: "Mike Rodriguez",
      avatar: "/generic-placeholder-graphic.png",
      level: 12,
    },
    image: "/placeholder.svg?key=project2",
    technologies: ["Vue.js", "Socket.io", "Canvas API", "Express"],
    likes: 198,
    views: 876,
    stars: 45,
    liveUrl: "https://collab-whiteboard.demo.com",
    githubUrl: "https://github.com/mike/collab-whiteboard",
  },
  {
    id: "3",
    title: "Smart Learning Path Generator",
    description:
      "An adaptive learning system that creates personalized curriculum paths based on user goals, current skills, and learning preferences.",
    author: {
      name: "Dr. Alex Chen",
      avatar: "/male-developer-avatar-with-glasses.jpg",
      level: 20,
    },
    image: "/placeholder.svg?key=project3",
    technologies: ["React", "GraphQL", "PostgreSQL", "Machine Learning"],
    likes: 267,
    views: 1100,
    stars: 73,
    liveUrl: "https://smart-learning.demo.com",
    githubUrl: "https://github.com/alex/smart-learning-path",
  },
]

export function ProjectShowcase() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Showcase</h2>
          <p className="text-muted-foreground">Discover amazing projects built by our community members</p>
        </div>
        <Button>Submit Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {showcaseProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={project.author.avatar || "/placeholder.svg"} alt={project.author.name} />
                  <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{project.author.name}</p>
                  <p className="text-xs text-muted-foreground">Level {project.author.level}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{project.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{project.stars}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Github className="h-4 w-4 mr-2" />
                  Source Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share Your Project</CardTitle>
          <CardDescription>
            Built something amazing? Share it with the community and get feedback from fellow developers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full bg-transparent">
            Submit Your Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
