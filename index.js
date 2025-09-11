// creating and storing questions and answers for the quiz in an array of objects static data does not depend on DOM
const quizData =  [
    {  question: "which country is famous for Karelian stew?" , options: ["Finland", "Sweden", "Norway", "Denmark"], answer: "Finland" },
    {  question: "which country is famous for Nasi Lemak?"    , options: ["Indonesia", "Vietnam", "Cambodia", "Malaysia"], answer: "Malaysia"},
    {  question: "which country is famous for Sushi?" ,  options: ["China", "Japan", "Korea", "Thailand"], answer: "Japan" },
    {  question: "which country is famous for Tacos?" ,options: ["Spain", "Mexico", "Argentina", "Colombia"], answer: "Mexico"},
    {  question: "which country is famous for Kebab Koobideh?" , options: ["Iraq", "Iran", "Syria", "Turkey"], answer: "Iran" }
]

//connecting to html elements 

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");
const initialInfo = document.getElementById("initial-info");

// function to display a question 

const showQuestion = (index) => {
    // hide previous content
    quizContainer.innerHTML = "";

    // Get the current question object from the quizData array
    const currentQuestion = quizData[index];

    // Create question Element and get question text from the array of objects
    const questionEl = document.createElement("h2");
    questionEl.textContent = currentQuestion.question;
    questionEl.classList.add("text-x1", "font-semibold", "mb-4"); // Tailwind CSS classes for styling
    quizContainer.appendChild(questionEl);   // Append question to the quiz container

    // creating radio buttons for options
    currentQuestion.options.forEach((option, i) => {
        const optionContainer = document.createElement("div");  // Create a container for each option
        optionContainer.classList.add("mb-2"); // Tailwind CSS class for margin bottom making space between options

        const input = document.createElement("input"); // Create radio button input
        input.type = "radio";
        input.name = "answer"; 
        input.value = option;
        input.id = 'option' + i; // Unique id for each option
        
        // Create label for the radio button
        const label = document.createElement("label");  
        label.htmlFor = input.id;
        label.textContent = option;
        label.classList.add("ml-2"); // Tailwind CSS class for margin left to space between radio button and label

        // put the radio button inside the option container
        optionContainer.appendChild(input);
        optionContainer.appendChild(label); 
        quizContainer.appendChild(optionContainer); // Append option container to the quiz container 

        // show the quiz container and submit button
        quizContainer.classList.remove("hidden");
        submitBtn.classList.remove("hidden");

    })

}; 

// adding event listener to the start button
startBtn.addEventListener("click", () => {
    initialInfo.classList.add("hidden"); // Hide the welcome message
    showQuestion(0); //shows the first question 
})

// which question in the array we are on and storing it in a variable
let currentQuestionIndex = 0;
let score = 0; // to keep track of the score

// adding event listener to the submit button
submitBtn.addEventListener("click", () => {
    // Get the selected answer from the radio buttons
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    // if nothing is selected , alert and exit
    if (!selectedOption) {
        alert("Please select an answer before submitting.");
        return;
    }
    // check if the answer is correct
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestionIndex].answer) score++; // increase score if the answer is correct
    // move to the next question
    currentQuestionIndex++; 
    if (currentQuestionIndex < quizData.length) {
        showQuestion(currentQuestionIndex); // show next question if there are more questions
    } else {
        // finnish the quiz
        quizContainer.classList.add("hidden");
        submitBtn.classList.add("hidden");
        resultDiv.textContent = `You scored ${score} out of ${quizData.length}`;
        resultDiv.classList.remove("hidden");
    }
});

