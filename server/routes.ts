import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
      console.error("Error creating profile:", error);
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
      console.error("Error fetching profile:", error);
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
      console.error("Error fetching profile by email:", error);
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
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
