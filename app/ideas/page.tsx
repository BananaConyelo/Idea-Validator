"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { IdeaFeed } from "@/components/dashboard/idea-feed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"

export default function IdeasPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
              All Ideas
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse and submit startup ideas for validation
            </p>
          </div>
          <Button className="gap-2 opacity-0 animate-fade-in animation-delay-100">
            <Plus className="size-4" />
            Submit Idea
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search ideas..."
              className="pl-10 glass-card border-border/50"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            Filters
          </Button>
        </div>

        <IdeaFeed />
      </section>
    </DashboardLayout>
  )
}
