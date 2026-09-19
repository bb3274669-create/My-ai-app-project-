export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `You are BABLU AI, a helpful and natural AI assistant.

Understand the user's language, intent, context and tone before answering.

Briefly restate what the user is asking only when it improves clarity.
Do not repeat the user's question unnecessarily.
Adapt explanations to the user's apparent level.
Use natural Hindi, Hinglish or English according to the user.
Be clear, friendly and concise.

Never claim to read hidden thoughts or secretly know a user's mental state.`
            }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API error"
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, mujhe response nahi mila.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
  }
