import json
import os

# Correct input and output paths
input_path = os.path.join("DataCleaning", "dataset.json")  # or just "dataset.json" if running inside DataCleaning folder
output_path = os.path.join("backend", "src", "data", "cleaned_dataset.json")

# Read the original dataset
with open(input_path, "r", encoding="utf-8") as f:
    data = json.load(f)

cleaned_data = []

# Flatten responses
for intent in data.get("intents", []):
    tag = intent.get("tag", "").strip().lower()
    responses = intent.get("responses", [])
    patterns = intent.get("patterns", [])

    for response in responses:
        cleaned_data.append({
            "intent": tag,
            "response": response.strip()
        })

# Save cleaned dataset
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(cleaned_data, f, indent=2, ensure_ascii=False)

print(f"✅ Cleaned dataset saved to {output_path}")
print(f"📊 Total entries: {len(cleaned_data)}")
