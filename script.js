async function askAI(){

const question = document.getElementById("aiQuestion").value;
const responseBox = document.getElementById("aiResponse");

if(!question){
responseBox.innerHTML = "Please enter a question";
return;
}

responseBox.innerHTML = "Thinking... 🤖";

try{

const res = await fetch("http://localhost:3000/api/ask", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ question })
});

const data = await res.json();

responseBox.innerHTML = `
<h3>🤖 AI Answer</h3>
<p>${data.answer}</p>
`;

}catch(err){
responseBox.innerHTML = "AI error. Backend not running.";
}

document.getElementById("aiQuestion").value = "";
}
