import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsCards } from "@/components/dashboard/analytics-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20">
            <BarChart3 className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
              Analytics
            </h2>
            <p className="text-muted-foreground">
              Track your platform performance
            </p>
          </div>
        </div>

        <AnalyticsCards />

        <div className="mt-6">
          <DashboardCharts />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <Card className="glass-card border-border/50 opacity-0 animate-fade-in animation-delay-200">
            <CardHeader>
              <CardTitle className="text-foreground">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "AI Finance Coach", votes: 2847, growth: "+12%" },
                  { name: "Decentralized Marketplace", votes: 2156, growth: "+8%" },
                  { name: "Mental Health App", votes: 1923, growth: "+15%" },
                  { name: "Fashion Rental", votes: 1654, growth: "+5%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.votes.toLocaleString()} votes</p>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{item.growth}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 opacity-0 animate-fade-in animation-delay-300">
            <CardHeader>
              <CardTitle className="text-foreground">Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { metric: "Avg. Time on Platform", value: "12m 34s", change: "+2m" },
                  { metric: "Ideas per User", value: "2.4", change: "+0.3" },
                  { metric: "Comments per Idea", value: "8.7", change: "+1.2" },
                  { metric: "Return Visitors", value: "67%", change: "+5%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">{item.metric}</p>
                      <p className="text-sm text-muted-foreground">Current: {item.value}</p>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{item.change}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  )
}
