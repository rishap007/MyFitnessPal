import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import squatImage from "@assets/generated_images/Squat_exercise_demonstration_d1852f58.png";
import pushupImage from "@assets/generated_images/Push-up_exercise_demonstration_9d2a7616.png";
import plankImage from "@assets/generated_images/Plank_exercise_demonstration_c9f5dc0c.png";

const exercises = [
  {
    name: "Squats",
    category: "Strength",
    difficulty: "Beginner",
    muscleGroups: ["Quads", "Glutes", "Core"],
    image: squatImage,
    description: "A fundamental lower body exercise that builds strength and muscle.",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep chest up and core engaged",
      "Lower down as if sitting in a chair",
      "Push through heels to return to start",
    ],
    commonMistakes: [
      "Knees caving inward",
      "Lifting heels off ground",
      "Rounding lower back",
    ],
  },
  {
    name: "Push-ups",
    category: "Strength",
    difficulty: "Beginner",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    image: pushupImage,
    description: "Classic upper body exercise that requires no equipment.",
    instructions: [
      "Start in plank position, hands shoulder-width",
      "Keep body in straight line",
      "Lower chest to ground with control",
      "Push back up to starting position",
    ],
    commonMistakes: [
      "Sagging hips",
      "Flaring elbows too wide",
      "Not going deep enough",
    ],
  },
  {
    name: "Plank",
    category: "Core",
    difficulty: "Beginner",
    muscleGroups: ["Core", "Shoulders", "Glutes"],
    image: plankImage,
    description: "Isometric core exercise that builds stability and strength.",
    instructions: [
      "Start in forearm position, elbows under shoulders",
      "Keep body in straight line from head to heels",
      "Engage core and squeeze glutes",
      "Hold position without letting hips sag",
    ],
    commonMistakes: [
      "Hips too high or too low",
      "Holding breath",
      "Head position too high or low",
    ],
  },
  {
    name: "Lunges",
    category: "Strength",
    difficulty: "Intermediate",
    muscleGroups: ["Quads", "Glutes", "Hamstrings"],
    image: squatImage,
    description: "Unilateral leg exercise that improves balance and strength.",
    instructions: [
      "Step forward with one leg",
      "Lower hips until both knees at 90 degrees",
      "Keep front knee over ankle",
      "Push back to starting position",
    ],
    commonMistakes: [
      "Front knee going past toes",
      "Leaning forward too much",
      "Not lowering deep enough",
    ],
  },
  {
    name: "Deadlifts",
    category: "Strength",
    difficulty: "Advanced",
    muscleGroups: ["Back", "Glutes", "Hamstrings"],
    image: squatImage,
    description: "Powerful compound movement for posterior chain development.",
    instructions: [
      "Stand with feet hip-width, bar over midfoot",
      "Bend at hips and knees to grip bar",
      "Keep back straight, chest up",
      "Drive through heels to stand up",
    ],
    commonMistakes: [
      "Rounding the back",
      "Starting with hips too low",
      "Not keeping bar close to body",
    ],
  },
  {
    name: "Burpees",
    category: "Cardio",
    difficulty: "Intermediate",
    muscleGroups: ["Full Body"],
    image: pushupImage,
    description: "High-intensity full-body exercise that burns calories fast.",
    instructions: [
      "Start standing, drop into squat",
      "Place hands down, jump feet back to plank",
      "Do a push-up",
      "Jump feet forward, explode up with jump",
    ],
    commonMistakes: [
      "Not doing full push-up",
      "Landing too hard on jump",
      "Not fully extending on jump",
    ],
  },
];

const categories = ["All", "Strength", "Cardio", "Core", "Flexibility"];

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-display uppercase mb-2">
          Exercise Library
        </h1>
        <p className="text-muted-foreground">
          Learn proper form and technique
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises..."
            className="pl-10"
            data-testid="input-search-exercises"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`button-category-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover-elevate" data-testid={`card-exercise-${index}`}>
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{exercise.name}</h3>
                    <Badge variant="secondary" className="shrink-0">
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {exercise.muscleGroups.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {exercise.description}
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{exercise.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-md bg-muted">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{exercise.category}</Badge>
                  <Badge variant="secondary">{exercise.difficulty}</Badge>
                  {exercise.muscleGroups.map((muscle) => (
                    <Badge key={muscle} variant="outline">
                      {muscle}
                    </Badge>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{exercise.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {exercise.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-destructive">Common Mistakes</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {exercise.commonMistakes.map((mistake, i) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
