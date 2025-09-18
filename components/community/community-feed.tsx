"use client"

import { useState } from "react"
import { PostCard } from "./post-card"
import { PostFilters } from "./post-filters"
import { communityPosts } from "@/lib/data/community"

export function CommunityFeed() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredPosts = communityPosts.filter((post) => {
    if (selectedFilter === "all") return true
    return post.type === selectedFilter
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "comments":
        return b.comments - a.comments
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <PostFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
