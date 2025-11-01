import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Flame, Calendar, Play } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Workouts Completed", value: "12", icon: Dumbbell, change: "+3 this week" },
    { label: "Calories Burned", value: "2,450", icon: Flame, change: "This week" },
    { label: "Current Streak", value: "5", icon: Calendar, change: "days" },
    { label: "Next Workout", value: "Today", icon: Play, change: "Upper Body" },
  ];

  const todayWorkout = {
    name: "Upper Body Strength",
    exercises: [
      { name: "Push-ups", sets: "3x12", rest: "60s" },
      { name: "Dumbbell Rows", sets: "3x10", rest: "90s" },
      { name: "Shoulder Press", sets: "3x10", rest: "60s" },
      { name: "Bicep Curls", sets: "3x12", rest: "45s" },
    ],
    duration: "45 min",
    difficulty: "Intermediate",
  };

  const todayMeals = [
    { meal: "Breakfast", name: "Oatmeal with Berries", calories: 350 },
    { meal: "Lunch", name: "Grilled Chicken Salad", calories: 520 },
    { meal: "Dinner", name: "Salmon with Vegetables", calories: 680 },
    { meal: "Snacks", name: "Protein Shake & Almonds", calories: 280 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-display uppercase mb-2">
          Welcome Back, John!
        </h1>
        <p className="text-muted-foreground">
          Let's crush your fitness goals today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Today's Workout</CardTitle>
              <Badge variant="secondary">{todayWorkout.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{todayWorkout.duration}</span>
            </div>
            <div className="space-y-3">
              {todayWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} • {exercise.rest} rest
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" size="lg" data-testid="button-start-workout">
              <Play className="h-4 w-4 mr-2" />
              Start Workout
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Today's Meals</CardTitle>
              <span className="text-sm text-muted-foreground">1,830 / 2,000 cal</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={91.5} className="h-2" />
            <div className="space-y-3">
              {todayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {meal.meal}
                    </p>
                    <p className="font-medium">{meal.name}</p>
                  </div>
                  <Badge variant="outline">{meal.calories} cal</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Today", activity: "Completed Lower Body Workout", time: "2 hours ago" },
              { date: "Yesterday", activity: "Logged Meals for the Day", time: "1 day ago" },
              { date: "2 days ago", activity: "Reached 7-day Streak", time: "2 days ago" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
