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
const answerImageElement = document.getElementById('answerImage')
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
    answerImageElement.src = answerText.image
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
    scoreElement.innerText = 'Du svarte riktig p?? ' + score + ' sp??rsm??l.\n Uansett om dette var helt ny informasjon eller ikke, s?? er det fortsatt mye du kan gj??re.'
    finalElement.innerText = finalText
    finishButton.classList.add('hide')
}
const questions = [                                                   /* Array of all questions */
    {
        question: 'Hvor mange liter vann trenger man for ?? lage en t-skjorte av bomull?',
        answers: [
            { text: '600 liter', correct: false },
            { text: '1400 liter', correct: false },
            { text: '3300 liter', correct: false },
            { text: '2700 liter', correct: true }
        ]
    },
    {
        question: 'Hvor mange plagg kj??per gjennomsnittlig en person i ??ret?',
        answers: [
            { text: '68', correct: true },
            { text: '11', correct: false },
            { text: '4', correct: false },
            { text: '34', correct: false }
        ]
    },
    {
        question: 'Mikroplast er sm?? partikler av plast som har st??rrelse mellom 0,001 og 5 millimeter. Hvor mange prosent av mikroplasten i havet kommer fra syntetiske kl??r?',
        answers: [
            { text: '5%', correct: false },
            { text: '50%', correct: false },
            { text: '35%', correct: true },
            { text: '15%', correct: false }
        ]
    },
    {
        question: 'Gjennomsnittlig hvor mange ganger blir et klesplagg brukt f??r det kastes?',
        answers: [
            { text: '7', correct: true },
            { text: '15', correct: false },
            { text: '32', correct: false },
            { text: '51', correct: false }
        ]
    },
    {
        question: 'Hvilken av t-skjortene er kj??pt p?? en bruktbutikk?',
        answers: [
            { text: 'A', correct: false },
            { text: 'B', correct: true }
        ]
    }
]

const answerTexts = [
    {
        answerText: 'For ?? lage en enkelt t-skjorte trenger man 2700 liter vann.\n\n Det er like mye vann som en voksen drikker i l??pet av 3 ??r.',
        image: 'waterbottle.gif'
    },
    {
        answerText: 'En person kj??per gjennomsnittlig 68 plagg i ??ret.\n\n Hvis du husker tilbake til forrige skjerm,\n kan det kreve 183 600 liter vann ?? lage s?? mange klesplagg.\n\n Det er like mye vann som en voksen drikker i l??pet av 204 ??r!\n',
        image: 'clothesthrowaway.jpg'
    },
    {
        answerText: 'Hele 35% av all mikroplasten i havet kommer fra syntetiske kl??r.\n\n Mikroplast skader selv de minste organismene som lever i havet, deriblandt fisken vi spiser.\n\n N??r fisk spiser mikroplast kan de bli alvorlig syke, og i verstefall d??.',
        image: 'fish.gif'
    },
    {
        answerText: 'I gjennomsnitt brukes et klesplagg kun 7 ganger f??r det kastes.\n\n Det er ogs?? mange klesplagg som aldri blir brukt i det hele tatt.\n\n ?? bruke kl??r du allerede har kan gj??re en enorm forskjell!\n',
        image: 'clothesbin.gif'
    },
    {
        answerText: 'Det ?? kj??pe brukt kan spare milj??et enormt mye,\n og det finnes massevis av brukte kl??r som ser helt nye ut.\n\n Det er ogs?? lurt ?? h??re med eldre familiemedlemmer om de har noen gamle kl??r fra n??r de var unge, det finnes mange muligheter!\n',
        image: 'thrift.jpg'
    }
]

const finalText = 'Om du vil vite mer om dette eller om hva du kan gj??re,\n scan QR-koden ved utgangen!'
