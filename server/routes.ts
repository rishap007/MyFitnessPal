import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserProfileSchema,
  insertWorkoutPlanSchema,
  insertMealPlanSchema,
  insertChatMessageSchema,
  insertProgressLogSchema
} from "@shared/schema";
import { z } from "zod";
import {
  generateFitnessPlan,
  generateMotivationalQuote,
  generateExerciseImage,
  generateMealImage,
  textToSpeech,
} from "./services/ai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.post("/api/profile", async (req, res) => {
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      
      const existing = await storage.getUserProfileByEmail(profileData.email);
      if (existing) {
        return res.status(409).json({ error: "Profile with this email already exists" });
      }
      
      const profile = await storage.createUserProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create profile" });
    }
  });

  app.get("/api/profile/:id", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.get("/api/profile/email/:email", async (req, res) => {
    try {
      const profile = await storage.getUserProfileByEmail(req.params.email);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.patch("/api/profile/:id", async (req, res) => {
    try {
      const updates = insertUserProfileSchema.partial().parse(req.body);
      
      if (updates.email) {
        const existingByEmail = await storage.getUserProfileByEmail(updates.email);
        if (existingByEmail && existingByEmail.id !== req.params.id) {
          return res.status(409).json({ error: "Email already in use by another profile" });
        }
      }
      
      const profile = await storage.updateUserProfile(req.params.id, updates);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Workout plan routes
  app.post("/api/workout", async (req, res) => {
    try {
      const planData = insertWorkoutPlanSchema.parse(req.body);
      const plan = await storage.createWorkoutPlan(planData);
      res.status(201).json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid workout plan data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create workout plan" });
    }
  });

  app.get("/api/workout/:userId", async (req, res) => {
    try {
      const plan = await storage.getWorkoutPlan(req.params.userId);
      if (!plan) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workout plan" });
    }
  });

  app.get("/api/workout/all/:userId", async (req, res) => {
    try {
      const plans = await storage.getAllWorkoutPlans(req.params.userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workout plans" });
    }
  });

  app.patch("/api/workout/:id", async (req, res) => {
    try {
      const updates = insertWorkoutPlanSchema.partial().parse(req.body);
      const plan = await storage.updateWorkoutPlan(req.params.id, updates);
      if (!plan) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      res.json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update workout plan" });
    }
  });

  // Meal plan routes
  app.post("/api/meals", async (req, res) => {
    try {
      const planData = insertMealPlanSchema.parse(req.body);
      const plan = await storage.createMealPlan(planData);
      res.status(201).json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid meal plan data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create meal plan" });
    }
  });

  app.get("/api/meals/:userId", async (req, res) => {
    try {
      const plan = await storage.getMealPlan(req.params.userId);
      if (!plan) {
        return res.status(404).json({ error: "Meal plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meal plan" });
    }
  });

  app.get("/api/meals/all/:userId", async (req, res) => {
    try {
      const plans = await storage.getAllMealPlans(req.params.userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meal plans" });
    }
  });

  app.patch("/api/meals/:id", async (req, res) => {
    try {
      const updates = insertMealPlanSchema.partial().parse(req.body);
      const plan = await storage.updateMealPlan(req.params.id, updates);
      if (!plan) {
        return res.status(404).json({ error: "Meal plan not found" });
      }
      res.json(plan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update meal plan" });
    }
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid message data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create chat message" });
    }
  });

  app.get("/api/chat/:userId/:sessionId", async (req, res) => {
    try {
      const { userId, sessionId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const messages = await storage.getChatMessages(userId, sessionId, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  // Progress log routes
  app.post("/api/progress", async (req, res) => {
    try {
      const logData = insertProgressLogSchema.parse(req.body);
      const log = await storage.createProgressLog(logData);
      res.status(201).json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid progress log data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create progress log" });
    }
  });

  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const logs = await storage.getProgressLogs(req.params.userId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress logs" });
    }
  });

  app.patch("/api/progress/:id", async (req, res) => {
    try {
      const updates = insertProgressLogSchema.partial().parse(req.body);
      const log = await storage.updateProgressLog(req.params.id, updates);
      if (!log) {
        return res.status(404).json({ error: "Progress log not found" });
      }
      res.json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update progress log" });
    }
  });

  app.delete("/api/progress/:id", async (req, res) => {
    try {
      const success = await storage.deleteProgressLog(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Progress log not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete progress log" });
    }
  });

  // AI generation routes
  app.post("/api/generate-plan", async (req, res) => {
    try {
      console.log("📋 Received plan generation request:", req.body);
      const profileData = insertUserProfileSchema.parse(req.body);

      console.log("🤖 Calling AI to generate fitness plan...");
      // Generate AI plan
      const plan = await generateFitnessPlan(profileData);
      console.log("✅ AI plan generated successfully");

      // Save profile if it doesn't exist
      const existingProfile = await storage.getUserProfileByEmail(profileData.email);
      let userId: string;

      if (existingProfile) {
        userId = existingProfile.id;
        console.log(`📝 Updating existing profile: ${userId}`);
        await storage.updateUserProfile(userId, profileData);
      } else {
        console.log("📝 Creating new profile...");
        const newProfile = await storage.createUserProfile(profileData);
        userId = newProfile.id;
        console.log(`✅ New profile created: ${userId}`);
      }

      // Save workout plan
      console.log("💪 Saving workout plan...");
      const workoutPlan = await storage.createWorkoutPlan({
        userId,
        weekData: plan.workout,
      });

      // Save meal plan
      console.log("🍽️ Saving meal plan...");
      const totalCalories = plan.meals[0]?.totalCalories || 2000;
      const macros = plan.meals[0]?.macros || { protein: 150, carbs: 200, fats: 60 };

      const mealPlan = await storage.createMealPlan({
        userId,
        dailyCalorieTarget: totalCalories,
        macros,
        weekData: plan.meals,
      });

      console.log("🎉 Plan generation completed successfully!");
      res.json({
        userId,
        profile: plan.profile,
        workout: plan.workout,
        meals: plan.meals,
        tips: plan.tips,
        workoutPlanId: workoutPlan.id,
        mealPlanId: mealPlan.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("❌ Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      console.error("❌ Error generating plan:", error);
      console.error("Stack trace:", error instanceof Error ? error.stack : 'No stack trace');
      const errorMessage = error instanceof Error ? error.message : "Failed to generate plan";
      res.status(500).json({ error: errorMessage });
    }
  });

  app.get("/api/motivational-quote", async (req, res) => {
    try {
      const quote = await generateMotivationalQuote();
      res.json({ quote });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate quote" });
    }
  });

  app.post("/api/generate-image/exercise", async (req, res) => {
    try {
      const { exerciseName } = req.body;
      if (!exerciseName) {
        return res.status(400).json({ error: "Exercise name is required" });
      }

      const imageUrl = await generateExerciseImage(exerciseName);
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate exercise image" });
    }
  });

  app.post("/api/generate-image/meal", async (req, res) => {
    try {
      const { mealName } = req.body;
      if (!mealName) {
        return res.status(400).json({ error: "Meal name is required" });
      }

      const imageUrl = await generateMealImage(mealName);
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate meal image" });
    }
  });

  app.post("/api/text-to-speech", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const audioBuffer = await textToSpeech(text);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
      });
      res.send(audioBuffer);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate speech" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
