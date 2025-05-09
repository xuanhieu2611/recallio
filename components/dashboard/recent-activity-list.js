"use client"

import { formatDistanceToNow } from "date-fns"
import { BookOpen, Check, Clock, RefreshCw, X } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for recent activity
const activities = [
  {
    id: 1,
    type: "learned",
    word: "Ephemeral",
    definition: "Lasting for a very short time",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 2,
    type: "reviewed",
    word: "Ubiquitous",
    result: "correct",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    type: "reviewed",
    word: "Sycophant",
    result: "incorrect",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: 4,
    type: "learned",
    word: "Pernicious",
    definition:
      "Having a harmful effect, especially in a gradual or subtle way",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: 5,
    type: "scheduled",
    word: "Gregarious",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // Due in 24 hours
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
  },
]

export function RecentActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <ActivityAvatar type={activity.type} result={activity.result} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.word}</h4>
              <time className="text-muted-foreground text-xs">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </time>
            </div>
            <p className="text-muted-foreground text-sm">
              {getActivityDescription(activity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ActivityAvatar({ type, result }) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback className={getAvatarColor(type, result)}>
        {getAvatarIcon(type, result)}
      </AvatarFallback>
    </Avatar>
  )
}

function getAvatarColor(type, result) {
  switch (type) {
    case "learned":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    case "reviewed":
      return result === "correct"
        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
        : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
    case "scheduled":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
  }
}

function getAvatarIcon(type, result) {
  switch (type) {
    case "learned":
      return <BookOpen className="h-5 w-5" />
    case "reviewed":
      return result === "correct" ? (
        <Check className="h-5 w-5" />
      ) : (
        <X className="h-5 w-5" />
      )
    case "scheduled":
      return <Clock className="h-5 w-5" />
    default:
      return <RefreshCw className="h-5 w-5" />
  }
}

function getActivityDescription(activity) {
  switch (activity.type) {
    case "learned":
      return `You learned: ${activity.definition}`
    case "reviewed":
      return activity.result === "correct"
        ? "You successfully recalled this word"
        : "You had difficulty recalling this word"
    case "scheduled":
      return `Scheduled for review ${formatDistanceToNow(activity.dueDate, { addSuffix: true })}`
    default:
      return ""
  }
}
