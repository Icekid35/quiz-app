function $(selector, all = false) {
  if (all) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}
let quizData = [{
  question: "Which language runs in a web browser?",
  a: "Java",
  b: "C",
  c: "Python",
  d: "JavaScript",
  correct: "d",
}, {
  question: "What does CSS stand for?",
  a: "Central Style Sheets",
  b: "Cascading Style Sheets",
  c: "Cascading Simple Sheets",
  d: "Cars SUVs Sailboats",
  correct: "b",
}, {
  question: "What does HTML stand for?",
  a: "Hypertext Markup Language",
  b: "Hypertext Markdown Language",
  c: "Hyperloop Machine Language",
  d: "Helicopters Terminals Motorboats Lamborginis",
  correct: "a",
}, {
  question: "What year was JavaScript launched?",
  a: "1996",
  b: "1995",
  c: "1994",
  d: "none of the above",
  correct: "b",
}, ];
let timeEle, timeBarEle, qNumberEle, formEle, nextEle, prevEle, questionEle, boxEle
let main = $("main")
let time, timer, currentQuiz, currentIndex = 1,
  score = 0,
  totalTime = 30
let startEle = $(".start")
startEle.onclick = start

function start() {
  time = undefined
  timer = undefined
  currentQuiz = undefined
  currentIndex = 1
  score = 0
  timeEle = undefined
  quizData = [{
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  }, {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  }, {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  }, {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  }, ];
  initialize(1)
}

function restartTimer() {
  time = totalTime
  timer = setInterval(() => {
    if (time == 0) {
      clearInterval(timer)
      next()
      return
    }
    time -= 1
    timeEle.innerText = time + "s"
    timeBarEle.style.width = (time / totalTime) * 100 + "%"
  }, 1000)
}

function renueEle() {
  timeEle = $(".time")
  timeBarEle = $(".time-left")
  qNumberEle = $(".q-number")
  formEle = $("form")
  nextEle = $(".next")
  prevEle = $(".prev")
  questionEle = $(".question")
  boxEle = $(".box", true)
  createListeners()
}

function initialize(index = 1) {
  currentQuiz = quizData[index - 1]
  console.log(currentQuiz.checked)
  main.innerHTML = `
				<div class="top-bar" >
					<div>Question 
						<span class="q-number">${index}/${quizData.length}</span>
					</div>
					<div class="time" >30s</div>
				</div>
				<div class="time-bar" >
					<div class="time-left" ></div>
				</div>
				<div class="question" >${currentQuiz.question}</div>
				<form>
					<div class="box" >
						<input  name="answer" type="radio" value="a"  ${currentQuiz.checked=="a" ? "checked=checked" :''} />
						<label> ${currentQuiz.a} </label>
					</div>
					<div class="box" >
						<input c name="answer" type="radio" value="b" ${currentQuiz.checked=="b" ? "checked=checked" :''} />
						<label>${currentQuiz.b}</label>
					</div>
					<div class="box" >
						<input value="c" name="answer" type="radio" ${currentQuiz.checked=="c" ? "checked=checked" :''} />
						<label> ${currentQuiz.c} </label>
					</div>
					<div class="box" >
						<input value="d" name="answer" type="radio" ${currentQuiz.checked=="d" ? "checked=checked" :''} />
						<label> ${currentQuiz.d} </label>
					</div>
				</form>
				<div class="bottom-bar" >
					<button class="prev ${index<=1 && 'hidden'}"  >Prev
					</button>
					<button class="next" ${currentQuiz?.checked==undefined ? "disabled=disabled" :''} >${index>=quizData.length ? "See Result" :"Next"}</button>
				</div>`
  renueEle()
  clearInterval(timer)
  restartTimer()
}

function createListeners() {
  /*event listeners */
  boxEle.forEach(box => {
    box.onclick = (e) => {
      boxEle.forEach(box => box.classList.remove("active"))
      box.querySelector("[name]").click()
      box.classList.add("active")
    }
  })
  formEle.onchange = (e) => {
    const answer = e.target.value
    nextEle.removeAttribute("disabled")
    currentQuiz.checked = answer
    if (currentQuiz.isCorrect == true) {
      score -= 1
    }
    if (answer == currentQuiz.correct) {
      score += 1
      currentQuiz.isCorrect = true
    }
  }
  nextEle.onclick = next
  prevEle.onclick = prev
}

function next() {
  currentIndex += 1
  if (currentIndex > quizData.length) {
    return seeResult()
  }
  initialize(currentIndex)
}

function prev() {
  currentIndex -= 1
  initialize(currentIndex)
}

function seeResult() {
  main.innerHTML = `


				<div class="question" > You scored 
					<b>${score}</b> out of 
					<b>${quizData.length}</b>
				</div>
				<button class="start" >Restart</button>
`
  startEle = $(".start")
  startEle.onclick = start
}