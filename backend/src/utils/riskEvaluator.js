export function evaluateRisk(userMessage) {
  const text = userMessage.toLowerCase();

  // ✅ HIGH RISK - Immediate danger keywords
  const highRiskKeywords = [
    "kill myself",
    "end my life",
    "want to die",
    "suicide",
    "suicidal",
    "end it all",
    "better off dead",
    "no reason to live",
    "can't go on",
    "ending it",
    "take my life",
    "hurt myself badly",
    "plan to die",
    "goodbye forever",
    "last goodbye",
    "cut my throat",
    "jump off",
    "overdose",
    "hang myself",
    "shoot myself",
    "die tonight",
    "leave this world",
    "finish myself",
    "self-destruction",
    "nothing matters",
    "pain is unbearable",
    "irreversible",
    "permanent solution",
    "final goodbye"
  ];

  // ✅ MODERATE RISK - Concerning but not immediate danger
  const moderateRiskKeywords = [
    "depressed",
    "depression",
    "hopeless",
    "worthless",
    "anxious",
    "anxiety",
    "panic",
    "scared",
    "terrified",
    "crying all the time",
    "can't sleep",
    "nightmares",
    "self-harm",
    "cutting",
    "hurting myself",
    "hate myself",
    "nobody cares",
    "alone forever",
    "giving up",
    "no hope",
    "overwhelmed",
    "stress",
    "mental breakdown",
    "feeling empty",
    "lost control",
    "panic attack",
    "too much pressure",
    "feeling trapped",
    "hopeless situation",
    "stressed out",
    "life is hard",
    "nothing matters",
    "feeling numb",
    "feel rejected",
    "isolated",
    "lonely",
    "can't cope",
    "emotionally drained",
    "too anxious",
    "social anxiety",
    "overthinking",
    "fear of failure",
    "can't focus",
    "hard to breathe",
    "restless",
    "tired of life",
    "lost interest",
    "feeling guilty",
    "low self-esteem",
    "feeling inadequate",
    "panic feelings",
    "feel unsafe",
    "stressful thoughts"
  ];

  // Check for HIGH RISK first
  for (const keyword of highRiskKeywords) {
    if (text.includes(keyword)) {
      console.log(`🚨 HIGH RISK detected: "${keyword}"`);
      return "high";
    }
  }

  // Check for MODERATE RISK
  for (const keyword of moderateRiskKeywords) {
    if (text.includes(keyword)) {
      console.log(`⚠️  MODERATE RISK detected: "${keyword}"`);
      return "moderate";
    }
  }

  // Default to LOW RISK
  console.log(`✅ LOW RISK - No concerning keywords detected`);
  return "low";
}
