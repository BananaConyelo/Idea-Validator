"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ideasOverTimeData = [
  { month: "Jan", ideas: 186, votes: 1200 },
  { month: "Feb", ideas: 205, votes: 1400 },
  { month: "Mar", ideas: 237, votes: 1600 },
  { month: "Apr", ideas: 273, votes: 1900 },
  { month: "May", ideas: 209, votes: 2100 },
  { month: "Jun", ideas: 314, votes: 2400 },
]

const categoryData = [
  { category: "AI/ML", count: 425 },
  { category: "SaaS", count: 380 },
  { category: "FinTech", count: 295 },
  { category: "Health", count: 245 },
  { category: "EdTech", count: 190 },
  { category: "Other", count: 165 },
]

const ideasChartConfig = {
  ideas: {
    label: "Ideas",
    color: "var(--chart-1)",
  },
  votes: {
    label: "Votes",
    color: "var(--chart-2)",
  },
}

const categoryChartConfig = {
  count: {
    label: "Ideas",
    color: "var(--chart-1)",
  },
}

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="glass-card border-glass-border opacity-0 animate-fade-in stagger-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Ideas Over Time</CardTitle>
          <CardDescription className="text-muted-foreground">
            Monthly ideas submitted and votes received
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ideasChartConfig} className="h-[250px] w-full">
            <AreaChart data={ideasOverTimeData} margin={{ left: 0, right: 0 }}>
              <defs>
                <linearGradient id="ideasGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="votesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="ideas"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#ideasGradient)"
              />
              <Area
                type="monotone"
                dataKey="votes"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#votesGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-card border-glass-border opacity-0 animate-fade-in stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Ideas by Category</CardTitle>
          <CardDescription className="text-muted-foreground">
            Distribution of ideas across different sectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={categoryChartConfig} className="h-[250px] w-full">
            <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                width={60}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--chart-1)"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
