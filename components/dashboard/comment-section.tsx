"use client"

import { useState } from "react"
import { Send, ThumbsUp, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const comments = [
  {
    id: 1,
    author: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    content: "This is exactly what we need in the developer space! Have you considered adding support for multiple programming languages?",
    likes: 12,
    createdAt: "15m ago",
    replies: 2,
  },
  {
    id: 2,
    author: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    content: "Great concept! I would suggest adding team collaboration features from day one. It could be a key differentiator.",
    likes: 8,
    createdAt: "1h ago",
    replies: 1,
  },
  {
    id: 3,
    author: {
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    content: "Love the sustainability angle! The market is definitely ready for this kind of solution.",
    likes: 5,
    createdAt: "3h ago",
    replies: 0,
  },
]

interface CommentProps {
  comment: (typeof comments)[0]
  index: number
}

function Comment({ comment, index }: CommentProps) {
  const [likes, setLikes] = useState(comment.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? comment.likes : comment.likes + 1)
  }

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg transition-colors hover:bg-secondary/30 opacity-0 animate-fade-in",
        `stagger-${index + 1}`
      )}
    >
      <Avatar className="size-8 flex-shrink-0">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
        <div className="flex items-center gap-4 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "h-7 px-2 gap-1.5 text-xs",
              isLiked && "text-chart-1"
            )}
          >
            <ThumbsUp className={cn("size-3.5", isLiked && "fill-current")} />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            Reply
          </Button>
          {comment.replies > 0 && (
            <span className="text-xs text-muted-foreground">
              {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="size-7 flex-shrink-0">
        <MoreHorizontal className="size-4" />
      </Button>
    </div>
  )
}

export function CommentSection() {
  const [newComment, setNewComment] = useState("")

  return (
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="You" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none bg-secondary/50 border-border"
            />
            <Button size="icon" className="flex-shrink-0 self-end">
              <Send className="size-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-1">
          {comments.map((comment, index) => (
            <Comment key={comment.id} comment={comment} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
