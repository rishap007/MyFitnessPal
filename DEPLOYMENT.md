# 🚀 Deployment Guide - AI Fitness Coach

This guide walks you through deploying the AI Fitness Coach application to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. ✅ An OpenAI API account with billing enabled ([platform.openai.com](https://platform.openai.com))
2. ✅ A Vercel account ([vercel.com](https://vercel.com))
3. ✅ Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
4. ✅ Node.js 18+ installed locally for testing

## Step 1: Get Your OpenAI API Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a name (e.g., "AI Fitness Coach Production")
4. **Copy the key immediately** - you won't be able to see it again!
5. Store it securely

### OpenAI API Usage & Costs

This app uses:
- **GPT-4 Turbo** for plan generation (~$0.10 per plan)
- **DALL-E 3** for images (~$0.04 per image)
- **TTS-1** for voice (~$0.015 per 1000 characters)

**Estimated cost per user**: $0.15 - $0.50 depending on features used

💡 **Tip**: Set usage limits in your OpenAI dashboard to control costs.

## Step 2: Test Locally First

Before deploying, test the build process:

```bash
# Install dependencies
npm install

# Create .env file with your OpenAI key
echo "OPENAI_API_KEY=sk-your-key-here" > .env
echo "NODE_ENV=production" >> .env

# Run TypeScript checks
npm run check

# Build the project
npm run build

# Test the production build
npm start
```

Visit `http://localhost:5000` and test:
- Complete onboarding flow
- Generate a plan
- Test image generation (click an exercise)
- Test voice reading
- Export PDF

If everything works locally, you're ready to deploy!

## Step 3: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git repository
   - Vercel will auto-detect the framework

3. **Configure Build Settings**

   Vercel should auto-detect, but verify:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

4. **Add Environment Variables**

   Before deploying, click "Environment Variables" and add:

   ```
   OPENAI_API_KEY = sk-your-actual-openai-key-here
   NODE_ENV = production
   ```

   ⚠️ **Important**: Make sure to add these for all environments (Production, Preview, Development)

5. **Deploy**

   Click "Deploy" and wait for the build to complete (usually 2-3 minutes)

### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment
   vercel

   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? Your account
   # - Link to existing project? No
   # - Project name? ai-fitness-coach (or your choice)
   # - In which directory is your code? ./
   # - Want to override settings? No
   ```

4. **Add Environment Variables**
   ```bash
   # Add OpenAI key
   vercel env add OPENAI_API_KEY
   # Paste your key when prompted
   # Select all environments

   # Add NODE_ENV
   vercel env add NODE_ENV
   # Enter: production
   # Select all environments
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 4: Verify Deployment

After deployment, Vercel will provide a URL like: `https://your-app.vercel.app`

### Testing Checklist

Visit your deployed site and test:

- [ ] Landing page loads correctly
- [ ] Dark/light mode toggle works
- [ ] Navigation links work
- [ ] Onboarding form accepts all inputs
- [ ] Form validation works
- [ ] "Generate My Plan" button triggers API call
- [ ] Plan page displays generated content
- [ ] Motivational quote appears
- [ ] Workout accordion expands/collapses
- [ ] Meal plan accordion expands/collapses
- [ ] Image generation works (click image icon)
- [ ] Voice reading works (click voice button)
- [ ] PDF export works
- [ ] Regenerate plan works
- [ ] Responsive design works on mobile

## Step 5: Domain Setup (Optional)

### Add Custom Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `fitness-ai.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic, ~1 minute)

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Solution: Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "TypeScript compilation failed"**
```bash
# Solution: Run locally first
npm run check
# Fix any TypeScript errors
```

### Runtime Errors

**Error: "OpenAI API key not found"**
- Check that `OPENAI_API_KEY` is set in Vercel environment variables
- Redeploy after adding the key

**Error: "Failed to generate plan"**
- Check OpenAI API key is valid and has billing enabled
- Check OpenAI account has sufficient credits
- Check API usage limits

**Error: "CORS errors"**
- This shouldn't happen with our setup, but if it does:
- Check that API routes are under `/api/` path
- Verify Vercel routing in `vercel.json`

### Performance Issues

**Plan generation is slow**
- GPT-4 can take 10-30 seconds, this is normal
- Consider adding a more detailed loading state
- Could switch to GPT-3.5-turbo for faster (but less quality) responses

**Image generation is slow**
- DALL-E 3 takes 10-20 seconds per image, this is normal
- Images are cached once generated
- Consider using a faster model or pre-generated images

## Monitoring & Maintenance

### Check Logs

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click on any deployment
5. View "Functions" tab for API logs

### Monitor Costs

1. Go to [platform.openai.com/usage](https://platform.openai.com/usage)
2. Set up usage alerts
3. Monitor daily/monthly spend

### Set Usage Limits

To prevent unexpected costs:

1. Go to OpenAI → Settings → Limits
2. Set "Hard limit" (e.g., $50/month)
3. Set "Soft limit" (e.g., $30/month for email alerts)

## Scaling Considerations

### For Production Use

If deploying for real users, consider:

1. **Database Integration**
   - Currently uses in-memory storage
   - Add PostgreSQL/Supabase for persistence
   - Already configured in schema, just need to connect

2. **User Authentication**
   - Add proper auth (Clerk, Auth0, or NextAuth)
   - Protect API routes
   - Associate plans with user accounts

3. **Rate Limiting**
   - Add rate limiting to prevent abuse
   - Use Vercel's edge config or Upstash

4. **Caching**
   - Cache generated images (use Vercel Blob or Cloudinary)
   - Cache plans in database
   - Reduce API costs

5. **Analytics**
   - Add Vercel Analytics
   - Track user behavior
   - Monitor conversion rates

6. **Error Tracking**
   - Add Sentry or LogRocket
   - Monitor API failures
   - Track user issues

## Environment Variables Reference

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `OPENAI_API_KEY` | ✅ Yes | AI features | `sk-proj-abc123...` |
| `NODE_ENV` | Recommended | Environment flag | `production` |
| `DATABASE_URL` | No | PostgreSQL DB | `postgresql://user:pass@host/db` |
| `ANTHROPIC_API_KEY` | No | Alternative AI | `sk-ant-...` |
| `ELEVENLABS_API_KEY` | No | Alternative voice | `el-...` |

## Continuous Deployment

Once set up, any push to your main branch will trigger automatic deployment:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys!
# Get notification in email/Slack
```

## Rollback

If a deployment has issues:

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find the last working deployment
4. Click "..." → "Promote to Production"

## Support

- **Vercel Issues**: [vercel.com/support](https://vercel.com/support)
- **OpenAI Issues**: [help.openai.com](https://help.openai.com)
- **Project Issues**: Open a GitHub issue

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Run production build locally
npm start

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Add environment variable
vercel env add VARIABLE_NAME

# List deployments
vercel ls
```

---

**You're all set! 🎉**

Your AI Fitness Coach app should now be live and generating personalized fitness plans for users worldwide!
