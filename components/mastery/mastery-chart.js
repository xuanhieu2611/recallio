"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const data = [
  { date: "Jan", mastered: 20, learning: 15, notStarted: 65 },
  { date: "Feb", mastered: 35, learning: 20, notStarted: 45 },
  { date: "Mar", mastered: 50, learning: 25, notStarted: 25 },
  { date: "Apr", mastered: 75, learning: 15, notStarted: 10 },
  { date: "May", mastered: 100, learning: 20, notStarted: 0 },
  { date: "Jun", mastered: 127, learning: 42, notStarted: 231 },
]

export function MasteryChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
                          Mastered
                        </span>
                        <span className="font-bold">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Learning
                        </span>
                        <span className="font-bold">{payload[1].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Not Started
                        </span>
                        <span className="font-bold">{payload[2].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="mastered"
            stackId="1"
            stroke="hsl(var(--success))"
            fill="hsl(var(--success))"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="learning"
            stackId="1"
            stroke="hsl(var(--warning))"
            fill="hsl(var(--warning))"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="notStarted"
            stackId="1"
            stroke="hsl(var(--muted))"
            fill="hsl(var(--muted))"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
