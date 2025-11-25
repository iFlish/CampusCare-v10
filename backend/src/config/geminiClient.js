import axios from "axios";

export async function queryGemini(prompt, context, riskLevel = "low") {


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
                text: `You are CampusCare, a compassionate and knowledgeable Malaysian mental health assistant for university students.

IMPORTANT: Keep your response SHORT — no more than 120 words or 3–5 short paragraphs. Be concise but clear.

CRITICAL INSTRUCTIONS:
- Do NOT mention any hotlines outside Malaysia.
- For severe cases, mention **Befrienders KL** (03-7627 2929) and **UTP PCS** at this link https://shorturl.at/OUaEb for them to book a slot only.
- Structure your responses clearly using paragraphs, bullet points, and numbered lists.
- Use **bold text** for emphasis on important points and section headings.
- Keep paragraphs short (2-3 sentences max).
- Use numbered lists for step-by-step advice.
- Use bullet points for multiple options or examples.
- If risk level is low dont mention Befrienders KL and UTP PCS

FORMATTING GUIDELINES:
- Use "**Section Title:**" for main sections
- Use "1. Step one" for sequential steps
- Use "• Point" for lists of options
- Keep each point concise and actionable

KNOWLEDGE BASE:
${context}

USER MESSAGE: ${prompt}

Provide a well-structured, empathetic response that's easy to read and follow.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350 // shorter output
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

    // Format the response for better HTML rendering
    responseText = formatResponse(responseText);

    // Optional: further shorten response if needed
    responseText = shortenResponse(responseText, 120); // 120 words max

    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error(
      `Gemini API request failed: ${error.response?.data?.error?.message || error.message}`
    );
  }
}

function formatResponse(text) {
  // Convert **bold** to <strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert numbered lists (1. 2. 3.) to proper HTML
  text = text.replace(/^(\d+)\.\s+(.+)$/gm, '<li class="numbered-item">$2</li>');

  // Wrap consecutive numbered items in <ol>
  text = text.replace(/((?:<li class="numbered-item">.*?<\/li>\s*)+)/g, '<ol>$1</ol>');

  // Convert bullet points (•, -, *) to HTML list items
  text = text.replace(/^[•\-\*]\s+(.+)$/gm, '<li>$1</li>');

  // Wrap consecutive bullet items in <ul>
  text = text.replace(/((?:<li>(?!class).*?<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Convert URLs to clickable links
  text = text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Format phone numbers as clickable
  text = text.replace(/(\d{2}-\d{4}\s?\d{4})/g, '<a href="tel:$1">$1</a>');

  // Convert paragraphs (double line breaks) to <p> tags
  text = text.split('\n\n').map(para => {
    if (para.trim().startsWith('<')) return para;
    return `<p>${para.trim()}</p>`;
  }).join('\n');

  // Convert single line breaks to <br> within paragraphs
  text = text.replace(/\n/g, '<br>');

  return text;
}

function shortenResponse(text, maxWords = 120) {
  const words = text.replace(/<[^>]+>/g, '').split(/\s+/); // strip HTML for word count
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}
