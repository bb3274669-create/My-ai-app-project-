const input = document.querySelector("input");
const chat = document.querySelector(".chat");
const send = document.querySelector(".input-area button:last-child");

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You: " + text);
  input.value = "";

  const loading = addMessage("BABLU: Soch raha hoon...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    loading.textContent = "BABLU: " + (data.reply || data.error);
  } catch (error) {
    loading.textContent = "BABLU: Connection error.";
  }

  chat.scrollTop = chat.scrollHeight;
}

function addMessage(text) {
  const message = document.createElement("p");
  message.textContent = text;
  message.style.marginBottom = "12px";
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
  return message;
}

send.onclick = sendMessage;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
