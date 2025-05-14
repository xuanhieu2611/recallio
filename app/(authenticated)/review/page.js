import { Suspense } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FlashcardReview } from "@/components/review/flashcard-review"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useWordsContext } from "@/contexts/WordsContext"

export default function ReviewPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold tracking-tight">Review Words</h1>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground mt-2">
        Practice words using spaced repetition
      </p>

      <div className="mx-auto mt-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-primary h-5 w-5" />
              Due for Review
            </CardTitle>
            <CardDescription>
              18 words scheduled for review today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
            >
              <FlashcardReview />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
