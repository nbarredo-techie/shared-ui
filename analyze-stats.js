const fs = require("fs");
const path = require("path");

console.log("Starting analysis of build-stats.json...");

try {
  // Read and parse the JSON file
  const statsPath = path.join(__dirname, "build-stats.json");
  console.log("Reading file:", statsPath);

  const statsContent = fs.readFileSync(statsPath, "utf8");
  console.log(
    "File size:",
    Math.round((statsContent.length / 1024 / 1024) * 100) / 100,
    "MB"
  );

  console.log("Parsing JSON...");
  const stats = JSON.parse(statsContent);

  console.log("\n=== WEBPACK BUILD STATS ANALYSIS ===\n");

  // Basic info
  console.log("Webpack Version:", stats.version || "Unknown");
  console.log("Build Time:", stats.time ? `${stats.time}ms` : "Unknown");
  console.log(
    "Built At:",
    stats.builtAt ? new Date(stats.builtAt).toISOString() : "Unknown"
  );

  // Assets analysis
  if (stats.assets && Array.isArray(stats.assets)) {
    console.log("\n=== ASSETS ANALYSIS ===");
    console.log("Total Assets:", stats.assets.length);

    // Sort by size
    const sortedAssets = stats.assets
      .filter((asset) => asset.size)
      .sort((a, b) => b.size - a.size)
      .slice(0, 20); // Top 20 largest assets

    console.log("\nTop 20 Largest Assets:");
    sortedAssets.forEach((asset, index) => {
      const sizeKB = Math.round((asset.size / 1024) * 100) / 100;
      const sizeMB = Math.round((asset.size / 1024 / 1024) * 100) / 100;
      const sizeDisplay = sizeMB > 1 ? `${sizeMB}MB` : `${sizeKB}KB`;
      console.log(`${index + 1}. ${asset.name} - ${sizeDisplay}`);
    });

    // Total bundle size
    const totalSize = stats.assets.reduce(
      (sum, asset) => sum + (asset.size || 0),
      0
    );
    const totalSizeMB = Math.round((totalSize / 1024 / 1024) * 100) / 100;
    console.log(`\nTotal Bundle Size: ${totalSizeMB}MB`);
  }

  // Modules analysis
  if (stats.modules && Array.isArray(stats.modules)) {
    console.log("\n=== MODULES ANALYSIS ===");
    console.log("Total Modules:", stats.modules.length);

    // Sort modules by size
    const sortedModules = stats.modules
      .filter((module) => module.size)
      .sort((a, b) => b.size - a.size)
      .slice(0, 20);

    console.log("\nTop 20 Largest Modules:");
    sortedModules.forEach((module, index) => {
      const sizeKB = Math.round((module.size / 1024) * 100) / 100;
      const name = module.name || module.identifier || "Unknown module";
      // Truncate long names
      const displayName =
        name.length > 80 ? name.substring(0, 80) + "..." : name;
      console.log(`${index + 1}. ${displayName} - ${sizeKB}KB`);
    });

    // Module types analysis
    const moduleTypes = {};
    stats.modules.forEach((module) => {
      const name = module.name || module.identifier || "";
      if (name.includes("node_modules")) {
        const match = name.match(/node_modules\/([^\/]+)/);
        if (match) {
          const packageName = match[1];
          moduleTypes[packageName] =
            (moduleTypes[packageName] || 0) + (module.size || 0);
        }
      }
    });

    const topPackages = Object.entries(moduleTypes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15);

    if (topPackages.length > 0) {
      console.log("\nTop 15 Largest NPM Packages:");
      topPackages.forEach(([packageName, size], index) => {
        const sizeKB = Math.round((size / 1024) * 100) / 100;
        const sizeMB = Math.round((size / 1024 / 1024) * 100) / 100;
        const sizeDisplay = sizeMB > 1 ? `${sizeMB}MB` : `${sizeKB}KB`;
        console.log(`${index + 1}. ${packageName} - ${sizeDisplay}`);
      });
    }
  }

  // Chunks analysis
  if (stats.chunks && Array.isArray(stats.chunks)) {
    console.log("\n=== CHUNKS ANALYSIS ===");
    console.log("Total Chunks:", stats.chunks.length);

    const sortedChunks = stats.chunks
      .filter((chunk) => chunk.size)
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    console.log("\nTop 10 Largest Chunks:");
    sortedChunks.forEach((chunk, index) => {
      const sizeKB = Math.round((chunk.size / 1024) * 100) / 100;
      const sizeMB = Math.round((chunk.size / 1024 / 1024) * 100) / 100;
      const sizeDisplay = sizeMB > 1 ? `${sizeMB}MB` : `${sizeKB}KB`;
      const names =
        chunk.names && chunk.names.length > 0
          ? chunk.names.join(", ")
          : `Chunk ${chunk.id}`;
      console.log(`${index + 1}. ${names} - ${sizeDisplay}`);
    });
  }

  // Errors and warnings
  console.log("\n=== BUILD STATUS ===");
  console.log("Errors:", stats.errorsCount || 0);
  console.log("Warnings:", stats.warningsCount || 0);

  if (stats.errors && stats.errors.length > 0) {
    console.log("\nErrors:");
    stats.errors.slice(0, 5).forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  if (stats.warnings && stats.warnings.length > 0) {
    console.log("\nWarnings:");
    stats.warnings.slice(0, 5).forEach((warning, index) => {
      console.log(`${index + 1}. ${warning}`);
    });
  }

  console.log("\n=== OPTIMIZATION RECOMMENDATIONS ===");
  console.log(
    "1. Check the largest assets and modules above for optimization opportunities"
  );
  console.log("2. Consider code splitting for large chunks");
  console.log(
    "3. Review NPM packages - consider lighter alternatives for the largest ones"
  );
  console.log("4. Use webpack-bundle-analyzer for visual analysis");
  console.log("5. Consider dynamic imports for non-critical modules");
} catch (error) {
  console.error("Error analyzing build stats:", error.message);
  if (error.message.includes("JSON")) {
    console.error("The file might be corrupted or not valid JSON");
  }
}
