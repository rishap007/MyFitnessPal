import dotenv from "dotenv";

dotenv.config();

async function testGeneration() {
  try {
    console.log("🧪 Testing fitness plan generation...\n");

    const testProfile = {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      gender: "male",
      weight: 75,
      height: 175,
      fitnessGoal: "Build Muscle",
      fitnessLevel: "intermediate",
      workoutLocation: "gym",
      dietaryPreference: "balanced"
    };

    console.log("📋 Test profile:", testProfile);
    console.log("\n🌐 Sending request to http://localhost:5000/api/generate-plan\n");

    const response = await fetch("http://localhost:5000/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testProfile),
    });

    console.log(`📊 Response status: ${response.status} ${response.statusText}\n`);

    const data = await response.json();

    if (response.ok) {
      console.log("✅ SUCCESS! Plan generated successfully!");
      console.log("\n📈 Response summary:");
      console.log(`   - User ID: ${data.userId}`);
      console.log(`   - Workout days: ${data.workout?.length || 0}`);
      console.log(`   - Meal days: ${data.meals?.length || 0}`);
      console.log(`   - Tips: ${data.tips?.length || 0}`);
      console.log(`   - Workout Plan ID: ${data.workoutPlanId}`);
      console.log(`   - Meal Plan ID: ${data.mealPlanId}`);
    } else {
      console.error("❌ FAILED! Error response:");
      console.error(JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error("\n❌ Test failed with error:");
    console.error(error.message);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
    process.exit(1);
  }
}

// Wait 2 seconds for server to be ready, then test
setTimeout(() => {
  testGeneration().then(() => {
    console.log("\n✅ Test complete!");
    process.exit(0);
  }).catch((error) => {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  });
}, 2000);
