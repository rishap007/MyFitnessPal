import {
  Home,
  Dumbbell,
  Utensils,
  MessageCircle,
  Library,
  TrendingUp,
  Mic,
  MicOff,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Workout Plan", url: "/workout", icon: Dumbbell },
  { title: "Meal Plan", url: "/meals", icon: Utensils },
  { title: "AI Coach Chat", url: "/chat", icon: MessageCircle },
  { title: "Exercise Library", url: "/exercises", icon: Library },
  { title: "Progress", url: "/progress", icon: TrendingUp },
];

export function AppSidebar() {
  const [location] = useLocation();
  const [voiceActive, setVoiceActive] = useState(false);

  return (
    <Sidebar data-testid="sidebar-navigation">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" data-testid="text-username">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Intermediate Level
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <Button
            variant={voiceActive ? "default" : "outline"}
            className="w-full"
            onClick={() => {
              setVoiceActive(!voiceActive);
            }}
            data-testid="button-voice-toggle"
          >
            {voiceActive ? (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Voice Active
              </>
            ) : (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Enable Voice
              </>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
