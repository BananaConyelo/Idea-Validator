import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsCards } from "@/components/dashboard/analytics-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { IdeaFeed } from "@/components/dashboard/idea-feed"
import { CommentSection } from "@/components/dashboard/comment-section"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Analytics Overview */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 opacity-0 animate-fade-in">
          Dashboard Overview
        </h2>
        <AnalyticsCards />
      </section>

      {/* Charts Section */}
      <section>
        <DashboardCharts />
      </section>

      {/* Ideas Feed and Comments */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IdeaFeed />
        </div>
        <div className="lg:col-span-1">
          <CommentSection />
        </div>
      </div>
    </DashboardLayout>
  )
}
