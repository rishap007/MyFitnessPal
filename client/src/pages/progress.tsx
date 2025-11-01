import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Target, Flame, TrendingUp } from "lucide-react";

const weightData = [
  { week: "Week 1", weight: 75 },
  { week: "Week 2", weight: 74.5 },
  { week: "Week 3", weight: 74 },
  { week: "Week 4", weight: 73.5 },
  { week: "Week 5", weight: 73 },
  { week: "Week 6", weight: 72.8 },
];

const workoutData = [
  { day: "Mon", workouts: 1 },
  { day: "Tue", workouts: 1 },
  { day: "Wed", workouts: 0 },
  { day: "Thu", workouts: 1 },
  { day: "Fri", workouts: 1 },
  { day: "Sat", workouts: 1 },
  { day: "Sun", workouts: 0 },
];

const achievements = [
  { name: "First Workout", description: "Complete your first workout", unlocked: true },
  { name: "7-Day Streak", description: "Work out 7 days in a row", unlocked: true },
  { name: "Strong Start", description: "Complete 10 workouts", unlocked: true },
  { name: "Consistency King", description: "30-day workout streak", unlocked: false },
  { name: "Century", description: "Complete 100 workouts", unlocked: false },
  { name: "Transformation", description: "Reach your goal weight", unlocked: false },
];

export default function Progress() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-display uppercase mb-2">
          Your Progress
        </h1>
        <p className="text-muted-foreground">
          Track your fitness journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Current Weight", value: "72.8 kg", icon: Target, change: "-2.2 kg" },
          { label: "Goal Weight", value: "70 kg", icon: Target, change: "2.8 kg to go" },
          { label: "Total Workouts", value: "48", icon: TrendingUp, change: "+12 this month" },
          { label: "Calories Burned", value: "12.5k", icon: Flame, change: "This month" },
        ].map((stat, index) => (
          <Card key={index} className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" domain={[70, 76]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Workout Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar
                  dataKey="workouts"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Achievements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-md border ${
                  achievement.unlocked
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/20 border-border opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      achievement.unlocked ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Trophy
                      className={`h-5 w-5 ${
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="mt-2">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Workouts (5/5)</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <ProgressBar value={100} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Calories Burned (2,800/3,000)</span>
              <span className="text-sm text-muted-foreground">93%</span>
            </div>
            <ProgressBar value={93} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Meal Logging (6/7 days)</span>
              <span className="text-sm text-muted-foreground">86%</span>
            </div>
            <ProgressBar value={86} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
