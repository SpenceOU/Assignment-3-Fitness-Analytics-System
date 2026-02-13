const fs = require("fs").promises;

async function healthMetricsCounter(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    // Your JSON structure: { user: "...", metrics: [ ... ] }
    const metrics = Array.isArray(parsed.metrics) ? parsed.metrics : [];
    const count = metrics.length;

    return {
      count,
      data: metrics,
    };
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`Health data file not found: ${filePath}`);
    }
    if (err instanceof SyntaxError) {
      throw new Error(`Invalid JSON in health data file: ${filePath}`);
    }
    throw new Error(`Error reading health data: ${err.message}`);
  }
}

module.exports = { healthMetricsCounter };
