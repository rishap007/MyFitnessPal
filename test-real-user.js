import dotenv from "dotenv";

dotenv.config();

async function testRealUserRequest() {
  try {
    console.log("🧪 Testing with actual failed user request...\n");

    // This is the actual request that timed out
    const realUserProfile = {
      name: 'Kumar Rishap',
      email: 'rishapsharma62476@gmail.com',
      age: 21,
      gender: 'male',
      height: 181,
      weight: 77,
      fitnessGoal: 'Muscle Gain',
      fitnessLevel: 'Intermediate',
      workoutLocation: 'Gym',
      dietaryPreference: 'No Preference'
    };

    console.log("📋 Real user profile:", realUserProfile);
    console.log("\n🌐 Sending request to http://localhost:5000/api/generate-plan\n");
    console.log("⏱️  This may take up to 2 minutes...\n");

    const startTime = Date.now();

    const response = await fetch("http://localhost:5000/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(realUserProfile),
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n⏱️  Total time: ${duration} seconds`);
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
  testRealUserRequest().then(() => {
    console.log("\n✅ Test complete!");
    process.exit(0);
  }).catch((error) => {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  });
}, 2000);
