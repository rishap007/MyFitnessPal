import {
  type UserProfile,
  type InsertUserProfile,
  type WorkoutPlan,
  type InsertWorkoutPlan,
  type MealPlan,
  type InsertMealPlan,
  type ChatMessage,
  type InsertChatMessage,
  type ProgressLog,
  type InsertProgressLog,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(id: string): Promise<UserProfile | undefined>;
  getUserProfileByEmail(email: string): Promise<UserProfile | undefined>;
  updateUserProfile(id: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  createWorkoutPlan(plan: InsertWorkoutPlan): Promise<WorkoutPlan>;
  getWorkoutPlan(userId: string): Promise<WorkoutPlan | undefined>;
  getAllWorkoutPlans(userId: string): Promise<WorkoutPlan[]>;
  updateWorkoutPlan(id: string, plan: Partial<InsertWorkoutPlan>): Promise<WorkoutPlan | undefined>;
  
  createMealPlan(plan: InsertMealPlan): Promise<MealPlan>;
  getMealPlan(userId: string): Promise<MealPlan | undefined>;
  getAllMealPlans(userId: string): Promise<MealPlan[]>;
  updateMealPlan(id: string, plan: Partial<InsertMealPlan>): Promise<MealPlan | undefined>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(userId: string, sessionId: string, limit?: number): Promise<ChatMessage[]>;
  
  createProgressLog(log: InsertProgressLog): Promise<ProgressLog>;
  getProgressLogs(userId: string): Promise<ProgressLog[]>;
  updateProgressLog(id: string, log: Partial<InsertProgressLog>): Promise<ProgressLog | undefined>;
  deleteProgressLog(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<string, UserProfile>;
  private workoutPlans: Map<string, WorkoutPlan>;
  private mealPlans: Map<string, MealPlan>;
  private chatMessages: Map<string, ChatMessage>;
  private progressLogs: Map<string, ProgressLog>;

  constructor() {
    this.userProfiles = new Map();
    this.workoutPlans = new Map();
    this.mealPlans = new Map();
    this.chatMessages = new Map();
    this.progressLogs = new Map();
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const now = new Date();
    const profile: UserProfile = {
      ...insertProfile,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      profile => profile.email === email
    );
  }

  async updateUserProfile(id: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = this.userProfiles.get(id);
    if (!existing) return undefined;
    
    const updated: UserProfile = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.userProfiles.set(id, updated);
    return updated;
  }

  async createWorkoutPlan(insertPlan: InsertWorkoutPlan): Promise<WorkoutPlan> {
    const id = randomUUID();
    const plan: WorkoutPlan = {
      ...insertPlan,
      id,
      createdAt: new Date(),
    };
    this.workoutPlans.set(id, plan);
    return plan;
  }

  async getWorkoutPlan(userId: string): Promise<WorkoutPlan | undefined> {
    return Array.from(this.workoutPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  }

  async getAllWorkoutPlans(userId: string): Promise<WorkoutPlan[]> {
    return Array.from(this.workoutPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateWorkoutPlan(id: string, updates: Partial<InsertWorkoutPlan>): Promise<WorkoutPlan | undefined> {
    const existing = this.workoutPlans.get(id);
    if (!existing) return undefined;
    
    const updated: WorkoutPlan = {
      ...existing,
      ...updates,
    };
    this.workoutPlans.set(id, updated);
    return updated;
  }

  async createMealPlan(insertPlan: InsertMealPlan): Promise<MealPlan> {
    const id = randomUUID();
    const plan: MealPlan = {
      ...insertPlan,
      id,
      createdAt: new Date(),
    };
    this.mealPlans.set(id, plan);
    return plan;
  }

  async getMealPlan(userId: string): Promise<MealPlan | undefined> {
    return Array.from(this.mealPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  }

  async getAllMealPlans(userId: string): Promise<MealPlan[]> {
    return Array.from(this.mealPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateMealPlan(id: string, updates: Partial<InsertMealPlan>): Promise<MealPlan | undefined> {
    const existing = this.mealPlans.get(id);
    if (!existing) return undefined;
    
    const updated: MealPlan = {
      ...existing,
      ...updates,
    };
    this.mealPlans.set(id, updated);
    return updated;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(userId: string, sessionId: string, limit: number = 50): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.userId === userId && msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .slice(-limit);
  }

  async createProgressLog(insertLog: InsertProgressLog): Promise<ProgressLog> {
    const id = randomUUID();
    const log: ProgressLog = {
      id,
      userId: insertLog.userId,
      date: insertLog.date,
      weight: insertLog.weight ?? null,
      workoutCompleted: insertLog.workoutCompleted ?? null,
      caloriesBurned: insertLog.caloriesBurned ?? null,
      notes: insertLog.notes ?? null,
      createdAt: new Date(),
    };
    this.progressLogs.set(id, log);
    return log;
  }

  async getProgressLogs(userId: string): Promise<ProgressLog[]> {
    return Array.from(this.progressLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async updateProgressLog(id: string, updates: Partial<InsertProgressLog>): Promise<ProgressLog | undefined> {
    const existing = this.progressLogs.get(id);
    if (!existing) return undefined;
    
    const updated: ProgressLog = {
      ...existing,
      ...updates,
    };
    this.progressLogs.set(id, updated);
    return updated;
  }

  async deleteProgressLog(id: string): Promise<boolean> {
    return this.progressLogs.delete(id);
  }
}

export const storage = new MemStorage();
