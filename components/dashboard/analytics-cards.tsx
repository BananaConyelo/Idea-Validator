"use client"

import { ArrowUpRight, ArrowDownRight, Lightbulb, ThumbsUp, MessageSquare, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Ideas",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Lightbulb,
    color: "bg-chart-1/20 text-chart-1",
  },
  {
    title: "Total Votes",
    value: "48.2K",
    change: "+8.2%",
    trend: "up",
    icon: ThumbsUp,
    color: "bg-chart-2/20 text-chart-2",
  },
  {
    title: "Comments",
    value: "12.4K",
    change: "-2.4%",
    trend: "down",
    icon: MessageSquare,
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    title: "Active Users",
    value: "5,621",
    change: "+18.7%",
    trend: "up",
    icon: Users,
    color: "bg-chart-4/20 text-chart-4",
  },
]

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={cn(
            "glass-card border-glass-border opacity-0 animate-fade-in overflow-hidden",
            `stagger-${index + 1}`
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="size-4 text-chart-1" />
                  ) : (
                    <ArrowDownRight className="size-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      stat.trend === "up" ? "text-chart-1" : "text-destructive"
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className={cn("rounded-xl p-3", stat.color)}>
                <stat.icon className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
