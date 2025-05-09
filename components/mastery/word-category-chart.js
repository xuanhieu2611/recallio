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
  { category: "Nouns", count: 150 },
  { category: "Verbs", count: 120 },
  { category: "Adjectives", count: 80 },
  { category: "Adverbs", count: 30 },
  { category: "Prepositions", count: 15 },
  { category: "Conjunctions", count: 5 },
]

export function WordCategoryChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis type="number" />
          <YAxis type="category" dataKey="category" width={100} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Category
                        </span>
                        <span className="text-muted-foreground font-bold">
                          {payload[0].payload.category}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[0.70rem] uppercase">
                          Count
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
            dataKey="count"
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
