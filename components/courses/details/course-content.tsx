"use client"

import { CourseDetails } from "@/types/course" // Corrected import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, PlayCircle, Lock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface CourseContentProps {
  course: CourseDetails
}

export function CourseContent({ course }: CourseContentProps) {
  return (
    <Tabs defaultValue="curriculum" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="curriculum" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={module.id}>
                  <AccordionTrigger>{module.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            {lesson.isFree ? <PlayCircle className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {course.reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.user.image || ""} alt={review.user.name || ""} />
                  <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
            {course.reviews.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No reviews yet.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}