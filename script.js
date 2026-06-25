function askAI() {

    const question = document.getElementById("aiQuestion").value.trim();
    const response = document.getElementById("aiResponse");

    if(question===""){
        response.innerHTML="<p>Please enter a question.</p>";
        return;
    }

    let answer="";

    if(question.toLowerCase().includes("html")){
        answer="HTML is used to structure webpages using elements like headings, paragraphs and forms.";
    }
    else if(question.toLowerCase().includes("css")){
        answer="CSS is used to style webpages with colors, layouts, fonts and animations.";
    }
    else if(question.toLowerCase().includes("javascript")){
        answer="JavaScript makes webpages interactive by handling events, forms and dynamic content.";
    }
    else if(question.toLowerCase().includes("java")){
        answer="Java is an object-oriented programming language used for web, mobile and enterprise applications.";
    }
    else{
        answer="I'm your Study Buddy AI. I can help explain HTML, CSS, JavaScript, Java and study concepts.";
    }

    response.innerHTML=`
        <h3>🤖 AI Answer</h3>
        <p>${answer}</p>
    `;

    document.getElementById("aiQuestion").value="";
}
