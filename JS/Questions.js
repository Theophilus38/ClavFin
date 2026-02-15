const question1 = document.querySelector("#qplus1")
const question2 = document.querySelector("#qplus2")
const question3 = document.querySelector("#qplus3")
const question4 = document.querySelector("#qplus4")
const question5 = document.querySelector("#qplus5")
const question6 = document.querySelector("#qplus6")

const answer1 = document.querySelector("#a1")
const answer2 = document.querySelector("#a2")
const answer3 = document.querySelector("#a3")
const answer4 = document.querySelector("#a4")
const answer5 = document.querySelector("#a5")
const answer6 = document.querySelector("#a6")

question1.addEventListener("click", firstAns)
question2.addEventListener("click", secondAns)
question3.addEventListener("click", thirdAns)
question4.addEventListener("click", fourthAns)
question5.addEventListener("click", fifthAns)
question6.addEventListener("click", sixthAns)



function firstAns() {
    if (answer1.style.display === "block") {
        answer1.style.display = "none"
        question1.textContent = "+"
        question1.style.backgroundColor = "transparent"
        question1.style.color = "black"

    } else {
        answer1.style.display = "block"
        question1.textContent = "x"
        question1.style.backgroundColor = "#000814"
        question1.style.color = "#ffff"
    }
}


function secondAns() {
    if (answer2.style.display === "block") {
        answer2.style.display = "none"
        question2.textContent = "+"
        question2.style.backgroundColor = "transparent"
        question2.style.color = "black"

    } else {
        answer2.style.display = "block"
        question2.textContent = "x"
        question2.style.backgroundColor = "#000814"
        question2.style.color = "#ffff"
    }
}


function thirdAns() {
    if (answer3.style.display === "block") {
        answer3.style.display = "none"
        question3.textContent = "+"
        question3.style.backgroundColor = "transparent"
        question3.style.color = "black"

    } else {
        answer3.style.display = "block"
        question3.textContent = "x"
        question3.style.backgroundColor = "#000814"
        question3.style.color = "#ffff"
    }
}


function fourthAns() {
    if (answer4.style.display === "block") {
        answer4.style.display = "none"
        question4.textContent = "+"
        question4.style.backgroundColor = "transparent"
        question4.style.color = "black"

    } else {
        answer4.style.display = "block"
        question4.textContent = "x"
        question4.style.backgroundColor = "#000814"
        question4.style.color = "#ffff"
    }
}

function fifthAns() {
    if (answer5.style.display === "block") {
        answer5.style.display = "none"
        question5.textContent = "+"
        question5.style.backgroundColor = "transparent"
        question5.style.color = "black"

    } else {
        answer5.style.display = "block"
        question5.textContent = "x"
        question5.style.backgroundColor = "#000814"
        question5.style.color = "#ffff"
    }
}


function sixthAns() {
    if (answer6.style.display === "block") {
        answer6.style.display = "none"
        question6.textContent = "+"
        question6.style.backgroundColor = "transparent"
        question6.style.color = "black"

    } else {
        answer6.style.display = "block"
        question6.textContent = "x"
        question6.style.backgroundColor = "#000814"
        question6.style.color = "#ffff"
    }
}
