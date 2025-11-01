import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Target, Home, Utensils } from "lucide-react";

const steps = ["Profile", "Goals", "Preferences", "Location"];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    fitnessLevel: "",
    workoutLocation: "",
    dietaryPreference: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Onboarding complete", formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display uppercase text-center mb-4">
            Let's Customize Your Plan
          </h1>
          <Progress value={progress} className="h-2" data-testid="progress-onboarding" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span
                key={step}
                className={`text-sm ${
                  index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Your Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="John Doe"
                    className="h-14"
                    data-testid="input-name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      placeholder="30"
                      className="h-14"
                      data-testid="input-age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                      <SelectTrigger className="h-14" data-testid="select-gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateField("height", e.target.value)}
                      placeholder="175"
                      className="h-14"
                      data-testid="input-height"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateField("weight", e.target.value)}
                      placeholder="70"
                      className="h-14"
                      data-testid="input-weight"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Your Goals</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Fitness Goal</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {["Weight Loss", "Muscle Gain", "Endurance", "General Fitness"].map((goal) => (
                      <Button
                        key={goal}
                        variant={formData.fitnessGoal === goal ? "default" : "outline"}
                        className="h-20 text-base"
                        onClick={() => updateField("fitnessGoal", goal)}
                        data-testid={`button-goal-${goal.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Fitness Level</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <Button
                        key={level}
                        variant={formData.fitnessLevel === level ? "default" : "outline"}
                        className="h-16"
                        onClick={() => updateField("fitnessLevel", level)}
                        data-testid={`button-level-${level.toLowerCase()}`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Dietary Preferences</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Dietary Preference</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {["Vegetarian", "Vegan", "Keto", "No Preference"].map((diet) => (
                      <Button
                        key={diet}
                        variant={formData.dietaryPreference === diet ? "default" : "outline"}
                        className="h-16"
                        onClick={() => updateField("dietaryPreference", diet)}
                        data-testid={`button-diet-${diet.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {diet}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Home className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Workout Location</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Where will you work out?</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {["Home", "Gym", "Outdoor"].map((location) => (
                      <Button
                        key={location}
                        variant={formData.workoutLocation === location ? "default" : "outline"}
                        className="h-20"
                        onClick={() => updateField("workoutLocation", location)}
                        data-testid={`button-location-${location.toLowerCase()}`}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex-1"
                data-testid="button-back"
              >
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              className="flex-1"
              data-testid="button-continue"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
