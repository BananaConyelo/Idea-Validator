"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Trophy, Clock, Users, Gift, ArrowRight, Star } from "lucide-react"

const activeChallenges = [
  {
    id: 1,
    title: "AI Innovation Sprint",
    description: "Submit your best AI-powered startup idea. The most innovative concept wins $5,000 in credits.",
    prize: "$5,000",
    participants: 234,
    daysLeft: 5,
    progress: 65,
    category: "AI",
    featured: true,
  },
  {
    id: 2,
    title: "Sustainability Challenge",
    description: "Create ideas that tackle climate change and promote environmental sustainability.",
    prize: "$3,000",
    participants: 156,
    daysLeft: 12,
    progress: 40,
    category: "Climate",
    featured: false,
  },
  {
    id: 3,
    title: "FinTech Disruption",
    description: "Reimagine financial services for the next generation. Focus on accessibility and innovation.",
    prize: "$4,000",
    participants: 189,
    daysLeft: 8,
    progress: 55,
    category: "FinTech",
    featured: false,
  },
]

const pastWinners = [
  { title: "HealthAI Assistant", winner: "Sarah Chen", prize: "$5,000", category: "Health" },
  { title: "EcoTrack Carbon", winner: "Alex Rivera", prize: "$3,000", category: "Climate" },
  { title: "PayFlow Global", winner: "Jordan Kim", prize: "$4,000", category: "FinTech" },
]

export default function ChallengesPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Zap className="size-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">
              Challenges
            </h2>
            <p className="text-muted-foreground">
              Compete and win prizes for your ideas
            </p>
          </div>
        </div>

        {/* Featured Challenge */}
        <Card className="glass-card border-primary/30 mb-6 opacity-0 animate-fade-in overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          <CardContent className="p-6 relative">
            <div className="flex items-center gap-2 mb-4">
              <Star className="size-5 text-yellow-500 fill-yellow-500" />
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Featured Challenge
              </Badge>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {activeChallenges[0].title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeChallenges[0].description}
                </p>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Gift className="size-5 text-primary" />
                    <span className="font-semibold text-foreground">{activeChallenges[0].prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{activeChallenges[0].participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-orange-500" />
                    <span className="text-orange-500">{activeChallenges[0].daysLeft} days left</span>
                  </div>
                </div>

                <Button className="gap-2">
                  Join Challenge
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Challenge Progress</span>
                  <span className="font-medium text-foreground">{activeChallenges[0].progress}%</span>
                </div>
                <Progress value={activeChallenges[0].progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {activeChallenges[0].participants} ideas submitted so far
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Challenges */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Challenges</h3>
        <div className="grid gap-4 lg:grid-cols-2 mb-8">
          {activeChallenges.slice(1).map((challenge, index) => (
            <Card
              key={challenge.id}
              className="glass-card border-border/50 opacity-0 animate-slide-in-up hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {challenge.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-orange-500 text-sm ml-auto">
                    <Clock className="size-3" />
                    {challenge.daysLeft} days
                  </div>
                </div>

                <h4 className="font-semibold text-foreground mb-2">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Gift className="size-4" />
                      {challenge.prize}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="size-4" />
                      {challenge.participants}
                    </span>
                  </div>
                </div>

                <Progress value={challenge.progress} className="h-2 mb-4" />

                <Button variant="outline" className="w-full">
                  View Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Past Winners */}
        <Card className="glass-card border-border/50 opacity-0 animate-fade-in animation-delay-300">
          <CardHeader className="flex flex-row items-center gap-2">
            <Trophy className="size-5 text-yellow-500" />
            <CardTitle className="text-foreground">Recent Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {pastWinners.map((winner, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/30 text-center">
                  <Trophy className="size-8 text-yellow-500 mx-auto mb-2" />
                  <p className="font-semibold text-foreground">{winner.title}</p>
                  <p className="text-sm text-muted-foreground">{winner.winner}</p>
                  <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                    {winner.prize}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  )
}
