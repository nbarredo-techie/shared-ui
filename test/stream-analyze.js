const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "build-stats.json");

console.log("Starting analysis of build-stats.json...");

// First, let's get basic file info
fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error("Error reading file stats:", err);
    return;
  }

  console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Last modified: ${stats.mtime}`);
});

// Try to read the file in chunks to understand its structure
const stream = fs.createReadStream(filePath, { encoding: "utf8" });
let buffer = "";
let bracketCount = 0;
let inString = false;
let escaped = false;
let firstChunk = true;
let sampleData = "";

stream.on("data", (chunk) => {
  if (firstChunk) {
    console.log("\nFirst 1000 characters:");
    console.log(chunk.substring(0, 1000));
    console.log("\n...\n");
    firstChunk = false;

    // Try to identify the JSON structure
    const trimmed = chunk.trim();
    if (trimmed.startsWith("{")) {
      console.log("JSON appears to be an object");
    } else if (trimmed.startsWith("[")) {
      console.log("JSON appears to be an array");
    }
  }

  buffer += chunk;

  // Keep only the last 10000 characters to manage memory
  if (buffer.length > 10000) {
    buffer = buffer.substring(buffer.length - 5000);
  }
});

stream.on("end", () => {
  console.log("\nLast 1000 characters:");
  console.log(buffer.substring(Math.max(0, buffer.length - 1000)));

  // Try to parse a small portion
  console.log("\nAttempting to identify JSON structure...");

  // Read just the beginning to understand the structure
  const readStream = fs.createReadStream(filePath, {
    encoding: "utf8",
    start: 0,
    end: 50000, // First 50KB
  });

  let initialData = "";
  readStream.on("data", (chunk) => {
    initialData += chunk;
  });

  readStream.on("end", () => {
    try {
      // Try to find the main structure
      const lines = initialData.split("\n");
      console.log("\nFirst 20 lines:");
      lines.slice(0, 20).forEach((line, i) => {
        console.log(`${i + 1}: ${line}`);
      });

      // Look for key patterns
      if (initialData.includes('"modules"')) {
        console.log('\nFound "modules" - likely webpack bundle stats');
      }
      if (initialData.includes('"chunks"')) {
        console.log('Found "chunks" - webpack chunk information');
      }
      if (initialData.includes('"assets"')) {
        console.log('Found "assets" - webpack asset information');
      }
      if (initialData.includes('"entrypoints"')) {
        console.log('Found "entrypoints" - webpack entry points');
      }
    } catch (error) {
      console.error("Error analyzing initial data:", error);
    }
  });
});

stream.on("error", (err) => {
  console.error("Error reading file:", err);
});
