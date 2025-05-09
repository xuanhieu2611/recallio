"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const data = [
  { day: "Mon", words: 8 },
  { day: "Tue", words: 12 },
  { day: "Wed", words: 5 },
  { day: "Thu", words: 10 },
  { day: "Fri", words: 7 },
  { day: "Sat", words: 16 },
  { day: "Sun", words: 4 },
]

export function DailyGoalChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Day
                        </span>
                        <span className="text-muted-foreground font-bold">
                          {payload[0].payload.day}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Words
                        </span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="words"
            // fill="hsl(var(--primary))"
            className="fill-purple-500/50"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
