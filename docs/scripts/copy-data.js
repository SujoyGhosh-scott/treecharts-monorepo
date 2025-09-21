const fs = require("fs");
const path = require("path");

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const items = fs.readdirSync(src);

  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

// Copy src/data to netlify/functions/data
const srcDataPath = path.resolve(__dirname, "../src/data");
const destDataPath = path.resolve(__dirname, "../netlify/functions/data");

console.log("Copying data files for Netlify functions...");
console.log(`Source: ${srcDataPath}`);
console.log(`Destination: ${destDataPath}`);

try {
  copyDir(srcDataPath, destDataPath);
  console.log("✅ Data files copied successfully!");
} catch (error) {
  console.error("❌ Error copying data files:", error);
  process.exit(1);
}
