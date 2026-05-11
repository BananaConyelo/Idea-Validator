"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Crown, Trophy, Star, MessageSquare, Lightbulb } from "lucide-react"

const leaderboard = [
  { rank: 1, name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", initials: "SC", points: 12450, ideas: 28, badge: "Innovator" },
  { rank: 2, name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?img=2", initials: "AR", points: 10890, ideas: 24, badge: "Pioneer" },
  { rank: 3, name: "Jordan Kim", avatar: "https://i.pravatar.cc/150?img=3", initials: "JK", points: 9780, ideas: 21, badge: "Visionary" },
  { rank: 4, name: "Emma Watson", avatar: "https://i.pravatar.cc/150?img=4", initials: "EW", points: 8540, ideas: 18, badge: "Creator" },
  { rank: 5, name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5", initials: "MB", points: 7230, ideas: 15, badge: "Builder" },
]

const activeMembers = [
  { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=10", initials: "LP", status: "online", activity: "Reviewing ideas" },
  { name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=11", initials: "TW", status: "online", activity: "Commenting" },
  { name: "Nina Patel", avatar: "https://i.pravatar.cc/150?img=12", initials: "NP", status: "online", activity: "Submitting idea" },
  { name: "Chris Lee", avatar: "https://i.pravatar.cc/150?img=13", initials: "CL", status: "away", activity: "Last seen 5m ago" },
]

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/20">
            <Users className="size-5 text-violet-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
              Community
            </h2>
            <p className="text-muted-foreground">
              Connect with fellow innovators
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats */}
          <div className="lg:col-span-3 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Members", value: "12,847", icon: Users, color: "text-primary" },
              { label: "Active Today", value: "1,234", icon: Star, color: "text-yellow-500" },
              { label: "Ideas Shared", value: "5,678", icon: Lightbulb, color: "text-emerald-400" },
            ].map((stat, i) => (
              <Card key={i} className="glass-card border-border/50 opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`flex size-12 items-center justify-center rounded-xl bg-muted/50 ${stat.color}`}>
                    <stat.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leaderboard */}
          <Card className="lg:col-span-2 glass-card border-border/50 opacity-0 animate-slide-in-up animation-delay-200">
            <CardHeader className="flex flex-row items-center gap-2">
              <Trophy className="size-5 text-yellow-500" />
              <CardTitle className="text-foreground">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <span className={`text-lg font-bold w-6 ${user.rank <= 3 ? "text-yellow-500" : "text-muted-foreground"}`}>
                      {user.rank === 1 && <Crown className="size-5 text-yellow-500" />}
                      {user.rank > 1 && `#${user.rank}`}
                    </span>
                    <Avatar className="size-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.ideas} ideas submitted</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {user.badge}
                    </Badge>
                    <span className="text-sm font-semibold text-foreground">
                      {user.points.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Now */}
          <Card className="glass-card border-border/50 opacity-0 animate-slide-in-up animation-delay-300">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="size-9">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background ${member.status === "online" ? "bg-emerald-400" : "bg-yellow-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.activity}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <MessageSquare className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Members
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  )
}
