/* Global constants */
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

/* Values to be set at a later time */
let shuffledQuestions, currentQuestionIndex

/* Sets what start and next button does when clicked */
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

/* When start is pressed do this */
function startGame() {
    console.log('Started')                                            /* Write in log that game has started, can be seen when using inspect element */
    startButton.classList.add('hide')                                 /* Hide startbutton when pressed */
    shuffledQuestions = questions.sort(() => Math.random() - .5)      /* Shuffle questions, REWORK THIS TO SHUFFLE ANSWERS INSTEAD */
    currentQuestionIndex = 0                                          
    questionContainerElement.classList.remove('hide')                 /* Show the question container */
    setNextQuestion()                                                 /* Run this function */
}

function setNextQuestion() {
    resetState()
    ShowQuestion(shuffledQuestions[currentQuestionIndex])             /* Show the next question based on index */
}

function ShowQuestion(question) {
    questionElement.innerText = question.question                     /* Show question text defined in questions array */
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {                                         /* Only if answer is correct mark it */
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)                      /* Add the button */
    });
}

function resetState() {
    clearStatusClass(document.body)                                   /* Reset backgroundcolor */
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {                         /* Remove buttons from last question */
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)  
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {        /* If more questions left show next button */
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'                             /* If no more questions, rename start to restart and show start button */
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {                           /* Set button to correct or wrong */
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {   
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [                                                   /* Array of all questions */
    {
        question: 'question 1',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]