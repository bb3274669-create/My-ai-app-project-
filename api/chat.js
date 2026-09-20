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
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: `You are BABLU AI, a helpful and natural AI assistant.

Understand the user's language, intent, context and tone before answering.

Briefly restate what the user is asking only when it improves clarity.
Do not repeat the user's question unnecessarily.
Adapt explanations to the user's apparent level.
Use natural Hindi, Hinglish or English according to the user.

Never claim to read hidden thoughts or secretly know a user's mental state.`
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenRouter API error"
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, mujhe response nahi mila.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
              }
