const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SOURCE_PATH = "source.txt";

if (!fs.existsSync(SOURCE_PATH)) {
  console.error("❌ source.txt not found");
  process.exit(1);
}

const lines = fs.readFileSync(SOURCE_PATH, "utf-8").split("\n").filter(Boolean);
if (lines.length < 3) {
  console.error("❌ source.txt must have at least 3 lines (link, remark, solution)");
  process.exit(1);
}

const [link, remark, ...solutionLines] = lines;
const javaCode = solutionLines.join("\n");

// Format date-based folder
const now = new Date();
const yyyy = now.getFullYear().toString();
const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
const dd = String(now.getDate()).padStart(2, "0");

const dirPath = path.join(yyyy, month, dd);
fs.mkdirSync(dirPath, { recursive: true });

// Generate filename
const slug = link.split("/").filter(Boolean).pop().replace(/-/g, "_").toLowerCase();
const count = fs.readdirSync(dirPath).length + 1;
const filename = `${String(count).padStart(3, "0")}_${slug}.md`;
const fullPath = path.join(dirPath, filename);

// Format markdown content
const mdContent = `## 📌 Question Link
[${link}](${link})

## 📝 Solution Remarks
${remark}

## 💻 Java Solution
\`\`\`java
${javaCode}
\`\`\`
`;

fs.writeFileSync(fullPath, mdContent);
console.log(`✅ Created ${fullPath}`);

// Stage the new file
execSync(`git add "${fullPath}"`);

// Clear source.txt
fs.writeFileSync(SOURCE_PATH, "");
console.log("🧹 Cleared source.txt");
