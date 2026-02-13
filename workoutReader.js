const fs = require("fs");
const csv = require("csv-parser");

function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    fs.createReadStream(filePath)
      .on("error", () => {
        reject(new Error(`Workout file not found: ${filePath}`));
      })
      .pipe(csv())
      .on("data", (row) => workouts.push(row))
      .on("end", () => {
        const totalWorkouts = workouts.length;

        let totalMinutes = 0;
        for (let i = 0; i < workouts.length; i++) {
const mins = Number(workouts[i].duration);

          if (!Number.isNaN(mins)) totalMinutes += mins;
        }

        resolve({ totalWorkouts, totalMinutes, workouts });
      });
  });
}

module.exports = { workoutCalculator };
