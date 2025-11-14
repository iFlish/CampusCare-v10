import axios from "axios";

export async function queryGemini(prompt, context, riskLevel = "low") {
  // 🟥 1. If high risk → skip Gemini completely
  if (riskLevel === "high") {
    return `
🚨 <strong>URGENT: You are not alone, and help is available.</strong>

If you're feeling unsafe or having thoughts of self-harm, please reach out <strong>immediately</strong> to:

- <strong>Befrienders Kuala Lumpur (24 hours):</strong> 03-7956 8145  
- <strong>Befrienders Email:</strong> <a href="mailto:sam@befrienders.org.my" target="_blank" rel="noopener noreferrer">sam@befrienders.org.my</a>  
- <strong>UTP Psychological Counselling Service (PCS):</strong> <a href="https://shorturl.at/OUaEb" target="_blank" rel="noopener noreferrer">Book a slot with UTP PCS</a>

Please don't face this alone — talking to someone can truly help. 💙  
    `;
  }

  // 🟦 2. Otherwise, use Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables");

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `You are CampusCare, a Malaysian mental health assistant for university students.

CRITICAL INSTRUCTIONS:
- Do NOT mention any hotlines outside Malaysia.
- For severe cases, mention **Befrienders KL** and **UTP PCS** only.
- Keep responses short, warm, and clear.
- Use **bold text** for emphasis.
- Context: ${context}
- User message: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200
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
      "I'm here to help. Could you tell me more about what’s been happening?";

    // Convert markdown bold to HTML
    responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert URLs to clickable links
    responseText = responseText.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Ensure the UTP PCS link is clickable
    responseText = responseText.replace(
      /https:\/\/shorturl\.at\/OUaEb/g,
      '<a href="https://shorturl.at/OUaEb" target="_blank" rel="noopener noreferrer">Book a slot with UTP PCS</a>'
    );

    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error(
      `Gemini API request failed: ${error.response?.data?.error?.message || error.message}`
    );
  }
}
