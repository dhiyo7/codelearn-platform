import { CourseCatalog } from "@/components/courses/course-catalog"
import { Navbar } from "@/components/navigation/navbar"
import { AuthProvider } from "@/lib/auth"

export default function CoursesPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Course Catalog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our comprehensive collection of coding courses designed to take you from beginner to expert.
              Learn at your own pace with hands-on projects and expert instruction.
            </p>
          </div>
          <CourseCatalog />
        </main>
      </div>
    </AuthProvider>
  )
}
