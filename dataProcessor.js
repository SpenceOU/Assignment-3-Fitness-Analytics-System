require("dotenv").config({ path: "./.env" });

const { workoutCalculator } = require("./workoutReader");
const { healthMetricsCounter } = require("./healthReader");

async function processFiles() {
  const userName = process.env.USER_NAME || "User";
  const weeklyGoal = Number(process.env.WEEKLY_GOAL || 0);

  try {
    console.log(`Processing data for: ${userName}`);

    console.log("📁 Reading workout data...");
    const workout = await workoutCalculator("./data/workouts.csv");
    console.log(`Total workouts: ${workout.totalWorkouts}`);
    console.log(`Total minutes: ${workout.totalMinutes}`);

    console.log("📁 Reading health data...");
    const health = await healthMetricsCounter("./data/health-metrics.json");
    console.log(`Total health entries: ${health.count}`);

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workout.totalWorkouts}`);
    console.log(`Total workout minutes: ${workout.totalMinutes}`);
    console.log(`Health entries found: ${health.count}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    if (workout.totalMinutes >= weeklyGoal) {
      console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else {
      console.log(`Keep going ${userName}! You need ${weeklyGoal - workout.totalMinutes} more minutes.`);
    }

  } catch (err) {
    console.error("Error:", err.message);
  }
}

processFiles();
