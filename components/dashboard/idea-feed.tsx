"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, TrendingUp, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

interface Idea {
  id: number
  title: string
  description: string
  author: {
    username: string
    avatar?: string
  }
  created_at: string
  vote_count: number
  user_vote: "up" | "down" | null
  comments_count: number
  tags: { name: string }[]
}

function IdeaCard({ idea: initialIdea, index }: { idea: Idea; index: number }) {
  const [idea, setIdea] = useState(initialIdea)
  const [isVoting, setIsVoting] = useState(false)
  const { user } = useAuth()

  const handleVote = async (type: "up" | "down") => {
    if (!user) {
      toast.error("Please login to vote")
      return
    }

    setIsVoting(true)
    try {
      const isRemoving = idea.user_vote === type
      if (isRemoving) {
        await apiClient.post(`ideas/${idea.id}/unvote/`)
        setIdea({
          ...idea,
          user_vote: null,
          vote_count: idea.vote_count + (type === "up" ? -1 : 1),
        })
      } else {
        await apiClient.post(`ideas/${idea.id}/vote/`, { vote_type: type })
        const voteDiff = idea.user_vote === null ? (type === "up" ? 1 : -1) : (type === "up" ? 2 : -2)
        setIdea({
          ...idea,
          user_vote: type,
          vote_count: idea.vote_count + voteDiff,
        })
      }
    } catch (error) {
      toast.error("Failed to vote")
    } finally {
      setIsVoting(false)
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
              <AvatarImage src={`https://avatar.iran.liara.run/username?username=${idea.author.username}`} alt={idea.author.username} />
              <AvatarFallback>{idea.author.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{idea.author.username}</p>
              <p className="text-xs text-muted-foreground">{new Date(idea.created_at).toLocaleDateString()} · {new Date(idea.created_at).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{idea.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <Badge key={tag.name} variant="outline" className="text-xs bg-secondary/50">
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              disabled={isVoting}
              className={cn(
                "gap-1.5 transition-all",
                idea.user_vote === "up" && "text-chart-1 bg-chart-1/10"
              )}
            >
              <ThumbsUp className={cn("size-4", idea.user_vote === "up" && "fill-current")} />
              <span className="font-medium">{idea.vote_count}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              disabled={isVoting}
              className={cn(
                idea.user_vote === "down" && "text-destructive bg-destructive/10"
              )}
            >
              <ThumbsDown className={cn("size-4", idea.user_vote === "down" && "fill-current")} />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageSquare className="size-4" />
              <span className="text-sm">{idea.comments_count}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              <Bookmark className={cn("size-4")} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IdeaFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await apiClient.get("ideas/")
        setIdeas(response.data)
      } catch (error) {
        toast.error("Failed to load ideas")
      } finally {
        setLoading(false)
      }
    }
    fetchIdeas()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Latest Ideas</h2>
        <Button variant="outline" size="sm" className="bg-secondary/50">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {ideas.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No ideas yet. Be the first to share one!</p>
        ) : (
          ideas.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))
        )}
      </div>
    </div>
  )
}
