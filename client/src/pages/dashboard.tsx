import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Flame, Calendar, Play, Volume2, VolumeX, Pause } from "lucide-react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

export default function Dashboard() {
  const { speak, stop, pause, resume, isSpeaking, isPaused, isSupported } = useTextToSpeech({
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  });

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

  const handleSpeakWorkout = () => {
    const workoutText = `Today's workout is ${todayWorkout.name}. Duration: ${todayWorkout.duration}. Difficulty: ${todayWorkout.difficulty}. ` +
      todayWorkout.exercises.map((ex, idx) =>
        `Exercise ${idx + 1}: ${ex.name}. ${ex.sets}. ${ex.rest} rest.`
      ).join(' ');
    speak(workoutText);
  };

  const handleSpeakMeals = () => {
    const mealsText = "Today's meal plan. " + todayMeals.map(meal =>
      `${meal.meal}: ${meal.name}, ${meal.calories} calories.`
    ).join(' ');
    speak(mealsText);
  };

  const handleVoiceControl = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      stop();
    }
  };

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
              <div className="flex items-center gap-2">
                <CardTitle>Today's Workout</CardTitle>
                {isSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={isSpeaking ? handleVoiceControl : handleSpeakWorkout}
                    title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen to workout"}
                  >
                    {isSpeaking ? (isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />) : <Volume2 className="h-4 w-4" />}
                  </Button>
                )}
              </div>
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
              <div className="flex items-center gap-2">
                <CardTitle>Today's Meals</CardTitle>
                {isSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={isSpeaking ? handleVoiceControl : handleSpeakMeals}
                    title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen to meal plan"}
                  >
                    {isSpeaking ? (isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />) : <Volume2 className="h-4 w-4" />}
                  </Button>
                )}
              </div>
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

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Daily Motivation</CardTitle>
            {isSupported && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => speak("Your only limit is you. Push harder today and make every rep count!")}
                title="Listen to motivational quote"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg font-medium italic">
            "Your only limit is you. Push harder today and make every rep count!"
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
}
