const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SOURCE_PATH = "source.txt";

if (!fs.existsSync(SOURCE_PATH)) {
  console.error("❌ source.txt not found");
  process.exit(1);
}

const content = fs.readFileSync(SOURCE_PATH, "utf-8");
const lines = content.split("\n");

if (lines.length < 5) {
  console.error("❌ source.txt must have at least 5 lines (link, opening ```, notes, closing ```, solution)");
  process.exit(1);
}

// Extract the link (first line)
const link = lines[0];

// Find the boundaries of the notes section
let notesStartIndex = -1;
let notesEndIndex = -1;

for (let i = 1; i < lines.length; i++) {
  if (lines[i].trim() === "```" && notesStartIndex === -1) {
    notesStartIndex = i;
  } else if (lines[i].trim() === "```" && notesStartIndex !== -1) {
    notesEndIndex = i;
    break;
  }
}

if (notesStartIndex === -1 || notesEndIndex === -1) {
  console.error("❌ Notes section must be wrapped in triple backticks (```)");
  process.exit(1);
}

// Extract notes (between triple backticks)
const remarks = lines.slice(notesStartIndex + 1, notesEndIndex).join("\n");

// Extract Java solution (everything after the closing triple backtick)
const javaCode = lines.slice(notesEndIndex + 1).join("\n").trim();

if (!javaCode) {
  console.error("❌ No Java solution found after the notes section");
  process.exit(1);
}

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
${remarks}

## 💻 Java Solution
\`\`\`java
${javaCode}
\`\`\`
`;

fs.writeFileSync(fullPath, mdContent);
console.log(`✅ Created ${fullPath}`);

// Stage the new file
execSync(`git add "${fullPath}"`);
execSync(`git commit -m "add: ${slug}"`);

// Clear source.txt
fs.writeFileSync(SOURCE_PATH, "");
console.log("🧹 Cleared source.txt");
