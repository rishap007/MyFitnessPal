import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { useState } from "react";

const mealPlan = [
  {
    day: "Monday",
    totalCalories: 2000,
    macros: { protein: 150, carbs: 200, fats: 65 },
    meals: [
      {
        meal: "Breakfast",
        name: "Protein Oatmeal Bowl",
        calories: 450,
        protein: 30,
        carbs: 60,
        fats: 12,
        ingredients: ["Oats (1 cup)", "Protein powder (1 scoop)", "Banana", "Almond butter (1 tbsp)", "Berries"],
        recipe: "Cook oats, mix in protein powder, top with banana slices, berries, and almond butter.",
      },
      {
        meal: "Lunch",
        name: "Grilled Chicken Salad",
        calories: 520,
        protein: 45,
        carbs: 35,
        fats: 22,
        ingredients: ["Chicken breast (200g)", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil (1 tbsp)", "Lemon"],
        recipe: "Grill chicken, toss with fresh greens and vegetables, drizzle with olive oil and lemon.",
      },
      {
        meal: "Snack",
        name: "Greek Yogurt & Almonds",
        calories: 280,
        protein: 20,
        carbs: 15,
        fats: 18,
        ingredients: ["Greek yogurt (200g)", "Almonds (30g)", "Honey (1 tsp)"],
        recipe: "Mix yogurt with honey, serve with almonds on the side.",
      },
      {
        meal: "Dinner",
        name: "Salmon with Sweet Potato",
        calories: 680,
        protein: 50,
        carbs: 75,
        fats: 18,
        ingredients: ["Salmon fillet (200g)", "Sweet potato (large)", "Broccoli", "Olive oil", "Garlic", "Lemon"],
        recipe: "Bake salmon with lemon and garlic, roast sweet potato, steam broccoli.",
      },
    ],
  },
];

export default function MealPlan() {
  const [expandedMeals, setExpandedMeals] = useState<number[]>([]);
  const todayPlan = mealPlan[0];

  const toggleMeal = (index: number) => {
    setExpandedMeals((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const proteinPercent = (todayPlan.macros.protein * 4 / todayPlan.totalCalories) * 100;
  const carbsPercent = (todayPlan.macros.carbs * 4 / todayPlan.totalCalories) * 100;
  const fatsPercent = (todayPlan.macros.fats * 9 / todayPlan.totalCalories) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-display uppercase mb-2">
            Meal Plan
          </h1>
          <p className="text-muted-foreground">
            Personalized nutrition for your goals
          </p>
        </div>
        <Button variant="outline" data-testid="button-shopping-list">
          <Download className="h-4 w-4 mr-2" />
          Shopping List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Nutrition Target</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{todayPlan.totalCalories} calories</span>
            <span className="text-muted-foreground">Daily Goal</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-medium">Protein</span>
                <span className="text-muted-foreground">{todayPlan.macros.protein}g</span>
              </div>
              <Progress value={proteinPercent} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-medium">Carbs</span>
                <span className="text-muted-foreground">{todayPlan.macros.carbs}g</span>
              </div>
              <Progress value={carbsPercent} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-medium">Fats</span>
                <span className="text-muted-foreground">{todayPlan.macros.fats}g</span>
              </div>
              <Progress value={fatsPercent} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {todayPlan.meals.map((meal, index) => (
          <Card key={index} className="hover-elevate">
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleMeal(index)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge variant="outline">{meal.meal}</Badge>
                    <CardTitle className="text-xl">{meal.name}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{meal.calories} cal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
                {expandedMeals.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {expandedMeals.includes(index) && (
              <CardContent className="pt-0 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {meal.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recipe</h4>
                  <p className="text-sm text-muted-foreground">{meal.recipe}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
