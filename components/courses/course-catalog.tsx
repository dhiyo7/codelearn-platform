"use client"

import { useState, useMemo } from "react"
import { CourseCard } from "./course-card"
import { CourseFilters } from "./course-filters"
import { courses } from "@/lib/data/courses"

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Courses")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [sortBy, setSortBy] = useState("popular")

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === "All Courses" ||
        course.tags.some(
          (tag) =>
            selectedCategory.toLowerCase().includes(tag.toLowerCase()) ||
            tag.toLowerCase().includes(selectedCategory.toLowerCase()),
        )

      const matchesDifficulty =
        selectedDifficulty === "All Levels" || course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      case "duration":
        filtered.sort((a, b) => {
          const aDuration = Number.parseInt(a.duration.split(" ")[0])
          const bDuration = Number.parseInt(b.duration.split(" ")[0])
          return aDuration - bDuration
        })
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  return (
    <div className="space-y-6">
      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredAndSortedCourses.length} of {courses.length} courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredAndSortedCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}
