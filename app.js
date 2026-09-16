const input = document.querySelector("input");
const chat = document.querySelector(".chat");
const send = document.querySelector(".input-area button:last-child");

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const message = document.createElement("p");
  message.textContent = "You: " + text;
  message.style.marginBottom = "12px";

  chat.appendChild(message);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

send.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
