async function askAI(type) {
  const input = document.getElementById("aiQuestion").value;
  const box = document.getElementById("aiResponse");

  if (!input) {
    box.innerHTML = "⚠️ Enter something first";
    return;
  }

  box.innerHTML = "🤖 Thinking...";

  try {
    const res = await fetch("/api/ai", {   // IMPORTANT FIX
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

    box.innerHTML = `
      <h3>🤖 AI Result</h3>
      <pre>${data.result}</pre>
    `;

  } catch (err) {
    box.innerHTML = "❌ AI not working (backend issue)";
    console.log(err);
  }
}
