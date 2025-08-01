import { readdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = path.join(__dirname, "./public/foods"); // Replace with your folder name
const outputFile = path.join(__dirname, "image-names.txt");

const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
];

try {
  const files = await readdir(folderPath);
  const imageFiles = files.filter((file) =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  await writeFile(outputFile, imageFiles.join("\n"));
  console.log(`Image names written to ${outputFile}`);
} catch (err) {
  console.error("Error:", err);
}
