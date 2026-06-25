async function askAI(type) {
  const input = document.getElementById("aiQuestion").value;
  const box = document.getElementById("aiResponse");

  if (!input) {
    box.innerHTML = "Enter something first";
    return;
  }

  box.innerHTML = "Thinking... 🤖";

  try {
    const res = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: type,
        input: input
      })
    });

    const data = await res.json();

    box.innerHTML = `
      <h3>🤖 Study Buddy AI</h3>
      <pre>${data.result}</pre>
    `;

  } catch (err) {
    box.innerHTML = "AI Error. Backend not running.";
  }
}
