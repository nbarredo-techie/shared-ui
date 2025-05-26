// Quick verification script to check bundle externalization for shared-ui
const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "dist", "terraboost-shared-ui.js");

try {
  const bundleContent = fs.readFileSync(bundlePath, "utf8");

  console.log("🔍 Shared-UI Bundle Analysis:");
  console.log(
    `📦 Bundle Size: ${(fs.statSync(bundlePath).size / 1024).toFixed(2)} KB`
  );

  // Check for external imports (ES module format)
  const hasReactExternal =
    bundleContent.includes('from"react"') ||
    bundleContent.includes("from 'react'") ||
    bundleContent.includes("from react");
  const hasReactDOMExternal =
    bundleContent.includes('from"react-dom') ||
    bundleContent.includes("from 'react-dom") ||
    bundleContent.includes("from react-dom");
  const hasJSXRuntime =
    bundleContent.includes('from"react/jsx-runtime"') ||
    bundleContent.includes("from 'react/jsx-runtime'");

  console.log("\n🔗 External Dependencies:");
  console.log(`✅ React externalized: ${hasReactExternal ? "YES" : "NO"}`);
  console.log(
    `✅ ReactDOM externalized: ${hasReactDOMExternal ? "YES" : "NO"}`
  );
  console.log(`✅ JSX Runtime externalized: ${hasJSXRuntime ? "YES" : "NO"}`);

  // Check if React code is bundled (bad sign if bundle is large and contains React internals)
  const hasCreateElement = bundleContent.includes("createElement");
  const hasReactInternals =
    bundleContent.includes("ReactCurrentOwner") ||
    bundleContent.includes(
      "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED"
    );
  const hasReactFiber =
    bundleContent.includes("FiberNode") ||
    bundleContent.includes("ReactFiberWorkLoop");

  console.log(`\n🔍 React Code Analysis:`);
  console.log(`❌ Contains createElement: ${hasCreateElement ? "YES" : "NO"}`);
  console.log(
    `❌ Contains React internals: ${
      hasReactInternals ? "YES (PROBLEM!)" : "NO"
    }`
  );
  console.log(
    `❌ Contains React Fiber: ${hasReactFiber ? "YES (PROBLEM!)" : "NO"}`
  );

  // Size analysis
  if (fs.statSync(bundlePath).size > 50000) {
    console.log(
      "\n⚠️  Bundle is suspiciously large (>50KB) - may contain bundled React"
    );
  }

  if (!hasReactInternals && !hasReactFiber && hasReactExternal) {
    console.log("\n🎉 Shared-UI Externalization: SUCCESS!");
  } else {
    console.log(
      "\n❌ Shared-UI may be bundling React internally - this could cause conflicts!"
    );
  }

  // Show first few lines to see module format
  console.log("\n📝 Bundle Format (first 200 chars):");
  console.log(bundleContent.substring(0, 200) + "...");
} catch (error) {
  console.error("❌ Error reading bundle:", error.message);
}
