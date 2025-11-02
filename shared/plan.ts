import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().int().min(10).max(100),
  gender: z.enum(["male", "female", "other"]).or(z.string().min(1)),
  height: z.coerce.number().int().min(80).max(250),
  weight: z.coerce.number().int().min(25).max(350),
  fitnessGoal: z.string().min(1),
  fitnessLevel: z.enum(["Beginner", "Intermediate", "Advanced"]).or(z.string().min(1)),
  workoutLocation: z.enum(["Home", "Gym", "Outdoor"]).or(z.string().min(1)),
  dietaryPreference: z.string().min(1),
  stressLevel: z.string().optional(),
  medicalHistory: z.string().optional(),
  email: z.string().email().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.string(),
  rest: z.string(),
  instructions: z.string().optional(),
});

export const DayWorkoutSchema = z.object({
  day: z.string(),
  name: z.string(),
  duration: z.string(),
  difficulty: z.string(),
  exercises: z.array(ExerciseSchema),
});

export const MealSchema = z.object({
  meal: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  ingredients: z.array(z.string()).optional(),
  recipe: z.string().optional(),
});

export const DayMealsSchema = z.object({
  day: z.string(),
  totalCalories: z.number(),
  macros: z.object({ protein: z.number(), carbs: z.number(), fats: z.number() }),
  meals: z.array(MealSchema),
});

export const PlanSchema = z.object({
  profile: ProfileSchema,
  workout: z.array(DayWorkoutSchema).length(7),
  meals: z.array(DayMealsSchema).length(7),
  tips: z.array(z.string()).optional(),
});

export type FitnessPlan = z.infer<typeof PlanSchema>;
