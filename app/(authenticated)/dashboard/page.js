import { Suspense } from "react"
import Link from "next/link"

import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { DailyGoalChart } from "@/components/dashboard/daily-goal-chart"
import { WordMasteryChart } from "@/components/dashboard/word-mastery-chart"
import { RecentActivityList } from "@/components/dashboard/recent-activity-list"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <p className="text-muted-foreground mt-2">
        Track your vocabulary learning progress and daily goals
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Words Mastered"
          value="127"
          description="Total words learned"
          icon={<Award className="h-5 w-5 text-emerald-500" />}
        />
        <StatsCard
          title="Learning Queue"
          value="42"
          description="Words in progress"
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
        />
        <StatsCard
          title="Due for Review"
          value="18"
          description="Review today"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
        />
        <StatsCard
          title="Learning Streak"
          value="7 days"
          description="Keep it up!"
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary h-5 w-5" />
              Daily Goal
            </CardTitle>
            <CardDescription>Learn 10 new words today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progress: 4/10 words</span>
              <span className="text-muted-foreground text-sm">40%</span>
            </div>
            <Progress value={40} className="h-2" />
            <Suspense fallback={<Skeleton className="mt-6 h-[200px] w-full" />}>
              <DailyGoalChart className="mt-6 h-[200px]" />
            </Suspense>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/learn">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Word Mastery</CardTitle>
            <CardDescription>Your vocabulary progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
              <WordMasteryChart className="h-[250px]" />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your learning history</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ActivitySkeleton />}>
              <RecentActivityList />
            </Suspense>
          </CardContent>
        </Card>
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

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  )
}
