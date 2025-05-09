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

export default function ReviewPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Words</h1>
          <p className="text-muted-foreground">
            Practice words using spaced repetition
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
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
