import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Target, TrendingUp, Sparkles, Brain, Image, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
            <Link href="/dashboard">
              <Button variant="ghost" data-testid="button-signin">
                Sign In
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button data-testid="button-getstarted-header">
                Get Started
              </Button>
            </Link>
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-white mb-6"
            >
              Transform Your Fitness Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/90 mb-8 font-medium"
            >
              AI-powered personalized workout plans, nutrition guidance, and
              24/7 coaching tailored to your goals
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="default"
                  className="text-lg h-14 px-8 hover:scale-105 transition-transform"
                  data-testid="button-start-journey"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
                  data-testid="button-how-it-works"
                >
                  How It Works
                </Button>
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-white/80 text-sm"
            >
              Join 10,000+ members transforming their fitness
            </motion.p>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display text-center uppercase mb-12"
          >
            Why Choose AI Fitness Coach
          </motion.h3>
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

      {/* Advanced Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display text-center uppercase mb-12"
          >
            Powered by Advanced AI Technology
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">GPT-4 Powered Plans</h4>
                  <p className="text-sm text-muted-foreground">
                    Personalized workout and meal plans generated by advanced AI
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Image className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">AI Image Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Visual demonstrations for every exercise and meal
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Volume2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Voice Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    AI voice reads your plans aloud during workouts
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Daily Motivation</h4>
                  <p className="text-sm text-muted-foreground">
                    AI-generated motivational quotes to keep you inspired
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display uppercase mb-6"
          >
            Ready to Transform Your Body?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 opacity-90"
          >
            Get your personalized AI-generated fitness plan in minutes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg h-14 px-12 hover:scale-105 transition-transform"
              >
                Start Free Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
