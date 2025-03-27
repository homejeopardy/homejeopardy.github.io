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
        },
        "Corporate Ethics": {
            100: ["The duty to act in the best interest of a company and its stakeholders.", "Corporate Responsibility"],
            200: ["Fair and honest communication with investors and the public.", "Transparency"],
            300: ["Policies that prevent workplace discrimination.", "Equal Opportunity"],
            400: ["Avoiding manipulation of financial reports for personal gain.", "Accounting Ethics"],
            500: ["Adhering to the highest moral and ethical standards.", "Integrity in Business"]
        },
        "Digital Conduct": {
            100: ["The duty to protect customer and employee digital data.", "Cybersecurity"],
            200: ["Using work email responsibly and professionally.", "Email Etiquette"],
            300: ["Not sharing private company information online.", "Data Privacy"],
            400: ["The importance of keeping software and systems updated.", "Security Compliance"],
            500: ["Avoiding personal use of work devices.", "Responsible Technology Use"]
        },
        "Legal Responsibilities": {
            100: ["The laws protecting employees from discrimination.", "EEO Laws"],
            200: ["Bribery and illegal payments fall under this crime.", "Corruption"],
            300: ["A whistleblower law protecting employees.", "Whistleblower Protection Act"],
            400: ["Disclosing conflicts of interest in business.", "Transparency"],
            500: ["Rules that businesses must follow to stay legal.", "Regulatory Compliance"]
        }
    },
    {
        "Corporate Policies": {
            100: ["The rules that dictate employee conduct.", "Company Policy"],
            200: ["Actions taken to address unethical behavior.", "Disciplinary Measures"],
            300: ["The standard of expected honesty.", "Integrity"],
            400: ["Encouraging employees to report concerns.", "Whistleblower Protection"],
            500: ["A structured approach to compliance.", "Regulatory Framework"]
        },
        "Financial Ethics": {
            100: ["Handling money and assets responsibly.", "Financial Integrity"],
            200: ["Avoiding fraud and money laundering.", "Ethical Banking"],
            300: ["Ensuring fairness in stock trading.", "Insider Trading Laws"],
            400: ["Reporting financial misconduct.", "Forensic Accounting"],
            500: ["The importance of honest tax reporting.", "Tax Ethics"]
        },
        "Corporate Social Responsibility": {
            100: ["Businesses helping communities.", "Philanthropy"],
            200: ["Minimizing harm to the environment.", "Sustainability"],
            300: ["Companies supporting diversity and inclusion.", "DEI Initiatives"],
            400: ["Companies giving employees fair wages.", "Fair Compensation"],
            500: ["The idea that businesses must act ethically.", "Corporate Ethics"]
        },
        "Technology Ethics": {
            100: ["The fair use of AI and automation.", "AI Ethics"],
            200: ["Avoiding biased algorithms.", "Tech Fairness"],
            300: ["Respecting user privacy in software.", "Privacy Laws"],
            400: ["Not misusing employee monitoring software.", "Workplace Surveillance Ethics"],
            500: ["Developing technology for the public good.", "Ethical Innovation"]
        },
        "Leadership Ethics": {
            100: ["A leader's moral duty to set an example.", "Ethical Leadership"],
            200: ["Being honest in business communications.", "Truthfulness"],
            300: ["Empowering employees ethically.", "Fair Delegation"],
            400: ["Making ethical decisions under pressure.", "Moral Courage"],
            500: ["Correcting wrongs within an organization.", "Restorative Leadership"]
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

function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    Object.keys(categories).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

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

function showQuestion(category, points) {
    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";
}
