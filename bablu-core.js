function babluCore(userInput) {
  const text = userInput.toLowerCase();

  if (text.includes("code")) return "code";
  if (text.includes("image")) return "image";
  if (text.includes("study")) return "study";
  if (text.includes("voice")) return "voice";

  return "chat";
}
