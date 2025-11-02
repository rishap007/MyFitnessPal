import OpenAI from "openai";
import type { InsertUserProfile } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export interface WorkoutExercise {
  name: string;
  sets: string;
  reps?: string;
  duration?: string;
  rest: string;
  instructions?: string;
}

export interface DailyWorkout {
  day: string;
  name: string;
  duration: string;
  difficulty: string;
  exercises: WorkoutExercise[];
}

export interface Meal {
  meal: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  ingredients?: string[];
  recipe?: string;
}

export interface DailyMeals {
  day: string;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Meal[];
}

export interface FitnessPlan {
  profile: InsertUserProfile;
  workout: DailyWorkout[];
  meals: DailyMeals[];
  tips: string[];
}

export async function generateFitnessPlan(
  profile: InsertUserProfile
): Promise<FitnessPlan> {
  const prompt = `You are a certified AI fitness coach and nutritionist with 15+ years of experience. Generate a comprehensive, personalized 7-day fitness and nutrition plan.

User Profile:
- Name: ${profile.name}
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Weight: ${profile.weight}kg
- Height: ${profile.height}cm
- Fitness Goal: ${profile.fitnessGoal}
- Current Fitness Level: ${profile.fitnessLevel}
- Workout Location: ${profile.workoutLocation}
- Dietary Preference: ${profile.dietaryPreference}

Create a detailed plan that includes:

1. **7-Day Workout Plan**: Each day should have:
   - Day name (Monday-Sunday)
   - Workout name (e.g., "Upper Body Strength", "Cardio & Core")
   - Duration (e.g., "45 min")
   - Difficulty level matching their fitness level
   - List of 4-6 exercises with:
     - Exercise name
     - Sets (e.g., "3 sets" or "4 sets")
     - Reps/Duration (e.g., "12 reps" or "30 seconds")
     - Rest time between sets (e.g., "60s" or "90s")
     - Brief instructions if needed

2. **7-Day Meal Plan**: Each day should have:
   - Day name (Monday-Sunday)
   - Total daily calories (based on their goal)
   - Macros breakdown (protein, carbs, fats in grams)
   - 4 meals (Breakfast, Lunch, Dinner, Snacks):
     - Meal name
     - Description
     - Calories per meal
     - Protein, carbs, fats (optional)
     - Key ingredients list
     - Brief recipe or preparation notes

3. **Motivational Tips**: 5-7 personalized tips for staying motivated and achieving their ${profile.fitnessGoal} goal.

IMPORTANT: Return ONLY valid JSON in this exact format (no markdown, no code blocks, just raw JSON):

{
  "workout": [
    {
      "day": "Monday",
      "name": "Upper Body Strength",
      "duration": "45 min",
      "difficulty": "Intermediate",
      "exercises": [
        {
          "name": "Push-ups",
          "sets": "3 sets",
          "reps": "12 reps",
          "rest": "60s",
          "instructions": "Keep your core tight and lower until chest nearly touches ground"
        }
      ]
    }
  ],
  "meals": [
    {
      "day": "Monday",
      "totalCalories": 2000,
      "macros": {
        "protein": 150,
        "carbs": 200,
        "fats": 60
      },
      "meals": [
        {
          "meal": "Breakfast",
          "name": "Protein Oatmeal Bowl",
          "calories": 450,
          "protein": 30,
          "carbs": 55,
          "fats": 12,
          "ingredients": ["Oats", "Protein powder", "Banana", "Almonds"],
          "recipe": "Cook oats, mix in protein powder, top with sliced banana and almonds"
        }
      ]
    }
  ],
  "tips": [
    "Start each day with a glass of water and light stretching",
    "Track your progress weekly, not daily"
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a certified fitness coach and nutritionist. Always return valid JSON responses without markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const planData = JSON.parse(content);

    return {
      profile,
      workout: planData.workout,
      meals: planData.meals,
      tips: planData.tips || [],
    };
  } catch (error) {
    console.error("Error generating fitness plan:", error);
    throw new Error("Failed to generate fitness plan");
  }
}

export async function generateMotivationalQuote(): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a motivational fitness coach. Generate a short, powerful, inspiring fitness quote (max 20 words).",
        },
        {
          role: "user",
          content: "Give me a motivational fitness quote for today.",
        },
      ],
      max_tokens: 50,
      temperature: 0.9,
    });

    return (
      completion.choices[0].message.content ||
      "Your only limit is you. Push harder today!"
    );
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Believe in yourself and push your limits!";
  }
}

export async function generateExerciseImage(
  exerciseName: string
): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A clear, professional demonstration of the exercise: ${exerciseName}. Show proper form and technique. Fitness photography style, clean background, athletic person performing the exercise correctly.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || "";
  } catch (error) {
    console.error("Error generating exercise image:", error);
    throw new Error("Failed to generate exercise image");
  }
}

export async function generateMealImage(mealName: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A beautiful, appetizing photo of ${mealName}. Professional food photography, well-plated, healthy meal, vibrant colors, clean presentation on a white plate.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || "";
  } catch (error) {
    console.error("Error generating meal image:", error);
    throw new Error("Failed to generate meal image");
  }
}

export async function textToSpeech(text: string): Promise<Buffer> {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
      speed: 1.0,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
}
