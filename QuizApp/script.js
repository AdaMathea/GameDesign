/* Global constants */
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const infoButton = document.getElementById('info-btn')
const finishButton = document.getElementById('finish-btn')
const questionContainerElement = document.getElementById('question-container')
const answerTextContainerElement = document.getElementById('answerText-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const answerTextsElement = document.getElementById('answerText')
const finalTextElement = document.getElementById('final-text-container')
const finalElement = document.getElementById('final-text')
const scoreElement = document.getElementById('score-text')

/* Values to be set at a later time */
let currentQuestionIndex
let score
var clicked

/* Sets what start and next button does when clicked */
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
infoButton.addEventListener('click', setNextAnswer)
finishButton.addEventListener('click', finalPage)

/* When start is pressed do this */
function startGame() {
    console.log('Started')                                            /* Write in log that game has started, can be seen when using inspect element */
    startButton.classList.add('hide')                                 /* Hide startbutton when pressed */
    currentQuestionIndex = 0
    score = 0                      
    setNextQuestion()                                                 /* Run this function */
}

function setNextAnswer() {
    resetAnswerState()
    showAnswer(answerTexts[currentQuestionIndex])
}

function setNextQuestion() {
    resetQuestionState()
    showQuestion(questions[currentQuestionIndex])             /* Show the next question based on index */
}

function showQuestion(question) {
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

function showAnswer(answerText) {
    answerTextsElement.innerText = answerText.answerText
    infoButton.classList.add('hide')

    if (questions.length > currentQuestionIndex + 1) {        /* If more questions left show next button */
        nextButton.classList.remove('hide')
    }
    else {                           /* If no more questions, finish quiz and show score */
        finishButton.classList.remove('hide')
        nextButton.classList.add('hide')
    }
}

function resetQuestionState() {
    nextButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')  
    answerTextContainerElement.classList.add('hide')
    clearStatusClass(document.body)                                   /* Reset backgroundcolor */
    while (answerButtonsElement.firstChild) {                         /* Remove buttons from last question */
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)  
    }
}

function resetAnswerState() {
    questionContainerElement.classList.add('hide')  
    nextButton.classList.add('hide')
    answerTextContainerElement.classList.remove('hide')
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        score++
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.disabled = true
    })
    if (questions.length > currentQuestionIndex + 1) {        /* If more questions left show next button */
        infoButton.classList.remove('hide')
    }
    else {                           /* If no more questions, finish quiz and show score */
        infoButton.classList.remove('hide')
        nextButton.classList.add('hide')
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

function finalPage() {
    resetQuestionState()
    questionContainerElement.classList.add('hide')
    finalTextElement.classList.remove('hide')
    scoreElement.innerText = 'This is the end of the quiz, final score is ' + score
    finalElement.innerText = finalText
    finishButton.classList.add('hide')
}
const questions = [                                                   /* Array of all questions */
    {
        question: 'Hvor mange liter vann trenger man for å dyrke nok bomull til en t-skjorte?',
        answers: [
            { text: '600 liter', correct: false },
            { text: '1700 liter', correct: false },
            { text: '1100 liter', correct: false },
            { text: '2700 liter', correct: true }
        ]
    },
    {
        question: 'Hvor mye bomull dyrkes i verden på ett år?',
        answers: [
            { text: '999 000 kg', correct: false },
            { text: '22.7 millioner tonn', correct: true },
            { text: '3,5 tusen tonn', correct: false },
            { text: '11 tonn', correct: false }
        ]
    },
    {
        question: 'Hvilket av disse stoffene er laget av olje?',
        answers: [
            { text: 'Polyester', correct: true },
            { text: 'Silke', correct: false },
            { text: 'Lin', correct: false },
            { text: 'Bomull', correct: false }
        ]
    }
]

const answerTexts = [
    {
        answerText: 'This is the answer Thats cool',
    },
    {
        answerText: 'This is the second answer\nThat\'s super cool',
    },
    {
        answerText: 'This is the third answer\nThat\'s mega cool',
    }
]

const finalText = 'This is more info'
