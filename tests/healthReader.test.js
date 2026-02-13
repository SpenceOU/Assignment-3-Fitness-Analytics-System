const path = require("path");
const { healthMetricsCounter } = require("../healthReader");

describe("healthMetricsCounter", () => {
  test("reads valid JSON and returns the correct count", async () => {
    const filePath = path.join(__dirname, "..", "data", "health-metrics.json");
    const result = await healthMetricsCounter(filePath);

    expect(result).toHaveProperty("count");
    expect(result).toHaveProperty("data");
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.count).toBe(result.data.length);
    expect(result.count).toBeGreaterThan(0);
  });

  test("throws an error when the file is missing", async () => {
    await expect(
      healthMetricsCounter("./data/not-real.json")
    ).rejects.toThrow("Health data file not found");
  });
});
