// Notes
let noteCount = 0;
let taskCount = 0;
let doneCount = 0;
let plannerCount = 0;

function updateDashboard() {
    document.getElementById("noteCount").textContent = noteCount;
    document.getElementById("taskCount").textContent = taskCount;
    document.getElementById("doneCount").textContent = doneCount;
    document.getElementById("plannerCount").textContent = plannerCount;
}

// Add Note
function addNote() {
    let title = document.getElementById("noteTitle").value;
    let text = document.getElementById("noteText").value;

    if (title === "" || text === "") {
        alert("Please fill all fields!");
        return;
    }

    let note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
    `;

    document.getElementById("noteList").appendChild(note);

    noteCount++;
    updateDashboard();

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
}

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = function () {
        if (this.checked) {
            doneCount++;
        } else {
            doneCount--;
        }
        updateDashboard();
    };

    let span = document.createElement("span");
    span.textContent = " " + input.value;

    li.appendChild(checkbox);
    li.appendChild(span);

    document.getElementById("taskList").appendChild(li);

    taskCount++;
    updateDashboard();

    input.value = "";
}

// Add Planner
function addPlan() {
    let subject = document.getElementById("planTitle").value;
    let date = document.getElementById("planDate").value;

    if (subject === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    let plan = document.createElement("div");
    plan.className = "plan";
    plan.innerHTML = `
        <h3>${subject}</h3>
        <p>Deadline: ${date}</p>
    `;

    document.getElementById("plannerList").appendChild(plan);

    plannerCount++;
    updateDashboard();

    document.getElementById("planTitle").value = "";
    document.getElementById("planDate").value = "";
}

// Dark Mode
document.getElementById("darkBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

// Search
document.getElementById("searchInput").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();

    document.querySelectorAll(".note, #taskList li, .plan").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(value)
            ? ""
            : "none";
    });
});

// Initialize Dashboard
updateDashboard();
