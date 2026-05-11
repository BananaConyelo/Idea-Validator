"use client"

import {
  BarChart3,
  Home,
  Lightbulb,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mainNav = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Lightbulb, label: "Ideas", href: "/ideas" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
]

const communityNav = [
  { icon: Users, label: "Community", href: "/community" },
  { icon: MessageSquare, label: "Discussions", href: "/discussions" },
  { icon: Zap, label: "Challenges", href: "/challenges" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary animate-pulse-glow">
            <Lightbulb className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">IdeaValidator</h1>
            <p className="text-xs text-muted-foreground">Startup Ideas</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="transition-all duration-200 hover:translate-x-1"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityNav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="transition-all duration-200 hover:translate-x-1"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent">
          <Avatar className="size-9">
            <AvatarImage src="https://i.pravatar.cc/150?img=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Jane Doe</p>
            <p className="text-xs text-muted-foreground truncate">jane@example.com</p>
          </div>
          <Settings className="size-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
