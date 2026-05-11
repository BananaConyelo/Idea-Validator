"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, Flame, TrendingUp, Eye, MessageSquare, Bookmark } from "lucide-react"

const trendingIdeas = [
  {
    id: 1,
    rank: 1,
    title: "AI-Powered Personal Finance Coach",
    description: "An AI assistant that analyzes your spending habits and provides personalized financial advice in real-time.",
    author: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", initials: "SC" },
    votes: 2847,
    views: 12500,
    comments: 89,
    trend: "+342%",
    tags: ["AI", "FinTech"],
  },
  {
    id: 2,
    rank: 2,
    title: "Decentralized Freelancer Marketplace",
    description: "A blockchain-based platform connecting freelancers with clients, ensuring transparent payments and verified reviews.",
    author: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?img=2", initials: "AR" },
    votes: 2156,
    views: 9800,
    comments: 67,
    trend: "+189%",
    tags: ["Web3", "Marketplace"],
  },
  {
    id: 3,
    rank: 3,
    title: "Mental Health Check-in App",
    description: "Daily mental wellness tracking with AI-driven insights and connections to licensed therapists when needed.",
    author: { name: "Jordan Kim", avatar: "https://i.pravatar.cc/150?img=3", initials: "JK" },
    votes: 1923,
    views: 8400,
    comments: 124,
    trend: "+156%",
    tags: ["Health", "AI"],
  },
  {
    id: 4,
    rank: 4,
    title: "Sustainable Fashion Rental Platform",
    description: "Peer-to-peer fashion rental for sustainable clothing consumption with quality verification and cleaning services.",
    author: { name: "Emma Watson", avatar: "https://i.pravatar.cc/150?img=4", initials: "EW" },
    votes: 1654,
    views: 7200,
    comments: 45,
    trend: "+98%",
    tags: ["Sustainability", "Fashion"],
  },
  {
    id: 5,
    rank: 5,
    title: "Remote Team Culture Builder",
    description: "A platform for remote teams to build culture through virtual activities, recognition systems, and team bonding exercises.",
    author: { name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5", initials: "MB" },
    votes: 1432,
    views: 6100,
    comments: 38,
    trend: "+87%",
    tags: ["Remote Work", "HR Tech"],
  },
]

export default function TrendingPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/20">
            <Flame className="size-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
              Trending Ideas
            </h2>
            <p className="text-muted-foreground">
              Top performing ideas this week
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {trendingIdeas.map((idea, index) => (
            <Card
              key={idea.id}
              className="glass-card border-border/50 opacity-0 animate-slide-in-up hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-primary">#{idea.rank}</span>
                    <div className="flex items-center gap-1 text-emerald-400 text-sm">
                      <TrendingUp className="size-3" />
                      {idea.trend}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{idea.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {idea.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <Bookmark className="size-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={idea.author.avatar} />
                          <AvatarFallback>{idea.author.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{idea.author.name}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ArrowUp className="size-4 text-primary" />
                          {idea.votes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="size-4" />
                          {idea.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="size-4" />
                          {idea.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}
