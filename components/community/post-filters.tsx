"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface PostFiltersProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const filters = [
  { id: "all", name: "All Posts", count: 156 },
  { id: "project", name: "Projects", count: 45 },
  { id: "discussion", name: "Discussions", count: 67 },
  { id: "question", name: "Questions", count: 32 },
  { id: "achievement", name: "Achievements", count: 12 },
]

export function PostFilters({ selectedFilter, onFilterChange, sortBy, onSortChange }: PostFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className="flex items-center gap-2"
          >
            {filter.name}
            <Badge variant="secondary" className="text-xs">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="comments">Most Discussed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
