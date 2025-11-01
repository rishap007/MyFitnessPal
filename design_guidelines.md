# AI Fitness Coach Web App - Design Guidelines

## Design Approach

**Reference-Based Hybrid:** Drawing inspiration from Nike Training Club's motivational energy, Peloton's premium feel, and Apple Fitness+'s clarity. This fitness app demands both utility (data tracking, forms) and emotional engagement (motivation, energy).

**Core Principle:** Energize users while maintaining clarity and functionality across all touchpoints.

## Typography System

**Primary Font:** Inter or Manrope (Google Fonts via CDN) - clean, modern sans-serif
- Headings: 700-800 weight for motivational impact
- Body: 400-500 weight for readability
- Data/Stats: 600 weight, tabular numbers for metrics

**Secondary Font:** Bebas Neue or Oswald - compressed sans for high-energy headings and hero statements

**Hierarchy:**
- Hero Headlines: 4xl-6xl, uppercase, secondary font, tight tracking
- Section Headers: 3xl-4xl, primary font bold
- Card Titles: xl-2xl, semibold
- Body Text: base-lg, regular weight
- Micro-copy/Labels: sm-base, medium weight, uppercase for labels

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm

**Container Strategy:**
- Hero sections: Full-width with inner max-w-7xl
- Dashboard/Content: max-w-6xl
- Forms: max-w-2xl centered
- Chat interface: max-w-4xl

**Grid Systems:**
- Workout/Meal cards: 1 column mobile, 2-3 columns tablet/desktop
- Dashboard metrics: 2-4 column stat grid
- Exercise library: Masonry-style 2-3 columns

## Component Library

### Navigation
**Top Navigation:** Fixed header with blur backdrop, logo left, primary CTA right, navigation links centered. Include quick access to chat and progress icons.

### Hero Section (Landing Page)
**Layout:** Full-screen (90vh) split design - left side bold typography with CTA, right side high-energy fitness imagery (person mid-workout, dynamic pose). Overlay gradient from bottom for text legibility.

**Content:**
- Main headline using secondary font, uppercase
- Subheadline explaining AI-powered personalization
- Primary CTA: "Start Your Journey" (large, prominent)
- Secondary CTA: "How It Works" (outline style)
- Trust indicators: "Join 10,000+ members transforming their fitness"

### Onboarding Flow
**Multi-step Form Design:**
- Progress indicator at top showing steps (Profile → Goals → Preferences → Location)
- Large form fields with generous padding (p-4)
- Step content centered in max-w-2xl container
- Single column layout for focus
- Animated transitions between steps (slide)
- Visual icons representing each input category
- Sticky footer with "Back" and "Continue" navigation

**Input Components:**
- Text fields: Large (h-14), rounded corners, subtle border
- Dropdowns/Select: Card-style selection (visual icons for fitness goals)
- Radio buttons: Large clickable cards for fitness level/location
- Range sliders: For height/weight with live value display

### Dashboard (Main Hub)
**Layout:** Sidebar navigation (fixed left, 16-20 units wide) with main content area

**Sidebar Elements:**
- Profile summary at top with avatar
- Navigation items: Dashboard, Workout Plan, Meal Plan, Chat, Exercise Library, Progress
- Active state: Bold with accent indicator bar
- Voice assistant toggle at bottom

**Dashboard Content Grid:**
- Top row: Welcome message with user name, current week highlight
- Stat cards row: 4-column grid (workouts completed, calories burned, streak days, next workout)
- Today's workout preview card (large, prominent)
- Today's meals preview card
- Recent activity timeline
- Quick action buttons

### Workout Plan View
**7-Day Calendar Layout:**
- Horizontal scrollable week view at top
- Large day cards showing exercises for selected day
- Each exercise card includes: name, sets/reps, rest time, difficulty indicator
- Completion checkboxes
- "Start Workout" primary button
- Video/GIF placeholders for exercise demonstrations

### Meal Plan View
**Daily Meal Structure:**
- Calorie target progress ring at top
- Meal cards (Breakfast, Lunch, Dinner, Snacks) in vertical layout
- Each meal card: meal name, calorie count, macro breakdown (protein/carbs/fats), ingredient list
- Recipe expansion on click
- Shopping list generation button

### AI Chat Interface
**Full-height Panel Design:**
- Messages container with alternating alignment (user right, AI left)
- User messages: Rounded bubbles, aligned right
- AI messages: Rounded bubbles, aligned left, avatar icon
- Input area: Sticky bottom with text field and voice record button
- Voice recording: Animated waveform during capture
- Suggested prompts displayed when empty ("How do I do squats properly?", "Adjust my meal plan")

### Exercise Library
**Filterable Grid:**
- Filter bar: Category tags (Strength, Cardio, Flexibility, Core)
- Search bar for quick lookup
- Exercise cards: Large image/video preview, exercise name, difficulty badge, muscle groups
- Modal on click: Full instructions, form tips, common mistakes, video demo

### Progress Tracking
**Visual Dashboard:**
- Line charts for weight/measurements over time
- Bar charts for workout frequency
- Circular progress indicators for weekly goals
- Before/after photo upload capability
- Milestone achievements section with badges

## Icons & Assets

**Icon Library:** Heroicons via CDN for consistent UI icons

**Custom Fitness Icons Needed:**
- Workout types: `<!-- CUSTOM ICON: dumbbell, running shoe, yoga mat -->`
- Body metrics: `<!-- CUSTOM ICON: measuring tape, scale, muscle -->`
- Nutrition: `<!-- CUSTOM ICON: plate, apple, water bottle -->`

## Images

**Hero Image:** Dynamic fitness photo - person in athletic motion (jumping, lifting, running) with natural lighting, diverse representation. Image should occupy 50% of viewport width on desktop, full-width background on mobile with gradient overlay.

**Dashboard Illustrations:** Abstract fitness-themed graphics for empty states and motivational sections.

**Exercise Library:** High-quality demonstration photos/videos for each exercise showing proper form.

**Profile Section:** User avatar upload capability with placeholder fitness-themed icon.

## Animations

**Minimal, Purposeful Motion:**
- Form step transitions: Smooth slide (300ms)
- Card hover: Subtle lift with shadow increase
- Stat counters: Animate numbers on first load
- Voice recording: Pulsing animation
- Progress indicators: Smooth fill animations
- Page transitions: Fade (200ms)

## Accessibility

- All form inputs with proper labels and ARIA attributes
- Keyboard navigation throughout entire app
- Focus indicators on all interactive elements
- Color contrast minimum 4.5:1 for text
- Screen reader-friendly progress announcements
- Voice controls clearly indicated and accessible

## Responsive Behavior

**Mobile-First Approach:**
- Sidebar navigation becomes bottom tab bar on mobile
- Multi-column grids stack to single column below md breakpoint
- Hero section switches to stacked layout (typography over image)
- Chat interface optimized for mobile with larger touch targets
- Dashboard cards stack vertically with full width

**Breakpoints:**
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px-1024px (2-column grids, condensed sidebar)
- Desktop: > 1024px (full multi-column, sidebar navigation)

## Special Interactions

**Voice Integration Indicator:** Floating button (bottom-right on desktop, integrated in chat on mobile) with microphone icon, pulsing when listening, waveform visualization during speech.

**Workout Active State:** When workout session active, minimize navigation to timer bar at top with current exercise, rest countdown, skip/complete buttons.

**Gamification Elements:** Badge unlocks with celebratory micro-animations, streak counters with flame icons, progress milestones with visual rewards.