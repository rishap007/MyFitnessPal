import { GoogleGenerativeAI } from "@google/generative-ai";
import type { InsertUserProfile } from "@shared/schema";

// Initialize Gemini AI (Free - No payment required!)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

  // Retry logic with exponential backoff
  let lastError: Error | null = null;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Sending request to Gemini AI... (Attempt ${attempt}/${maxRetries})`);

      // Increased timeout to 120 seconds for complex fitness plan generation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`AI request timed out after 120 seconds (attempt ${attempt})`)), 120000);
      });

      const result = await Promise.race([
        model.generateContent(prompt),
        timeoutPromise
      ]) as any;

      console.log("📥 Received response from Gemini AI");
      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error("No content received from Gemini AI");
      }

      console.log("📝 Raw AI response (first 200 chars):", content.substring(0, 200));

      // Clean up the response - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/g, '');
      }

      console.log("🔍 Parsing JSON response...");
      const planData = JSON.parse(cleanContent);

      console.log("✅ Successfully parsed fitness plan");
      return {
        profile,
        workout: planData.workout,
        meals: planData.meals,
        tips: planData.tips || [],
      };
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ Error on attempt ${attempt}/${maxRetries}:`, error);

      if (attempt < maxRetries) {
        const waitTime = attempt * 2000; // 2s, 4s
        console.log(`⏳ Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // All retries failed
  console.error("❌ All retry attempts failed for fitness plan generation");
  if (lastError) {
    console.error("Last error message:", lastError.message);
    console.error("Stack trace:", lastError.stack);
  }
  throw new Error(`Failed to generate fitness plan after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`);
}

export async function generateMotivationalQuote(): Promise<string> {
  try {
    const prompt = "You are a motivational fitness coach. Generate a short, powerful, inspiring fitness quote (max 20 words). Return only the quote, no extra text.";

    // Add timeout to prevent hanging - 10 seconds max
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Quote generation timed out")), 10000);
    });

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]) as any;

    const response = result.response;
    const quote = response.text().trim();

    return quote || "Your only limit is you. Push harder today!";
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Believe in yourself and push your limits!";
  }
}

export async function generateExerciseImage(
  exerciseName: string
): Promise<string> {
  console.log(`Image generation requested for: ${exerciseName}`);

  try {
    const searchQuery = encodeURIComponent(`${exerciseName} exercise fitness gym`);
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (unsplashAccessKey) {
      // Use Unsplash API with access key (better rate limits)
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${unsplashAccessKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          console.log(`✅ Fetched exercise image from Unsplash API`);
          return data.results[0].urls.regular;
        }
      }
    }

    // Fallback: Use Unsplash Source (no API key needed, but rate limited)
    // Returns a random image matching the query
    console.log(`📸 Using Unsplash source (no API key)`);
    return `https://source.unsplash.com/800x600/?${searchQuery}`;
  } catch (error) {
    console.error("Error fetching exercise image:", error);
    // Return a generic fitness image as ultimate fallback
    return `https://source.unsplash.com/800x600/?gym,fitness,exercise`;
  }
}

export async function generateMealImage(mealName: string): Promise<string> {
  console.log(`Meal image requested for: ${mealName}`);

  try {
    const searchQuery = encodeURIComponent(`${mealName} healthy food meal`);
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (unsplashAccessKey) {
      // Use Unsplash API with access key (better rate limits)
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${unsplashAccessKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          console.log(`✅ Fetched meal image from Unsplash API`);
          return data.results[0].urls.regular;
        }
      }
    }

    // Fallback: Use Unsplash Source (no API key needed, but rate limited)
    console.log(`📸 Using Unsplash source (no API key)`);
    return `https://source.unsplash.com/800x600/?${searchQuery}`;
  } catch (error) {
    console.error("Error fetching meal image:", error);
    // Return a generic food image as ultimate fallback
    return `https://source.unsplash.com/800x600/?healthy,food,meal`;
  }
}

export async function textToSpeech(text: string): Promise<Buffer> {
  // Note: Text-to-speech is not available with free Gemini API
  // For free TTS alternatives, consider:
  // 1. Browser's built-in Web Speech API (client-side)
  // 2. ElevenLabs free tier (10,000 chars/month)
  // 3. Google Cloud TTS free tier (1M chars/month)

  console.log("Text-to-speech requested");
  console.log("Note: TTS not included with free Gemini API");

  throw new Error(
    "Text-to-speech is not available with the free Gemini API. " +
    "Please use browser's built-in speech synthesis or add a TTS service."
  );
}
