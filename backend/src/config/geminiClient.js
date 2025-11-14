import axios from "axios";

export async function queryGemini(prompt, context) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `You are CampusCare, a supportive mental health assistant for students.

CRITICAL INSTRUCTIONS:
- Keep responses under 100 words maximum
- Be concise, warm, and direct
- Use **bold text** for important points (use markdown formatting)
- Break longer responses into short paragraphs
- For crisis situations, immediately provide hotline numbers

Context from knowledge base: ${context}

User message: ${prompt}

Respond empathetically and helpfully in 50 words or less. Use **bold** for key points.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150, // Roughly 50-75 words
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      }
    );

    let responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help. Could you tell me more?";
    
    // Convert markdown bold to HTML for better display
    responseText = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error(`Gemini API request failed: ${error.response?.data?.error?.message || error.message}`);
  }
}