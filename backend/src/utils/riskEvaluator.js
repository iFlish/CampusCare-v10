export function evaluateRisk(userMessage) {
  const text = userMessage.toLowerCase();

const highRiskKeywords = [

  "kill myself", "end my life", "want to die", "suicide", "suicidal",
  "end it all", "better off dead", "plan to die", "take my life",
  "i don't want to live", "wish i was dead", "want to disappear",
  "i'm done living", "end everything", "ending my life",

  "goodbye forever", "last goodbye", "final goodbye", "this is goodbye",
  "leaving for good", "no more pain goodbye",


  "no reason to live", "can't go on", "life is pointless",
  "life is meaningless", "can't do this anymore",
  "i'm giving up on life", "i'm tired of living", "life is unbearable",
  "pain is unbearable", "i can't take this pain",


  "jump off", "overdose", "hang myself", "hang", "shoot myself",
  "cut deep", "take pills", "slit my wrist", "jump off a building",
  "crash my car", "poison myself", "bleed out",


  "hurt myself", "destroy myself", "self-destruction",
  "i want to cut myself", "i want to bleed",


  "die tonight", "leave this world", "don't want to wake up",
  "i hope i don't wake up", "i shouldn't exist", "want it all to stop",
  "i wish everything would end", "i want to vanish",


  "nothing left for me", "life is over", "i give up completely",
  "no point living", "i'm beyond saving"
];

const moderateRiskKeywords = [

  "depressed", "hopeless", "worthless", "empty", "numb",
  "sad all the time", "i can't stop crying", "crying every night",
  "emotionally drained", "overwhelmed", "no hope", "useless",

  
  "anxious", "panic", "panic attack", "scared", "terrified",
  "heart racing", "shaking", "can't breathe", "overthinking",

 
  "hate myself", "i'm a failure", "i'm useless", "i'm the problem",
  "i don't matter", "nobody cares about me", "i'm not good enough",


  "alone", "lonely", "isolated", "no one understands",
  "i have no one", "nobody listens", "i feel unwanted",

  
  "tired of life", "exhausted", "can't cope", "stress",
  "stressed out", "under pressure", "burnt out", "mentally tired",
  "mental breakdown", "can't take it anymore", "drained",

 
  "can't sleep", "sleep problems", "nightmares", "insomnia",
  "i can't rest", "restless every night",


  "self-harm", "cutting", "urge to self-harm", "thinking about harm",
  "want to hurt myself but not sure",


  "lost interest", "nothing matters", "tired of everything",
  "i don't feel anything", "low motivation", "i can't focus",


  "trapped", "nowhere to go", "no way out", "stuck in my head",
  "can't escape my thoughts",


  "hurt emotionally", "broken", "shattered", "falling apart",
  "can't handle my emotions", "not okay", "struggling mentally"
];


  for (const keyword of highRiskKeywords) {
    if (text.includes(keyword)) return "high";
  }

  for (const keyword of moderateRiskKeywords) {
    if (text.includes(keyword)) return "moderate";
  }

  return "low";
}
