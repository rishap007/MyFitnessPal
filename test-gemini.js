import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log("API Key loaded:", process.env.GOOGLE_AI_API_KEY ? "YES (length: " + process.env.GOOGLE_AI_API_KEY.length + ")" : "NO");
console.log("API Key starts with:", process.env.GOOGLE_AI_API_KEY ? process.env.GOOGLE_AI_API_KEY.substring(0, 10) + "..." : "N/A");
console.log("");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function testAPI() {
  try {
    console.log("Attempting to list models using the API...\n");

    // Try to call the API to list models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_AI_API_KEY}`);
    const data = await response.json();

    if (response.ok && data.models) {
      console.log("✅ API Key is valid! Available models:");
      data.models.forEach(model => {
        console.log(`  - ${model.name} (${model.displayName})`);
      });

      // Test with gemini-2.5-flash model
      console.log(`\nTesting with model: gemini-2.5-flash`);
      const testModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await testModel.generateContent("Say hello in 5 words");
      console.log(`✅ Response: ${result.response.text()}`);
    } else {
      console.log("❌ API Error:", data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

testAPI().then(() => {
  console.log("\n✅ Test complete!");
  process.exit(0);
}).catch((error) => {
  console.error("\n❌ Test failed:", error);
  process.exit(1);
});
