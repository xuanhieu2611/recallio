import { Suspense } from "react"
import { ArrowLeft, BarChart3, BookOpen, Calendar, Clock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { MasteryChart } from "@/components/mastery/mastery-chart"
import { LearningTrendChart } from "@/components/mastery/learning-trend-chart"
import { WordCategoryChart } from "@/components/mastery/word-category-chart"

export default function MasteryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mastery Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your vocabulary progress over time
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Words"
          value="400"
          description="In your vocabulary"
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
        />
        <StatsCard
          title="Learning Streak"
          value="7 days"
          description="Current streak"
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
        />
        <StatsCard
          title="Average Review Time"
          value="1.2 min"
          description="Per word"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
        />
      </div>

      <div className="mt-8">
        <Tabs defaultValue="mastery">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="mastery">Mastery</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="mastery" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="text-primary h-5 w-5" />
                  Word Mastery Progress
                </CardTitle>
                <CardDescription>
                  Your vocabulary learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <MasteryChart className="h-[400px]" />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Trends</CardTitle>
                <CardDescription>Words learned over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <LearningTrendChart className="h-[400px]" />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Word Categories</CardTitle>
                <CardDescription>Distribution by word type</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <WordCategoryChart className="h-[400px]" />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatsCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  )
}
