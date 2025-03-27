document.getElementById("add-team").addEventListener("click", addTeam);
document.getElementById("start-game").addEventListener("click", startGame);

let teams = {};
let currentQuestion = null;
let currentPoints = 0;
let currentButton = null;

const categories = {
    "Business Ethics": {
        100: ["Acting with honesty in business.", "Integrity"],
        200: ["Keeping sensitive information private.", "Confidentiality"],
        300: ["Acting in the best interest of others.", "Fiduciary Duty"],
        400: ["A situation where personal interests interfere with work.", "Conflict of Interest"],
        500: ["The responsibility to acknowledge mistakes.", "Accountability"]
    },
    "Corporate Policies": {
        100: ["Rules for professional behavior.", "Code of Conduct"],
        200: ["Reporting unethical behavior.", "Whistleblowing"],
        300: ["Unauthorized use of company funds.", "Embezzlement"],
        400: ["Deliberately misleading financial reports.", "Fraud"],
        500: ["Laws that protect employees from discrimination.", "Equal Employment Opportunity"]
    },
    "Legal Compliance": {
        100: ["Lying under oath in court.", "Perjury"],
        200: ["Bribing someone for business gain.", "Bribery"],
        300: ["Disclosing confidential company info.", "Trade Secret Violation"],
        400: ["Breaking laws regarding workplace safety.", "OSHA Violation"],
        500: ["Laws that protect consumer rights.", "Consumer Protection Act"]
    },
    "Workplace Behavior": {
        100: ["Treating coworkers with respect.", "Professionalism"],
        200: ["Repeated unwanted behavior towards someone.", "Harassment"],
        300: ["Unfair treatment based on gender, race, etc.", "Discrimination"],
        400: ["Giving preferential treatment due to personal relationships.", "Nepotism"],
        500: ["Avoiding gifts that influence business decisions.", "Conflict of Interest Policy"]
    },
    "Technology & Ethics": {
        100: ["Using company computers for personal use.", "Unauthorized Use"],
        200: ["Protecting customer and employee data.", "Data Privacy"],
        300: ["Hacking into a system without permission.", "Cybercrime"],
        400: ["Creating false online reviews.", "False Advertising"],
        500: ["A company’s responsibility to be ethical online.", "Digital Ethics"]
    }
};

// Function to add a new team input
function addTeam() {
    const teamInputs = document.getElementById("team-inputs");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team Name";
    teamInputs.appendChild(input);
}

// Function to start the game
function startGame() {
    const teamInputs = document.querySelectorAll("#team-inputs input");
    if (teamInputs.length === 0) return;

    teams = {};
    document.getElementById("scores").innerHTML = "";
    document.getElementById("team-select").innerHTML = "";

    teamInputs.forEach(input => {
        if (input.value.trim() !== "") {
            const name = input.value.trim();
            teams[name] = 0;

            const scoreDiv = document.createElement("div");
            scoreDiv.className = "team";
            scoreDiv.id = `team-${name}`;
            scoreDiv.innerText = `${name}: $0`;
            document.getElementById("scores").appendChild(scoreDiv);

            const option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            document.getElementById("team-select").appendChild(option);
        }
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateBoard();
}

// Generate Jeopardy board with correct layout
function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    // Create category headers
    Object.keys(categories).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    // Create question buttons
    for (let points of [100, 200, 300, 400, 500]) {
        Object.keys(categories).forEach(category => {
            let button = document.createElement("button");
            button.className = "question";
            button.innerText = `$${points}`;
            button.setAttribute("data-category", category);
            button.setAttribute("data-points", points);
            button.onclick = showQuestion;
            board.appendChild(button);
        });
    }
}

// Show question popup
function showQuestion(event) {
    currentButton = event.target;
    const category = currentButton.getAttribute("data-category");
    const points = parseInt(currentButton.getAttribute("data-points"));

    currentQuestion = category;
    currentPoints = points;

    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

// Show answer
function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";
}

// Update score
function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    if (team) {
        teams[team] += correct ? currentPoints : -currentPoints;
        document.getElementById(`team-${team}`).innerText = `${team}: $${teams[team]}`;
    }

    document.getElementById("answer-popup").style.display = "none";
    currentButton.disabled = true;
    currentButton.style.backgroundColor = "#222";
}
