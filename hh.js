async function askAI(type) {
  const input = document.getElementById("aiQuestion").value;
  const box = document.getElementById("aiResponse");

  // ⚠️ Guardrail 1: empty input
  if (!input || input.trim() === "") {
    box.innerHTML = "⚠️ Please enter a question";
    return;
  }

  box.innerHTML = "🤖 Thinking...";

  try {
    const res = await fetch("/api/ai", {
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

    // ⚠️ Guardrail 2: backend error handling
    if (!res.ok) {
      throw new Error(data.error || "Request failed");
    }

    box.innerHTML = `
      <h3>🤖 AI Result</h3>
      <p>${data.result}</p>
    `;

  } catch (err) {
    console.log(err);
    box.innerHTML = "❌ AI service unavailable. Try again later.";
  }
}
