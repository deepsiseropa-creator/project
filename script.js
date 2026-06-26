async function askAI(type = "explain") {
  const input = document.getElementById("aiQuestion").value;
  const box = document.getElementById("aiResponse");

  if (!input) {
    box.innerHTML = "⚠️ Enter something first";
    return;
  }

  box.innerHTML = "🤖 Thinking...";

  try {
    const res = await fetch("http://localhost:3000/api/ai", {
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
      throw new Error(data.error || "AI request failed");
    }

    box.innerHTML = `
      <h3>🤖 AI Result</h3>
      <p>${data.result}</p>
    `;

  } catch (err) {
    console.log(err);
    box.innerHTML = "❌ AI not working (check backend)";
  }
}
