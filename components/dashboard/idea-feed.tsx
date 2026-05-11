"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const ideas = [
  {
    id: 1,
    title: "AI-Powered Code Review Platform",
    description: "An intelligent system that reviews pull requests using machine learning to catch bugs, suggest improvements, and ensure code quality standards.",
    author: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
      role: "Software Engineer",
    },
    votes: 342,
    comments: 28,
    tags: ["AI/ML", "Developer Tools", "SaaS"],
    trending: true,
    createdAt: "2h ago",
  },
  {
    id: 2,
    title: "Sustainable Packaging Marketplace",
    description: "Connect businesses with eco-friendly packaging suppliers. Features carbon footprint tracking and sustainability certifications.",
    author: {
      name: "Maya Patel",
      avatar: "https://i.pravatar.cc/150?img=23",
      role: "Product Manager",
    },
    votes: 256,
    comments: 15,
    tags: ["Sustainability", "B2B", "Marketplace"],
    trending: false,
    createdAt: "5h ago",
  },
  {
    id: 3,
    title: "Mental Health Check-in App for Teams",
    description: "Anonymous wellness tracking for remote teams with AI insights for managers to improve team well-being.",
    author: {
      name: "Jordan Kim",
      avatar: "https://i.pravatar.cc/150?img=33",
      role: "UX Designer",
    },
    votes: 189,
    comments: 42,
    tags: ["Health", "HR Tech", "Remote Work"],
    trending: true,
    createdAt: "1d ago",
  },
]

interface IdeaCardProps {
  idea: (typeof ideas)[0]
  index: number
}

function IdeaCard({ idea, index }: IdeaCardProps) {
  const [votes, setVotes] = useState(idea.votes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null)
      setVotes(idea.votes)
    } else {
      setUserVote(type)
      setVotes(idea.votes + (type === "up" ? 1 : -1))
    }
  }

  return (
    <Card
      className={cn(
        "glass-card border-glass-border opacity-0 animate-fade-in transition-all duration-300 hover:border-primary/30",
        `stagger-${index + 1}`
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 ring-2 ring-border">
              <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
              <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{idea.author.name}</p>
              <p className="text-xs text-muted-foreground">{idea.author.role} · {idea.createdAt}</p>
            </div>
          </div>
          {idea.trending && (
            <Badge variant="secondary" className="bg-chart-1/20 text-chart-1 border-0 gap-1">
              <TrendingUp className="size-3" />
              Trending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{idea.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-secondary/50">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              className={cn(
                "gap-1.5 transition-all",
                userVote === "up" && "text-chart-1 bg-chart-1/10"
              )}
            >
              <ThumbsUp className={cn("size-4", userVote === "up" && "fill-current")} />
              <span className="font-medium">{votes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              className={cn(
                userVote === "down" && "text-destructive bg-destructive/10"
              )}
            >
              <ThumbsDown className={cn("size-4", userVote === "down" && "fill-current")} />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageSquare className="size-4" />
              <span className="text-sm">{idea.comments}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(isBookmarked && "text-chart-3")}
            >
              <Bookmark className={cn("size-4", isBookmarked && "fill-current")} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IdeaFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Latest Ideas</h2>
        <Button variant="outline" size="sm" className="bg-secondary/50">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {ideas.map((idea, index) => (
          <IdeaCard key={idea.id} idea={idea} index={index} />
        ))}
      </div>
    </div>
  )
}
