import axios from "axios";

export async function queryGemini(prompt, context, riskLevel = "low") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables");


  let safetyInstructions = "";
  
  if (riskLevel === "high" || riskLevel === "High") {
    safetyInstructions = `
⚠️ CRITICAL ALERT: This user is showing HIGH RISK signs (suicidal ideation or severe crisis).

MANDATORY RESPONSE REQUIREMENTS:
1. Show IMMEDIATE empathy and concern - acknowledge their pain
2. MUST include these crisis resources prominently:
   - **Befrienders KL**: 03-7627 2929 (24/7 crisis support)
   - **UTP Psychological & Counselling Services**: Book at https://tinyurl.com/PCS-BOOKING
3. Strongly encourage them to reach out to these services or someone they trust RIGHT NOW
4. Remind them they are NOT alone and that help IS available
5. Use gentle, non-judgmental, compassionate language
6. Avoid minimizing their feelings - validate their pain while offering hope
`;
  } else if (riskLevel === "moderate" || riskLevel === "Moderate") {
    safetyInstructions = `
⚠️ MODERATE RISK: This user is showing signs of distress (depression, anxiety, significant stress).

RECOMMENDED RESPONSE APPROACH:
1. Validate their feelings with genuine empathy
2. Gently suggest talking to a counselor or mental health professional
3. Provide practical coping strategies (breathing exercises, self-care tips)
4. Mention that seeking help is a sign of strength, not weakness
5. You MAY mention UTP PCS services as a supportive resource
6. Only mention crisis hotlines if they express worsening or concerning thoughts
`;
  } else {
    safetyInstructions = `
✅ LOW RISK: This is a general support conversation (casual check-in, informational).

RESPONSE APPROACH:
1. Be warm, supportive, and conversational
2. Do NOT mention crisis hotlines or emergency services (not appropriate here)
3. Focus on the specific topic they raised
4. Encourage healthy habits, self-care, and open communication
5. Keep the tone friendly and accessible
`;
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `You are CampusCare, a compassionate and knowledgeable Malaysian mental health assistant for university students.

IMPORTANT: Keep your response SHORT — no more than 120 words or 3–5 short paragraphs. Be concise but clear.

${safetyInstructions}

CRITICAL INSTRUCTIONS:
- Do NOT mention any hotlines outside Malaysia.
- Structure your responses clearly using paragraphs, bullet points, and numbered lists.
- Use **bold text** for emphasis on important points and section headings.
- Keep paragraphs short (2-3 sentences max).
- Use numbered lists for step-by-step advice.
- Use bullet points for multiple options or examples.
- DO NOT ANSWER QUESTIONS NOT RELATED TO MENTAL HEALTH

FORMATTING GUIDELINES:
- Use "**Section Title:**" for main sections
- Use "1. Step one" for sequential steps
- Use "• Point" for lists of options
- Keep each point concise and actionable

KNOWLEDGE BASE (Pre-vetted therapeutic responses):
${context}

USER MESSAGE: ${prompt}

Provide a well-structured, empathetic response that's easy to read and follow.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        }
      }
    );

    let responseText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help. Could you tell me more about what's been happening?";

 
    responseText = formatResponse(responseText);

    responseText = shortenResponse(responseText, 120);

    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error(
      `Gemini API request failed: ${error.response?.data?.error?.message || error.message}`
    );
  }
}

function formatResponse(text) {

  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  text = text.replace(/^(\d+)\.\s+(.+)$/gm, '<li class="numbered-item">$2</li>');

  text = text.replace(/((?:<li class="numbered-item">.*?<\/li>\s*)+)/g, '<ol>$1</ol>');


  text = text.replace(/^[•\-\*]\s+(.+)$/gm, '<li>$1</li>');


  text = text.replace(/((?:<li>(?!class).*?<\/li>\s*)+)/g, '<ul>$1</ul>');

  text = text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  text = text.replace(/(\d{2}-\d{4}\s?\d{4})/g, '<a href="tel:$1">$1</a>');


  text = text.split('\n\n').map(para => {
    if (para.trim().startsWith('<')) return para;
    return `<p>${para.trim()}</p>`;
  }).join('\n');

  text = text.replace(/\n/g, '<br>');

  return text;
}

function shortenResponse(text, maxWords = 120) {
  
  const words = text.replace(/<[^>]+>/g, '').split(/\s+/);
  
  if (words.length <= maxWords) return text;
  
  
  return words.slice(0, maxWords).join(" ") + "...";
}