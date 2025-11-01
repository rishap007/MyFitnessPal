import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Dumbbell } from "lucide-react";
import { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const workoutPlan = [
  {
    day: "Monday",
    name: "Upper Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: [
      { name: "Push-ups", sets: "3x12", rest: "60s", instructions: "Keep core tight" },
      { name: "Dumbbell Rows", sets: "3x10", rest: "90s", instructions: "Pull to hip" },
      { name: "Shoulder Press", sets: "3x10", rest: "60s", instructions: "Full range" },
      { name: "Bicep Curls", sets: "3x12", rest: "45s", instructions: "Control movement" },
    ],
  },
  {
    day: "Tuesday",
    name: "Lower Body Power",
    duration: "50 min",
    difficulty: "Advanced",
    exercises: [
      { name: "Squats", sets: "4x8", rest: "90s", instructions: "Depth matters" },
      { name: "Romanian Deadlifts", sets: "3x10", rest: "90s", instructions: "Hinge at hips" },
      { name: "Lunges", sets: "3x12", rest: "60s", instructions: "Each leg" },
      { name: "Calf Raises", sets: "3x15", rest: "45s", instructions: "Full extension" },
    ],
  },
  {
    day: "Wednesday",
    name: "Active Recovery",
    duration: "30 min",
    difficulty: "Beginner",
    exercises: [
      { name: "Yoga Flow", sets: "20 min", rest: "-", instructions: "Gentle stretching" },
      { name: "Walking", sets: "10 min", rest: "-", instructions: "Light pace" },
    ],
  },
  {
    day: "Thursday",
    name: "Push Day",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: [
      { name: "Bench Press", sets: "4x8", rest: "90s", instructions: "Control descent" },
      { name: "Incline Dumbbell Press", sets: "3x10", rest: "60s", instructions: "30° angle" },
      { name: "Tricep Dips", sets: "3x12", rest: "60s", instructions: "Full range" },
      { name: "Overhead Tricep Extension", sets: "3x12", rest: "45s", instructions: "Elbows in" },
    ],
  },
  {
    day: "Friday",
    name: "Pull Day",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: [
      { name: "Pull-ups", sets: "3x8", rest: "90s", instructions: "Full extension" },
      { name: "Barbell Rows", sets: "3x10", rest: "90s", instructions: "Pull to chest" },
      { name: "Face Pulls", sets: "3x15", rest: "45s", instructions: "High elbows" },
      { name: "Hammer Curls", sets: "3x12", rest: "45s", instructions: "Neutral grip" },
    ],
  },
  {
    day: "Saturday",
    name: "Core & Cardio",
    duration: "40 min",
    difficulty: "Intermediate",
    exercises: [
      { name: "Plank", sets: "3x60s", rest: "60s", instructions: "Straight line" },
      { name: "Russian Twists", sets: "3x20", rest: "45s", instructions: "Each side" },
      { name: "Bicycle Crunches", sets: "3x20", rest: "45s", instructions: "Slow control" },
      { name: "HIIT Cardio", sets: "15 min", rest: "-", instructions: "Intervals" },
    ],
  },
  {
    day: "Sunday",
    name: "Rest Day",
    duration: "0 min",
    difficulty: "Rest",
    exercises: [],
  },
];

export default function WorkoutPlan() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentWorkout = workoutPlan[selectedDay];

  const toggleExercise = (index: number) => {
    setCompletedExercises((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-display uppercase mb-2">
          7-Day Workout Plan
        </h1>
        <p className="text-muted-foreground">
          Your personalized training schedule
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day, index) => (
          <Button
            key={day}
            variant={selectedDay === index ? "default" : "outline"}
            className="min-w-20"
            onClick={() => setSelectedDay(index)}
            data-testid={`button-day-${day.toLowerCase()}`}
          >
            {day}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-2xl mb-2">
                {currentWorkout.name}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {currentWorkout.day}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {currentWorkout.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  {currentWorkout.difficulty}
                </div>
              </div>
            </div>
            <Badge
              variant={currentWorkout.difficulty === "Rest" ? "secondary" : "default"}
            >
              {currentWorkout.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentWorkout.exercises.length > 0 ? (
            <>
              <div className="space-y-3">
                {currentWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-md bg-card border hover-elevate"
                  >
                    <Checkbox
                      checked={completedExercises.includes(index)}
                      onCheckedChange={() => toggleExercise(index)}
                      data-testid={`checkbox-exercise-${index}`}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{exercise.sets}</span>
                        <span>Rest: {exercise.rest}</span>
                        <span className="italic">{exercise.instructions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full" size="lg" data-testid="button-start-workout-plan">
                Start {currentWorkout.name}
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl font-display uppercase mb-2">
                Rest & Recover
              </p>
              <p className="text-muted-foreground">
                Take it easy today. Your muscles need time to rebuild.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
