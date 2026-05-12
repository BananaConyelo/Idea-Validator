"use client"

import { useState } from "react"
import { Bell, Plus, Search, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateIdea = async () => {
    if (!title || !description) return
    setIsSubmitting(true)
    try {
      await apiClient.post("ideas/", { title, description })
      toast.success("Idea submitted successfully!")
      setIsDialogOpen(false)
      setTitle("")
      setDescription("")
      window.location.reload() // Quick way to refresh the feed
    } catch (error) {
      toast.error("Failed to submit idea")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-lg px-4 lg:px-6">
      <SidebarTrigger className="-ml-1" />
      
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ideas, users, tags..."
            className="pl-9 bg-secondary/50 border-border"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <Badge className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-xs bg-chart-1 text-primary-foreground border-0">
            3
          </Badge>
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Submit Idea</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] glass-card">
            <DialogHeader>
              <DialogTitle>Submit New Idea</DialogTitle>
              <DialogDescription>
                Share your startup idea with the community and get feedback.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. AI-Powered Coffee Roaster"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-secondary/50 min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateIdea} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Idea"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 ring-2 ring-border">
                <AvatarImage src={user ? `https://avatar.iran.liara.run/username?username=${user.username}` : ""} alt={user?.username} />
                <AvatarFallback>{user?.username?.charAt(0) || <User className="size-5" />}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.username || "Guest"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "Not logged in"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
