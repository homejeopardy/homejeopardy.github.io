const questionSets = [
    {
        "Ethical Principles": {
            100: ["Acting with honesty and truthfulness in all business dealings.", "Integrity"],
            200: ["The duty to keep sensitive information private.", "Confidentiality"],
            300: ["Acting in the best interest of clients, customers, or stakeholders.", "Fiduciary duty"],
            400: ["A situation where personal interests could interfere with professional responsibilities.", "Conflict of interest"],
            500: ["The principle that requires professionals to acknowledge and correct their mistakes.", "Accountability"]
        },
        "Workplace Conduct": {
            100: ["Treating colleagues with fairness, dignity, and respect.", "Professionalism"],
            200: ["Unwelcome behavior that creates a hostile or uncomfortable work environment.", "Harassment"],
            300: ["Reporting unethical behavior or policy violations.", "Whistleblowing"],
            400: ["Avoiding favoritism and personal bias in decision-making.", "Impartiality"],
            500: ["Using company resources for personal gain without authorization.", "Misappropriation"]
        }
    },
    {
        "Business Ethics": {
            100: ["The moral principles that guide a person's behavior in business.", "Ethics"],
            200: ["Fair treatment of all employees and stakeholders.", "Equity"],
            300: ["Keeping promises and commitments.", "Trustworthiness"],
            400: ["The ethical principle of not harming others.", "Non-maleficence"],
            500: ["Being answerable for one's actions.", "Accountability"]
        },
        "Corporate Policies": {
            100: ["The rules that dictate employee conduct in a company.", "Company Policy"],
            200: ["Actions taken to address unethical behavior.", "Disciplinary measures"],
            300: ["The standard of expected honesty in an organization.", "Integrity"],
            400: ["Encouraging employees to voice concerns safely.", "Whistleblower protection"],
            500: ["A structured approach to ensuring compliance.", "Regulatory framework"]
        }
    }
];

function getDailyQuestionSet() {
    const today = new Date().getDate();
    const index = today % questionSets.length;
    return questionSets[index];
}

function updateDailyQuestions() {
    const lastUpdated = localStorage.getItem("lastUpdated");
    const today = new Date().toDateString();

    if (lastUpdated !== today) {
        localStorage.setItem("dailyQuestions", JSON.stringify(getDailyQuestionSet()));
        localStorage.setItem("lastUpdated", today);
    }
}

updateDailyQuestions();
const categories = JSON.parse(localStorage.getItem("dailyQuestions"));

let teams = {};
let currentQuestion = null;
let currentPoints = 0;
let currentButton = null;

document.getElementById("add-team").addEventListener("click", addTeam);
document.getElementById("start-game").addEventListener("click", startGame);

function addTeam() {
    const teamInputs = document.getElementById("team-inputs");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team Name";
    teamInputs.appendChild(input);
}

function startGame() {
    teams = {};
    document.getElementById("scores").innerHTML = "";
    document.getElementById("team-select").innerHTML = "";

    document.querySelectorAll("#team-inputs input").forEach(input => {
        if (input.value.trim()) {
            let name = input.value.trim();
            teams[name] = 0;

            let scoreDiv = document.createElement("div");
            scoreDiv.className = "team";
            scoreDiv.innerText = `${name}: $0`;
            document.getElementById("scores").appendChild(scoreDiv);

            let option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            document.getElementById("team-select").appendChild(option);
        }
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateBoard();
}

/* 📌 FIXED FUNCTION: CATEGORIES DISPLAY IN COLUMNS */
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
            button.onclick = () => showQuestion(category, points);
            board.appendChild(button);
        });
    }
}

/* ✅ FIXED: QUESTION DISPLAY FUNCTION */
function showQuestion(category, points) {
    currentQuestion = category;
    currentPoints = points;

    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.play();

    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";

    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.pause();
    jeopardyTheme.currentTime = 0;
}
