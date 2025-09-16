// Quiz data
const quizData = [
    { question: "Which country is famous for Karelian stew?", options: ["Finland", "Sweden", "Norway", "Denmark"], answer: "Finland" },
    { question: "Which country is famous for Nasi Lemak?", options: ["Indonesia", "Vietnam", "Cambodia", "Malaysia"], answer: "Malaysia" },
    { question: "Which country is famous for Sushi?", options: ["China", "Japan", "Korea", "Thailand"], answer: "Japan" },
    { question: "Which country is famous for Tacos?", options: ["Spain", "Mexico", "Argentina", "Colombia"], answer: "Mexico" },
    { question: "Which country is famous for Kebab Koobideh?", options: ["Iraq", "Iran", "Syria", "Turkey"], answer: "Iran" }
];

// DOM elements to connect to html 
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");
const initialInfo = document.getElementById("initial-info");
const emojiOverlay = document.getElementById("emoji-overlay");

let currentQuestionIndex = 0;
let score = 0;

// Function to show a question
const showQuestion = (index) => {
    quizContainer.innerHTML = ""; // clear previous content
    const currentQuestion = quizData[index];

    // Question
    const questionEl = document.createElement("h2");
    questionEl.textContent = currentQuestion.question;
    questionEl.classList.add("text-xl", "font-semibold", "mb-4");
    quizContainer.appendChild(questionEl);

    // Options
    currentQuestion.options.forEach((option, i) => {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("mb-2");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        input.id = "option" + i;

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = option;
        label.classList.add("ml-2");

        optionContainer.appendChild(input);
        optionContainer.appendChild(label);
        quizContainer.appendChild(optionContainer);
    });

    quizContainer.classList.remove("hidden");
    submitBtn.classList.remove("hidden");
};

// Function to show final result
const showFinalResult = () => {
    quizContainer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    resultDiv.textContent = `You scored ${score} out of ${quizData.length}`;
    resultDiv.classList.remove("hidden", "text-green-700", "text-green-400");
    resultDiv.classList.add("text-white");
};

// Start button click
startBtn.addEventListener("click", () => {
    initialInfo.classList.add("hidden");
    showQuestion(currentQuestionIndex);
});

// Submit button click
submitBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before submitting.");
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
        score++;
    } else {
        emojiOverlay.innerHTML = `<span class="animate-bounce text-6xl inline-block">😢</span>`;
        emojiOverlay.classList.remove("hidden");

        setTimeout(() => {
            emojiOverlay.classList.add("hidden");
            emojiOverlay.innerHTML = "";
        }, 1800);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showFinalResult();
    }
});
