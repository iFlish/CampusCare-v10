import fs from "fs";
import path from "path";

const datasetPath = path.resolve("src/data/cleaned_dataset.json");
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));

export async function getRelevantContext(userMessage) {
  const relevant = dataset.filter(entry =>
    userMessage.toLowerCase().includes(entry.intent.toLowerCase())
  );

  return relevant.map(r => r.response).join("\n").slice(0, 1000);
}
