"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommunityFeed } from "./community-feed"
import { StudyGroups } from "./study-groups"
import { ProjectShowcase } from "./project-showcase"
import { CreatePost } from "./create-post"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CommunityPage() {
  const [showCreatePost, setShowCreatePost] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Community</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Connect with fellow developers, share your projects, ask questions, and learn together in our vibrant
              coding community.
            </p>
          </div>
          <Button onClick={() => setShowCreatePost(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} />}

      {/* Community Tabs */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="showcase">Project Showcase</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-6">
          <CommunityFeed />
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <StudyGroups />
        </TabsContent>

        <TabsContent value="showcase" className="mt-6">
          <ProjectShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
