import { Suspense } from "react"
import { ArrowLeft, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { WordSwipeCard } from "@/components/learn/word-swipe-card"

export default function LearnPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learn New Words</h1>
          <p className="text-muted-foreground">
            Swipe right to learn, left if you already know it
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Info className="text-primary h-5 w-5" />
              Today's Words
            </CardTitle>
            <CardDescription>
              6 words remaining in today's queue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-0">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-[300px] rounded-xl" />}
            >
              <WordSwipeCard />
            </Suspense>
          </CardContent>
          <CardFooter className="flex justify-center pt-8">
            <div className="flex w-full max-w-xs items-center justify-between">
              <Button variant="outline" size="lg" className="rounded-full">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">I know this word</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 rounded-full"
              >
                <Info className="h-5 w-5" />
                <span className="sr-only">Show details</span>
              </Button>
              <Button size="lg" className="rounded-full">
                <ArrowRight className="h-6 w-6" />
                <span className="sr-only">I want to learn this</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
