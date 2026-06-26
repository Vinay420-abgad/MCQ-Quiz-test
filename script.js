/* ==========================================
   ANSWER KEY
========================================== */

const answers = {

    q1:"A",
    q2:"B",
    q3:"A",
    q4:"B",
    q5:"B",
    q6:"B",
    q7:"B",
    q8:"B",
    q9:"A",
    q10:"D",

    q11:"B",
    q12:"C",
    q13:"C",
    q14:"B",
    q15:"A",
    q16:"C",
    q17:"B",
    q18:"B",
    q19:"D",
    q20:"C",

    q21:"B",
    q22:"C",
    q23:"D",
    q24:"A",
    q25:"A",
    q26:"C",
    q27:"B",
    q28:"B",
    q29:"B",
    q30:"C"

};

const totalQuestions = Object.keys(answers).length;


/* ==========================================
   TIMER
========================================== */

let totalTime = 90 * 60;

const timer = document.getElementById("timer");

let timerInterval = setInterval(function(){

    let minutes = Math.floor(totalTime / 60);

    let seconds = totalTime % 60;

    timer.innerText =
        String(minutes).padStart(2,"0") + ":" +
        String(seconds).padStart(2,"0");

    if(totalTime <= 0){

        clearInterval(timerInterval);

        alert("Time is over! Your test will be submitted automatically.");

        checkAnswers();

    }

    totalTime--;

},1000);


/* ==========================================
   PROGRESS BAR
========================================== */

const radios = document.querySelectorAll("input[type='radio']");

radios.forEach(radio=>{

    radio.addEventListener("change",updateProgress);

});


function updateProgress(){

    let answered = 0;

    for(let key in answers){

        if(document.querySelector(`input[name="${key}"]:checked`)){

            answered++;

        }

    }

    document.getElementById("progressText").innerHTML =
    answered + " / " + totalQuestions + " Answered";

    document.getElementById("progressFill").style.width =
    (answered/totalQuestions)*100 + "%";

}


/* ==========================================
   STUDENT VALIDATION
========================================== */

function validateStudent(){

    const name =
    document.getElementById("studentName").value.trim();

    const roll =
    document.getElementById("rollNo").value.trim();

    if(name===""){

        alert("Please enter your name.");

        return false;

    }

    if(roll===""){

        alert("Please enter your roll number.");

        return false;

    }

    return true;

}


/* ==========================================
   CHECK ANSWERS
========================================== */

function checkAnswers(){

    if(!validateStudent()){
        return;
    }

    let score = 0;
    let attempted = 0;

    // Reset previous highlighting

    document.querySelectorAll(".option").forEach(option=>{

        option.classList.remove("correct");
        option.classList.remove("wrong");

    });


    // Check all questions

    for(let key in answers){

        const selected = document.querySelector(
            `input[name="${key}"]:checked`
        );

        // Question not answered

        if(!selected){

            alert(
                "Please answer all questions before submitting."
            );

            const question = document.querySelector(
                `input[name="${key}"]`
            ).closest(".question");

            question.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;

        }

        attempted++;

        const selectedLabel = selected.parentElement;

        // Correct Answer

        if(selected.value===answers[key]){

            score++;

            selectedLabel.classList.add("correct");

        }

        // Wrong Answer

        else{

            selectedLabel.classList.add("wrong");

            const correctOption = document.querySelector(

                `input[name="${key}"][value="${answers[key]}"]`

            );

            correctOption.parentElement.classList.add("correct");

        }

    }


    showResult(score,attempted);

}


/* ==========================================
   SHOW RESULT
========================================== */

function showResult(score, attempted) {

    // Stop timer
    clearInterval(timerInterval);

    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    let grade = "";
    let status = "";

    if (percentage >= 90) {
        grade = "A+";
        status = "🎉 PASS";
    } else if (percentage >= 80) {
        grade = "A";
        status = "🎉 PASS";
    } else if (percentage >= 70) {
        grade = "B+";
        status = "🎉 PASS";
    } else if (percentage >= 60) {
        grade = "B";
        status = "🎉 PASS";
    } else if (percentage >= 50) {
        grade = "C";
        status = "🎉 PASS";
    } else if (percentage >= 40) {
        grade = "D";
        status = "🎉 PASS";
    } else {
        grade = "F";
        status = "❌ FAIL";
    }

    const wrong = totalQuestions - score;

    const studentName = document.getElementById("studentName").value;
    const rollNo = document.getElementById("rollNo").value;

    const result = document.getElementById("result");

    result.style.display = "block";

    result.innerHTML = `

        <h2>🏆 Biology MCQ Test Result</h2>

        <p><strong>Student Name:</strong> ${studentName}</p>

        <p><strong>Roll Number:</strong> ${rollNo}</p>

        <hr style="margin:20px 0;">

        <p><strong>Total Questions:</strong> ${totalQuestions}</p>

        <p><strong>Attempted:</strong> ${attempted}</p>

        <p><strong>Correct:</strong> ${score} ✅</p>

        <p><strong>Wrong:</strong> ${wrong} ❌</p>

        <p><strong>Percentage:</strong> ${percentage}%</p>

        <p class="grade"><strong>Grade:</strong> ${grade}</p>

        <p class="${grade === "F" ? "fail" : "pass"}">
            <strong>Status:</strong> ${status}
        </p>

    `;

    // Disable all radio buttons
    document.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.disabled = true;
    });

    // Disable student details
    document.getElementById("studentName").disabled = true;
    document.getElementById("rollNo").disabled = true;

    // Disable submit button
    const btn = document.querySelector(".btn");

    btn.disabled = true;
    btn.innerHTML = "✔ Test Submitted";

    // Scroll to result
    result.scrollIntoView({
        behavior: "smooth"
    });

}
