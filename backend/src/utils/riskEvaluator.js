export function evaluateRisk(userMessage) {
  const text = userMessage.toLowerCase();

  const highRiskKeywords = [
    "kill myself", "end my life", "want to die", "suicide", "suicidal",
    "end it all", "better off dead", "no reason to live", "can't go on",
    "ending it", "take my life", "hurt myself", "plan to die", "goodbye forever",
    "last goodbye", "jump off", "overdose", "hang myself", "shoot myself",
    "die tonight", "leave this world", "finish myself", "self-destruction",
    "pain is unbearable", "final goodbye"
  ];

  const moderateRiskKeywords = [
    "depressed", "hopeless", "worthless", "anxious", "panic", "scared",
    "terrified", "crying", "can't sleep", "nightmares", "self-harm", "cutting",
    "hate myself", "alone", "giving up", "no hope", "overwhelmed", "stress",
    "mental breakdown", "empty", "trapped", "stressed out", "nothing matters",
    "lonely", "can't cope", "emotionally drained", "tired of life", "lost interest"
  ];

  for (const keyword of highRiskKeywords) {
    if (text.includes(keyword)) return "high";
  }

  for (const keyword of moderateRiskKeywords) {
    if (text.includes(keyword)) return "moderate";
  }

  return "low";
}
