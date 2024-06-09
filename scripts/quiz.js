const startBtn = document.querySelector('.start-btn');
const exitBtn = document.querySelector('.exit');
const continueBtn = document.querySelector('.continue');
const template = document.querySelector('.template');
const questionDuration = 20;
let gAnswer = 0;

const instruction = document.querySelector('.instructions');

startBtn.addEventListener('click', () => {
    if (startBtn) {
        instruction.classList.add('active')
        startBtn.classList.add('active')
    }
});
exitBtn.addEventListener('click', () => {
    if (exitBtn) {
        instruction.classList.remove('active')
        startBtn.classList.remove('active')
    }
});
continueBtn.addEventListener('click', () => {
    if (continueBtn) {
        template.classList.add('active')
        instruction.classList.remove('active')
        displayQuestion();
    }
    });

// Create a quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
}

// Create a question class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
}




// Display question
function displayQuestion() {
    let newQuestion = questions;
    let randomNewQuestion = newQuestion.sort(()=> Math.random() -0.5).slice(0,5);
    quiz.questions = randomNewQuestion;
    console.log(quiz.questions.length);
    console.log(randomNewQuestion);

    let templateItem = () => {
        return `
    <div class=" templatehead">
        <div class="head-title">My Quiz Application</div>
        <div class="timer">
            <span class="text">Time Left</span>
            <span id="num" class="num">15</span>
        </div>
        <div class="loader"></div>
    </div>
   
    <div class="templatefooter">
        <div class="numberofQuestions progress"></div>
        <div class="next">
            <button class="nextBtn">Next Ques</button>
        </div>
    </div>
        
        `}


    function setTimer(timeCont, time) {
        timeCont.style.color = "white";
        let timer = setInterval(() => {
            if (time <= 6) {
                timeCont.style.color = "red";
            }
            if (time <= 0) {
                nextQuestion();
            } else {
                time--;
                timeCont.innerHTML = time;
            }
        }, 1000);
        return { timer }
    }


    let questionMarkup = ({ text, choices, answer }) => {
        gAnswer = answer;
        return `
        <div class="templatebody">
        <div class="question">
            <h1 id="question"> ${quiz.questionIndex + 1 + '.'} ${text} </h1>
        </div>
        <div class="answers">
            <button class="ans" id="btn0">A.
                <span id="choice0">${choices[0]}</span>
            </button>
            <button class="ans" id="btn1">B.
                <span id="choice1">${choices[1]}</span>
            </button>
            <button class="ans" id="btn2">C.
                <span id="choice2">${choices[2]}</span>
            </button>
            <button class="ans" id="btn3">D.
                <span id="choice3">${choices[3]}</span>
            </button>
        </div>
    </div>
        `
    }

    let template = document.querySelector('.template');
    template.innerHTML = templateItem();

    timeCont = document.querySelector('.templatehead .timer .num');

    let time = setTimer(timeCont, questionDuration);

    template = document.querySelector('.template');
    let templateFooter = document.querySelector('.template .templatefooter');

    let nextButton = document.querySelector('.template .templatefooter .next button');

    // template.insertBefore(questionMarkup({ ...questions[quiz.questionIndex] }), templateFooter)
    $(questionMarkup({ ...randomNewQuestion[quiz.questionIndex] })).insertBefore(templateFooter)
    // console.log(answers);
    handleClick()
    function handleClick() {
        let answers = document.querySelectorAll(".template .ans");
        answers.forEach(el => {
            el.addEventListener("click", function () {
                let choice = $(this).find("span").text();
                if (this.classList.contains("answered")) return;
                if (choice.trim() == gAnswer.trim()) {
                    el.classList.add('success')
                    quiz.score++
                } else {
                    el.classList.add('error')
                    answers.forEach(element => {
                        if ($(element).find("span").text() == gAnswer) {
                            element.classList.add('success')
                            element.classList.add('answered')
                           }
                    })
                }
                answers.forEach(element => {
                    if (element != el) {
                        $(element).prop("disabled", true)
                        element.classList.add('disabled');
                    }
                })
                this.classList.add("answered");
            })
        })
    }

    nextButton.onclick = nextQuestion;

    function nextQuestion() {
        quiz.questionIndex++;

        if (quiz.questionIndex >= quiz.questions.length) {
            clearInterval(time.timer)
            nextButton.classList.add('disabled');
            $(nextButton).prop("disabled", true);
            isEnded(showScores())
            return;
        }

        if (quiz.questionIndex >= quiz.questions.length - 1) {
            let next = document.querySelector('.templatefooter .nextBtn')
            next.textContent = "Submit";
        }

        timeCont = document.querySelector('.templatehead .timer .num');
        timeCont.innerHTML = questionDuration;
        clearInterval(time.timer)
        time = setTimer(timeCont, questionDuration);
        let templateBody = document.querySelector('.template .templatebody');

        $(templateBody).replaceWith(questionMarkup({ ...randomNewQuestion[quiz.questionIndex] }))

        console.log(gAnswer);
        handleClick()
        showProgress();
    }
    showProgress();


};

// function is end
function isEnded() {
    return quiz.questionIndex === quiz.questions.length;
}
// show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.querySelector('.progress');
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length} `;
}

// show score
function showScores() {
    let quizEndHTML = `
        <div class="result">
            <div class="resultHead">
                <i class="fas fa-crown"></i>
            </div>
            <div class="resulBody">
                <p>You've Completed the quiz! </p> 
                <p> and nice 
                <span><i class="fas fa-smile"></i></span>, 
                you got ${quiz.score} of ${quiz.questions.length}
                </p>
            </div>
            <div class="resultFooter">
                <button class="endBtn" id="endBtn">End Quiz</button>
            </div>
        </div>
    `
    let congrats = `
        <div class="congrats-message">
            <h2>Thanks For writing My quiz</h2>
            <a href="./index.html">Retake Quiz</a>
        </div>
                `
    let quizCont = document.querySelector('.template');
    quizCont.innerHTML = quizEndHTML;

    let endBtn = document.querySelector('.result .resultFooter .endBtn');
    endBtn.addEventListener('click', () => {
        quizCont.innerHTML = congrats;

    });

}




// create quiz questions
let questions = [
    new Question(
        "Hyper Text Markup Language stands for?", ["JQuery", "HTML", "CSS", "XHTML"], "HTML"
    ),
    new Question(
        "Inside which HTML element do we put the JavaScript?", ["javascript", "scripting", "script", "js"], "script"
    ),
    new Question(
        "What does PHP stand for?", ["HyperText Preprocessor", "None of the options", "Personal HyperText Preprocesspr", "Private Homepage"], "HyperText Preprocessor"
    ),

    new Question(
        "CSS stands for?", ["Cascading SheetStyle", "Cascading StyleSheet", "Computer Science Studies", "Cyber Security Studies"], "Cascading StyleSheet"
    ),

    new Question(
        "Which of these is a programming language", ["Javascript", "CSS", "HTML", "SCSS"], "Javascript"
    ),
    new Question(
        "Which of these is not a programming language", ["Javascript", "Python", "HTML", "C++"], "HTML"
    ),
    new Question(
        "Which of this is not an editor for web development", ["Notepad", "Notebook", "Visual Studio Code", "Atom"], "Notebook"
    )
]

let quiz = new Quiz(questions);

// console.log(quiz.questions);
let random = Math.floor(Math.random() * 5);
let quizRandom = quiz.questions[random];
// console.log(quizRandom);