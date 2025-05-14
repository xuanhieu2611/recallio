"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, ArrowRight, Info, Plus } from "lucide-react"
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
import { AddWordForm } from "@/components/learn/add-word-form"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function LearnPage() {
  const [showAddWordForm, setShowAddWordForm] = useState(false)
  const [wordQueue, setWordQueue] = useState([])

  const handleAddWord = (word) => {
    setWordQueue((prev) => [...prev, word])
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold tracking-tight">Learn New Words</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddWordForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Word
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mt-2">
        Swipe right to learn, left if you already know it
      </p>

      <div className="mx-auto mt-8 max-w-md">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Info className="text-primary h-5 w-5" />
              Today's Words
            </CardTitle>
            <CardDescription>
              {6 + wordQueue.length} words remaining in today's queue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-0">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-[300px] rounded-xl" />}
            >
              <WordSwipeCard customWords={wordQueue} />
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

      <AddWordForm
        open={showAddWordForm}
        onOpenChange={setShowAddWordForm}
        onAddWord={handleAddWord}
      />
    </div>
  )
}
