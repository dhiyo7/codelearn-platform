"use client"

import { useState, useMemo } from "react"
import { CourseCard } from "./course-card"
import { CourseFilters } from "./course-filters"
import { CourseSummary } from "@/types/course"

interface CourseCatalogProps {
  courses: CourseSummary[];
}

export default function CourseCatalog({ courses }: CourseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Courses")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [sortBy, setSortBy] = useState("popular")

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "All Courses" ||
        course.category?.name.toLowerCase() === selectedCategory.toLowerCase()

      const matchesDifficulty =
        selectedDifficulty === "All Levels" || (course.difficulty && course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase())

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.totalStudents - a.totalStudents)
        break
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "duration":
        filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0))
        break
      default:
        break
    }

    return filtered
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const categories = useMemo(() => {
    const allCategories = courses.map(course => course.category?.name).filter(Boolean) as string[];
    return ["All Courses", ...Array.from(new Set(allCategories))];
  }, [courses]);

  const difficulties = useMemo(() => {
    const allDifficulties = courses.map(course => course.difficulty).filter(Boolean) as string[];
    return ["All Levels", ...Array.from(new Set(allDifficulties))];
  }, [courses]);


  return (
    <div className="space-y-6">
      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        difficulties={difficulties}
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