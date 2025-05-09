"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const data = [
  { date: "Week 1", newWords: 15, reviewedWords: 0 },
  { date: "Week 2", newWords: 20, reviewedWords: 10 },
  { date: "Week 3", newWords: 25, reviewedWords: 25 },
  { date: "Week 4", newWords: 18, reviewedWords: 40 },
  { date: "Week 5", newWords: 22, reviewedWords: 55 },
  { date: "Week 6", newWords: 30, reviewedWords: 70 },
  { date: "Week 7", newWords: 25, reviewedWords: 90 },
  { date: "Week 8", newWords: 28, reviewedWords: 110 },
]

export function LearningTrendChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Date
                        </span>
                        <span className="text-muted-foreground font-bold">
                          {payload[0].payload.date}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          New Words
                        </span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Reviewed Words
                        </span>
                        <span className="font-bold">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="newWords"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="reviewedWords"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
