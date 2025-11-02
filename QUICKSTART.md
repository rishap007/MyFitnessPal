# ⚡ Quick Start Guide

Get your AI Fitness Coach app running in 5 minutes!

## 1️⃣ Get OpenAI API Key (2 minutes)

1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. **Copy and save the key** (starts with `sk-`)

💡 **Note**: You'll need billing enabled. Add a payment method in settings if you haven't already.

## 2️⃣ Clone & Install (1 minute)

```bash
# Clone the repo
cd NextStackAiTool

# Install dependencies
npm install
```

## 3️⃣ Configure Environment (30 seconds)

Create a `.env` file in the root directory:

```bash
# On Windows (PowerShell):
echo OPENAI_API_KEY=sk-your-key-here > .env
echo NODE_ENV=development >> .env

# On Mac/Linux:
cat > .env << EOL
OPENAI_API_KEY=sk-your-key-here
NODE_ENV=development
EOL
```

Replace `sk-your-key-here` with your actual OpenAI API key!

## 4️⃣ Run the App (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:5000**

## 5️⃣ Test It Out! (1 minute)

1. Click **"Get Started"** on the landing page
2. Fill out the onboarding form:
   - Name: Your Name
   - Email: test@example.com
   - Age: 25
   - Gender: Male/Female
   - Height: 175 cm
   - Weight: 70 kg
   - Fitness Goal: Muscle Gain
   - Fitness Level: Intermediate
   - Dietary Preference: No Preference
   - Workout Location: Gym
3. Click **"Generate My Plan"**
4. Wait 10-30 seconds for AI to generate your plan
5. Explore the features:
   - Click the **image icon** next to any exercise → AI generates a demo image
   - Click **"Read Aloud"** → AI voice reads the workout
   - Click **"Export PDF"** → Download your plan
   - Click **"Regenerate"** → Get a fresh plan variation

## 🎉 You're Done!

That's it! You now have a fully functional AI Fitness Coach app running locally.

---

## What You Just Built

✅ **AI-Powered Plan Generation** - GPT-4 creates personalized workout & meal plans
✅ **Voice Assistant** - OpenAI TTS reads your plan aloud
✅ **AI Image Generation** - DALL-E 3 creates exercise & meal demonstrations
✅ **PDF Export** - Download your plan
✅ **Dark/Light Mode** - Beautiful themed UI
✅ **Smooth Animations** - Framer Motion throughout
✅ **Responsive Design** - Works on all devices

---

## Next Steps

### Deploy to Production
Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to deploy to Vercel in 10 minutes.

### Customize
- Edit themes in `client/src/index.css`
- Modify AI prompts in `server/services/ai.ts`
- Add your branding in `client/src/pages/landing.tsx`

### Add Features
Some ideas:
- User authentication (Clerk, Auth0)
- Database persistence (Supabase, PostgreSQL)
- Progress tracking and analytics
- Social sharing
- Stripe payment integration
- Mobile app (React Native)

---

## Troubleshooting

### "OpenAI API key not found"
- Check your `.env` file exists in the root directory
- Verify the key starts with `sk-`
- Restart the dev server after adding `.env`

### "Failed to generate plan"
- Check OpenAI API key is valid
- Ensure billing is enabled on your OpenAI account
- Check you have available credits ($5 minimum recommended)

### Build errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Use a different port
PORT=3000 npm run dev
```

---

## Cost Estimate

Approximate costs per user interaction:

- **Generate Plan**: ~$0.10 (GPT-4 Turbo)
- **Generate Exercise Image**: ~$0.04 (DALL-E 3)
- **Generate Meal Image**: ~$0.04 (DALL-E 3)
- **Voice Reading**: ~$0.01 (TTS-1)
- **Motivational Quote**: ~$0.001 (GPT-3.5)

**Total per user**: $0.15 - $0.50 depending on features used

💡 **Tip**: Set usage limits in OpenAI dashboard to control costs!

---

## Support

Need help? Check:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- GitHub Issues - Report bugs

---

**Happy Coaching! 💪**
