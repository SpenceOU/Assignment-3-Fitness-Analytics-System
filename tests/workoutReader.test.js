const path = require("path");
const { workoutCalculator } = require("../workoutReader");

test("workoutCalculator reads workouts.csv and returns totals", async () => {
  const filePath = path.join(__dirname, "..", "data", "workouts.csv");
  const result = await workoutCalculator(filePath);

  expect(result.totalWorkouts).toBeGreaterThan(0);
  expect(result.totalMinutes).toBeGreaterThan(0);
  expect(Array.isArray(result.workouts)).toBe(true);
});

test("workoutCalculator throws when file is missing", async () => {
  await expect(workoutCalculator("./data/not-real.csv")).rejects.toThrow(
    "Workout file not found"
  );
});
