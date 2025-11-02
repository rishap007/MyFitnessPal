import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import WorkoutPlan from "@/pages/workout";
import MealPlan from "@/pages/meals";
import Chat from "@/pages/chat";
import ExerciseLibrary from "@/pages/exercises";
import Progress from "@/pages/progress";
import Plan from "@/pages/plan";

function AppLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/plan" component={Plan} />
            <Route path="/dashboard">
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </Route>
            <Route path="/workout">
              <AppLayout>
                <WorkoutPlan />
              </AppLayout>
            </Route>
            <Route path="/meals">
              <AppLayout>
                <MealPlan />
              </AppLayout>
            </Route>
            <Route path="/chat">
              <AppLayout>
                <Chat />
              </AppLayout>
            </Route>
            <Route path="/exercises">
              <AppLayout>
                <ExerciseLibrary />
              </AppLayout>
            </Route>
            <Route path="/progress">
              <AppLayout>
                <Progress />
              </AppLayout>
            </Route>
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
