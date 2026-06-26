async function askAI(type) {
  const input = document.getElementById("aiQuestion").value;
  const box = document.getElementById("aiResponse");

  // Check for empty input
  if (!input || input.trim() === "") {
    box.innerHTML = "⚠️ Please enter a question";
    return;
  }

  box.innerHTML = "🤖 Thinking...";

  try {
    const res = await fetch("https://project-5-91zb.onrender.com/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        input
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Request failed");
    }

    box.innerHTML = `
      <h3>🤖 AI Result</h3>
      <p>${data.result}</p>
    `;

  } catch (err) {
    console.error(err);
    box.innerHTML = "❌ AI service unavailable. Try again later.";
  }
}
