import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_fitness_athlete_jumping_5ae27b5e.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-display tracking-tight">
            AI FITNESS COACH
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" data-testid="button-signin">
              Sign In
            </Button>
            <Button data-testid="button-getstarted-header">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-white mb-6">
              Transform Your Fitness Journey
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium">
              AI-powered personalized workout plans, nutrition guidance, and
              24/7 coaching tailored to your goals
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="default"
                className="text-lg h-14 px-8"
                data-testid="button-start-journey"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
                data-testid="button-how-it-works"
              >
                How It Works
              </Button>
            </div>
            <p className="mt-8 text-white/80 text-sm">
              Join 10,000+ members transforming their fitness
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-display text-center uppercase mb-12">
            Why Choose AI Fitness Coach
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Personalized Plans</h4>
              <p className="text-muted-foreground">
                AI-generated workouts and meal plans tailored to your specific
                goals and fitness level
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Smart Coaching</h4>
              <p className="text-muted-foreground">
                24/7 AI coach available to answer questions and provide guidance
                during your workouts
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Track Progress</h4>
              <p className="text-muted-foreground">
                Comprehensive tracking and analytics to monitor your fitness
                journey and celebrate wins
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
