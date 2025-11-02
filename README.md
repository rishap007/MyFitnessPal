# 🏋️ AI Fitness Coach - Full-Stack Web Application

A comprehensive AI-powered fitness coaching platform that generates personalized workout and meal plans using advanced AI models (OpenAI GPT-4), with voice assistance, AI image generation, and PDF export capabilities.

## ✨ Features

### 🤖 AI-Powered Plan Generation
- **Personalized 7-Day Workout Plans** - Generated using GPT-4 based on user profile
- **Custom Meal Plans** - Tailored nutrition plans with calorie and macro tracking
- **Smart Recommendations** - Adapts to fitness level, goals, location, and dietary preferences

### 🎯 Advanced AI Features
- **AI Image Generation** - DALL-E 3 generates visual demonstrations for exercises and meals
- **Voice Assistant** - OpenAI TTS reads workouts and meal plans aloud
- **Daily Motivation** - AI-generated motivational quotes
- **Plan Regeneration** - Get fresh variations of your fitness plan

### 💎 User Experience
- **Dark/Light Mode** - Fully themed with smooth transitions
- **PDF Export** - Download your complete fitness plan as PDF
- **Collapsible Sections** - Organized accordion UI for easy navigation
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Works perfectly on all devices

### 🔧 Technical Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **AI Services**: OpenAI GPT-4, DALL-E 3, TTS
- **State Management**: React Query, LocalStorage
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui (Radix UI)
- **PDF Generation**: jsPDF

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (required for all AI features)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd NextStackAiTool
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Database (for production)
DATABASE_URL=postgresql://user:password@localhost:5432/fitness_coach

# Optional: Alternative AI APIs
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_AI_API_KEY=your-google-ai-key
ELEVENLABS_API_KEY=your-elevenlabs-key
REPLICATE_API_KEY=your-replicate-key
```

4. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
NextStackAiTool/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── ui/          # Shadcn UI components
│       │   ├── ThemeProvider.tsx
│       │   └── ThemeToggle.tsx
│       ├── pages/           # Application pages
│       │   ├── landing.tsx  # Hero landing page
│       │   ├── onboarding.tsx # User input form
│       │   ├── plan.tsx     # Plan display with all features
│       │   ├── dashboard.tsx
│       │   ├── workout.tsx
│       │   ├── meals.tsx
│       │   ├── chat.tsx
│       │   ├── exercises.tsx
│       │   └── progress.tsx
│       ├── lib/             # Utilities
│       └── hooks/           # Custom React hooks
├── server/                  # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data persistence
│   ├── services/
│   │   └── ai.ts           # OpenAI integration
│   └── vite.ts             # Vite dev server setup
├── shared/                  # Shared types and schemas
│   └── schema.ts           # Database schemas & types
└── README.md
```

## 🎨 Key Pages & Features

### 1. Landing Page (`/`)
- Hero section with animated content
- Feature showcase
- Advanced AI technology highlights
- Call-to-action buttons

### 2. Onboarding (`/onboarding`)
- **Step 1**: Personal Profile (Name, Email, Age, Gender, Height, Weight)
- **Step 2**: Fitness Goals & Level
- **Step 3**: Dietary Preferences
- **Step 4**: Workout Location
- Form validation and loading states
- AI plan generation on completion

### 3. Plan Page (`/plan`)
The main feature page with:
- **Motivational Quote** - Daily AI-generated inspiration
- **Success Tips** - Personalized recommendations
- **7-Day Workout Plan** with:
  - Collapsible daily sections
  - Exercise details (sets, reps, rest, instructions)
  - Voice reading for each day
  - AI image generation for exercises
  - Smooth animations on expand
- **7-Day Meal Plan** with:
  - Daily calorie targets
  - Macro breakdowns (Protein, Carbs, Fats)
  - Meal details (breakfast, lunch, dinner, snacks)
  - Voice reading for each day
  - AI image generation for meals
- **Action Buttons**:
  - Export as PDF
  - Regenerate Plan
  - Voice controls

## 🔌 API Endpoints

### Plan Generation
```
POST /api/generate-plan
Body: { name, email, age, gender, height, weight, fitnessGoal, fitnessLevel, workoutLocation, dietaryPreference }
Response: Complete fitness plan with workout, meals, tips
```

### Motivational Quote
```
GET /api/motivational-quote
Response: { quote: string }
```

### Image Generation
```
POST /api/generate-image/exercise
Body: { exerciseName: string }
Response: { imageUrl: string }

POST /api/generate-image/meal
Body: { mealName: string }
Response: { imageUrl: string }
```

### Text-to-Speech
```
POST /api/text-to-speech
Body: { text: string }
Response: Audio file (audio/mpeg)
```

## 🚢 Deployment to Vercel

### Step 1: Prepare for Deployment

1. **Build the project locally to test**
```bash
npm run build
```

2. **Create `vercel.json` in root** (already included):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your project

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=production
PORT=3000
```

### Step 4: Redeploy

After adding environment variables, trigger a new deployment from the Vercel dashboard or run:
```bash
vercel --prod
```

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | OpenAI API key for GPT-4, DALL-E 3, TTS |
| `NODE_ENV` | No | Environment (development/production) |
| `PORT` | No | Server port (default: 5000) |
| `DATABASE_URL` | No | PostgreSQL connection string (optional) |
| `ANTHROPIC_API_KEY` | No | Alternative AI provider |
| `GOOGLE_AI_API_KEY` | No | Alternative AI provider |
| `ELEVENLABS_API_KEY` | No | Alternative TTS provider |
| `REPLICATE_API_KEY` | No | Alternative image generation |

## 🎯 How It Works

### User Flow
1. User lands on homepage → clicks "Get Started"
2. Completes 4-step onboarding form
3. AI generates personalized plan (GPT-4)
4. User views plan with interactive features:
   - Click images to generate AI visuals
   - Click voice button to hear plan read aloud
   - Export as PDF for offline use
   - Regenerate for fresh variations

### AI Prompt Engineering

The app uses carefully crafted prompts for GPT-4:

```
You are a certified AI fitness coach with 15+ years of experience.
Generate a comprehensive, personalized 7-day fitness and nutrition plan.

User Profile:
- Name: {name}, Age: {age}, Gender: {gender}
- Weight: {weight}kg, Height: {height}cm
- Goal: {goal}, Level: {level}
- Location: {location}, Diet: {diet}

Return ONLY valid JSON with:
1. 7-Day Workout Plan (exercises, sets, reps, rest)
2. 7-Day Meal Plan (calories, macros, meals, recipes)
3. Motivational Tips (5-7 personalized tips)
```

## 🛠️ Development Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run check       # TypeScript type checking
```

## 🎨 Customization

### Theme
The app uses Tailwind CSS with Shadcn UI. Customize colors in `client/src/index.css`:

```css
@layer base {
  :root {
    --primary: 220 13% 91%;
    --secondary: 210 40% 96.1%;
    /* ... more theme variables */
  }
}
```

### AI Models
Change AI models in `server/services/ai.ts`:
- GPT-4 Turbo for plan generation
- DALL-E 3 for images
- TTS-1 for voice

## 📊 Features Breakdown

| Feature | Implementation | Status |
|---------|---------------|--------|
| AI Plan Generation | GPT-4 Turbo | ✅ Complete |
| Voice Assistant | OpenAI TTS | ✅ Complete |
| Image Generation | DALL-E 3 | ✅ Complete |
| PDF Export | jsPDF | ✅ Complete |
| Dark Mode | next-themes | ✅ Complete |
| Animations | Framer Motion | ✅ Complete |
| Responsive Design | Tailwind CSS | ✅ Complete |
| Form Validation | Zod + React Hook Form | ✅ Complete |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI**: [OpenAI](https://openai.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next-gen AI technologies**
