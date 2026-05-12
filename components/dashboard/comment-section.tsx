"use client"

import { useState, useEffect } from "react"
import { Send, ThumbsUp, MoreHorizontal, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

interface CommentData {
  id: number
  author: {
    username: string
    avatar?: string
  }
  content: string
  created_at: string
}

function CommentItem({ comment, index }: { comment: CommentData; index: number }) {
  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg transition-colors hover:bg-secondary/30 opacity-0 animate-fade-in",
        `stagger-${index + 1}`
      )}
    >
      <Avatar className="size-8 flex-shrink-0">
        <AvatarImage src={`https://avatar.iran.liara.run/username?username=${comment.author.username}`} alt={comment.author.username} />
        <AvatarFallback>{comment.author.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{comment.author.username}</span>
          <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
      </div>
    </div>
  )
}

export function CommentSection() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get("comments/")
        setComments(response.data)
      } catch (error) {
        toast.error("Failed to load comments")
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [])

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to comment")
      return
    }
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // For now, we'll need an idea to comment on. In a real app, you'd be on an idea page.
      // Here, we'll try to get the first idea if it exists.
      const ideasRes = await apiClient.get("ideas/")
      if (ideasRes.data.length === 0) {
        toast.error("No ideas available to comment on")
        return
      }
      
      const response = await apiClient.post("comments/", {
        content: newComment,
        idea: ideasRes.data[0].id
      })
      
      setComments([response.data, ...comments])
      setNewComment("")
      toast.success("Comment added!")
    } catch (error) {
      toast.error("Failed to add comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src={user ? `https://avatar.iran.liara.run/username?username=${user.username}` : ""} alt="You" />
            <AvatarFallback>{user ? user.username.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder={user ? "Add a comment..." : "Login to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!user || isSubmitting}
              className="min-h-[80px] resize-none bg-secondary/50 border-border"
            />
            <Button 
              size="icon" 
              className="flex-shrink-0 self-end" 
              onClick={handleSubmit}
              disabled={!user || isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-1">
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4 text-sm">No comments yet</p>
          ) : (
            comments.slice(0, 5).map((comment, index) => (
              <CommentItem key={comment.id} comment={comment} index={index} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
