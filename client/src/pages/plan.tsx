import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  RefreshCw,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Sparkles,
  Dumbbell,
  Utensils,
  Trophy,
  Loader2,
} from "lucide-react";
import jsPDF from "jspdf";

interface Exercise {
  name: string;
  sets: string;
  reps?: string;
  duration?: string;
  rest: string;
  instructions?: string;
}

interface DailyWorkout {
  day: string;
  name: string;
  duration: string;
  difficulty: string;
  exercises: Exercise[];
}

interface Meal {
  meal: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  ingredients?: string[];
  recipe?: string;
}

interface DailyMeals {
  day: string;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Meal[];
}

interface FitnessPlan {
  userId: string;
  profile: any;
  workout: DailyWorkout[];
  meals: DailyMeals[];
  tips: string[];
  workoutPlanId: string;
  mealPlanId: string;
}

export default function Plan() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [loadingImage, setLoadingImage] = useState<string | null>(null);
  const [exerciseImages, setExerciseImages] = useState<Record<string, string>>({});
  const [mealImages, setMealImages] = useState<Record<string, string>>({});
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    // Load plan from localStorage
    const storedPlan = localStorage.getItem("fitnessPlan");
    if (!storedPlan) {
      toast({
        title: "No Plan Found",
        description: "Please complete the onboarding first.",
        variant: "destructive",
      });
      navigate("/onboarding");
      return;
    }

    setPlan(JSON.parse(storedPlan));

    // Fetch motivational quote
    fetchMotivationalQuote();
  }, [navigate, toast]);

  const fetchMotivationalQuote = async () => {
    try {
      const response = await fetch("/api/motivational-quote");
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      setQuote("Believe in yourself and push your limits!");
    }
  };

  const generateExerciseImage = async (exerciseName: string) => {
    if (exerciseImages[exerciseName]) return;

    setLoadingImage(exerciseName);
    try {
      const response = await fetch("/api/generate-image/exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseName }),
      });

      const data = await response.json();
      setExerciseImages(prev => ({ ...prev, [exerciseName]: data.imageUrl }));

      toast({
        title: "Image Generated!",
        description: `Generated image for ${exerciseName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoadingImage(null);
    }
  };

  const generateMealImage = async (mealName: string) => {
    if (mealImages[mealName]) return;

    setLoadingImage(mealName);
    try {
      const response = await fetch("/api/generate-image/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealName }),
      });

      const data = await response.json();
      setMealImages(prev => ({ ...prev, [mealName]: data.imageUrl }));

      toast({
        title: "Image Generated!",
        description: `Generated image for ${mealName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoadingImage(null);
    }
  };

  const speakText = async (text: string) => {
    if (isPlayingVoice) {
      currentAudio?.pause();
      setCurrentAudio(null);
      setIsPlayingVoice(false);
      return;
    }

    try {
      setIsPlayingVoice(true);
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlayingVoice(false);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      await audio.play();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate voice",
        variant: "destructive",
      });
      setIsPlayingVoice(false);
    }
  };

  const readWorkout = (workout: DailyWorkout) => {
    const text = `${workout.name} for ${workout.duration}. ${workout.exercises
      .map(
        (ex) =>
          `${ex.name}: ${ex.sets}, ${ex.reps || ex.duration || ""}, rest ${ex.rest}`
      )
      .join(". ")}`;
    speakText(text);
  };

  const readMeals = (meals: DailyMeals) => {
    const text = `${meals.day} meal plan. Total ${meals.totalCalories} calories. ${meals.meals
      .map((meal) => `${meal.meal}: ${meal.name}, ${meal.calories} calories`)
      .join(". ")}`;
    speakText(text);
  };

  const exportPDF = () => {
    if (!plan) return;

    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text("AI Fitness Coach - Your Personalized Plan", 105, yPos, { align: "center" });
    yPos += 15;

    // Profile
    doc.setFontSize(12);
    doc.text(`Name: ${plan.profile.name}`, 20, yPos);
    yPos += 7;
    doc.text(`Goal: ${plan.profile.fitnessGoal}`, 20, yPos);
    yPos += 15;

    // Workout Plan
    doc.setFontSize(16);
    doc.text("7-Day Workout Plan", 20, yPos);
    yPos += 10;

    plan.workout.forEach((day) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.text(`${day.day}: ${day.name}`, 20, yPos);
      yPos += 7;

      day.exercises.forEach((ex) => {
        doc.setFontSize(10);
        doc.text(`  • ${ex.name} - ${ex.sets}, ${ex.reps || ex.duration || ""}`, 25, yPos);
        yPos += 5;
      });
      yPos += 5;
    });

    // Add new page for meals
    doc.addPage();
    yPos = 20;

    // Meal Plan
    doc.setFontSize(16);
    doc.text("7-Day Meal Plan", 20, yPos);
    yPos += 10;

    plan.meals.forEach((day) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.text(`${day.day}: ${day.totalCalories} cal`, 20, yPos);
      yPos += 7;

      day.meals.forEach((meal) => {
        doc.setFontSize(10);
        doc.text(`  • ${meal.meal}: ${meal.name} (${meal.calories} cal)`, 25, yPos);
        yPos += 5;
      });
      yPos += 5;
    });

    doc.save("fitness-plan.pdf");
    toast({
      title: "Success!",
      description: "Your plan has been exported as PDF",
    });
  };

  const regeneratePlan = async () => {
    if (!plan) return;

    setIsRegenerating(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan.profile),
      });

      if (!response.ok) throw new Error("Failed to regenerate plan");

      const newPlan = await response.json();
      localStorage.setItem("fitnessPlan", JSON.stringify(newPlan));
      setPlan(newPlan);

      toast({
        title: "Success!",
        description: "Your plan has been regenerated with fresh content!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate plan",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-tight">
              Your Personalized Fitness Plan
            </h1>
            <p className="text-muted-foreground mt-2">
              Generated for {plan.profile.name}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={exportPDF} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              onClick={regeneratePlan}
              variant="outline"
              size="sm"
              disabled={isRegenerating}
            >
              {isRegenerating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Regenerate
            </Button>
          </div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium italic">{quote}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Daily Motivation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Tips */}
        {plan.tips && plan.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Workout Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  7-Day Workout Plan
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {plan.workout.map((day, index) => (
                  <AccordionItem key={index} value={`workout-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-semibold">{day.day}</span>
                        <Badge variant="secondary">{day.name}</Badge>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          {day.duration}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge>{day.difficulty}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => readWorkout(day)}
                          >
                            {isPlayingVoice ? (
                              <VolumeX className="h-4 w-4 mr-2" />
                            ) : (
                              <Volume2 className="h-4 w-4 mr-2" />
                            )}
                            {isPlayingVoice ? "Stop" : "Read Aloud"}
                          </Button>
                        </div>

                        {day.exercises.map((exercise, exIndex) => (
                          <motion.div
                            key={exIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: exIndex * 0.1 }}
                            className="p-4 rounded-lg bg-muted/50 space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{exercise.name}</h4>
                                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                  <span>{exercise.sets}</span>
                                  {exercise.reps && <span>{exercise.reps}</span>}
                                  {exercise.duration && <span>{exercise.duration}</span>}
                                  <span>Rest: {exercise.rest}</span>
                                </div>
                                {exercise.instructions && (
                                  <p className="text-sm mt-2">{exercise.instructions}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => generateExerciseImage(exercise.name)}
                                disabled={loadingImage === exercise.name}
                              >
                                {loadingImage === exercise.name ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ImageIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <AnimatePresence>
                              {exerciseImages[exercise.name] && (
                                <motion.img
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  src={exerciseImages[exercise.name]}
                                  alt={exercise.name}
                                  className="w-full rounded-lg mt-2"
                                />
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Meal Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                7-Day Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {plan.meals.map((day, index) => (
                  <AccordionItem key={index} value={`meal-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-semibold">{day.day}</span>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          {day.totalCalories} cal
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex gap-2">
                            <Badge variant="outline">P: {day.macros.protein}g</Badge>
                            <Badge variant="outline">C: {day.macros.carbs}g</Badge>
                            <Badge variant="outline">F: {day.macros.fats}g</Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => readMeals(day)}
                          >
                            {isPlayingVoice ? (
                              <VolumeX className="h-4 w-4 mr-2" />
                            ) : (
                              <Volume2 className="h-4 w-4 mr-2" />
                            )}
                            {isPlayingVoice ? "Stop" : "Read Aloud"}
                          </Button>
                        </div>

                        {day.meals.map((meal, mealIndex) => (
                          <motion.div
                            key={mealIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: mealIndex * 0.1 }}
                            className="p-4 rounded-lg bg-muted/50 space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{meal.meal}</Badge>
                                  <h4 className="font-medium">{meal.name}</h4>
                                </div>
                                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                  <span>{meal.calories} cal</span>
                                  {meal.protein && <span>P: {meal.protein}g</span>}
                                  {meal.carbs && <span>C: {meal.carbs}g</span>}
                                  {meal.fats && <span>F: {meal.fats}g</span>}
                                </div>
                                {meal.ingredients && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium">Ingredients:</p>
                                    <p className="text-sm text-muted-foreground">
                                      {meal.ingredients.join(", ")}
                                    </p>
                                  </div>
                                )}
                                {meal.recipe && (
                                  <p className="text-sm mt-2">{meal.recipe}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => generateMealImage(meal.name)}
                                disabled={loadingImage === meal.name}
                              >
                                {loadingImage === meal.name ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ImageIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <AnimatePresence>
                              {mealImages[meal.name] && (
                                <motion.img
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  src={mealImages[meal.name]}
                                  alt={meal.name}
                                  className="w-full rounded-lg mt-2"
                                />
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
