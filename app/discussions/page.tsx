"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageSquare, Plus, Search, Pin, Clock, ArrowUp, MessageCircle } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Best practices for validating B2B SaaS ideas?",
    preview: "I'm working on a B2B SaaS concept and wondering what metrics others use to validate market fit before building...",
    author: { name: "David Park", avatar: "https://i.pravatar.cc/150?img=15", initials: "DP" },
    replies: 34,
    votes: 156,
    time: "2h ago",
    tags: ["B2B", "Validation"],
    pinned: true,
  },
  {
    id: 2,
    title: "How to find co-founders for technical startups",
    preview: "Looking for advice on where to find technical co-founders. I have a strong business background but need a CTO...",
    author: { name: "Maria Garcia", avatar: "https://i.pravatar.cc/150?img=16", initials: "MG" },
    replies: 28,
    votes: 89,
    time: "4h ago",
    tags: ["Co-founders", "Networking"],
    pinned: false,
  },
  {
    id: 3,
    title: "AI integration strategies for existing products",
    preview: "What are some effective ways to integrate AI features into an existing product without disrupting the core UX?",
    author: { name: "James Wilson", avatar: "https://i.pravatar.cc/150?img=17", initials: "JW" },
    replies: 45,
    votes: 234,
    time: "6h ago",
    tags: ["AI", "Product"],
    pinned: false,
  },
  {
    id: 4,
    title: "Funding landscape for climate tech startups in 2024",
    preview: "Anyone have insights on the current funding environment for climate tech? Which VCs are most active in this space?",
    author: { name: "Rachel Green", avatar: "https://i.pravatar.cc/150?img=18", initials: "RG" },
    replies: 21,
    votes: 67,
    time: "8h ago",
    tags: ["Funding", "Climate"],
    pinned: false,
  },
  {
    id: 5,
    title: "Building in public: pros and cons",
    preview: "Thinking about building my next project in public. Would love to hear experiences from those who have tried it...",
    author: { name: "Kevin Chen", avatar: "https://i.pravatar.cc/150?img=19", initials: "KC" },
    replies: 52,
    votes: 178,
    time: "12h ago",
    tags: ["Building in Public", "Community"],
    pinned: false,
  },
]

export default function DiscussionsPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/20">
              <MessageSquare className="size-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
                Discussions
              </h2>
              <p className="text-muted-foreground">
                Join conversations with the community
              </p>
            </div>
          </div>
          <Button className="gap-2 opacity-0 animate-fade-in animation-delay-100">
            <Plus className="size-4" />
            Start Discussion
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-10 glass-card border-border/50"
          />
        </div>

        <div className="space-y-4">
          {discussions.map((discussion, index) => (
            <Card
              key={discussion.id}
              className="glass-card border-border/50 opacity-0 animate-slide-in-up hover:border-primary/50 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex gap-4">
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src={discussion.author.avatar} />
                    <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      {discussion.pinned && (
                        <Pin className="size-4 text-primary shrink-0 mt-1" />
                      )}
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {discussion.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {discussion.preview}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{discussion.author.name}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {discussion.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ArrowUp className="size-4" />
                          {discussion.votes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="size-4" />
                          {discussion.replies} replies
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
