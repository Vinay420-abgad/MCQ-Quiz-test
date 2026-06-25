function checkAnswers() {

    const answers = {
        q1: "A",
        q2: "B",
        q3: "A",
        q4: "B",
        q5: "B",
        q6: "B",
        q7: "B",
        q8: "B",
        q9: "A",
        q10: "D"
    };

    let score = 0;
    let attempted = 0;
    const totalQuestions = Object.keys(answers).length;

    // Remove previous highlights
    document.querySelectorAll(".option").forEach(option => {
        option.style.backgroundColor = "";
        option.style.borderColor = "";
    });

    for (let key in answers) {

        const selected = document.querySelector(
            `input[name="${key}"]:checked`
        );

        if (selected) {
            attempted++;

            const selectedLabel = selected.parentElement;

            if (selected.value === answers[key]) {
                score++;
                selectedLabel.style.backgroundColor = "#d4edda";
                selectedLabel.style.borderColor = "#28a745";
            } else {
                selectedLabel.style.backgroundColor = "#f8d7da";
                selectedLabel.style.borderColor = "#dc3545";

                // Highlight correct answer
                const correctOption = document.querySelector(
                    `input[name="${key}"][value="${answers[key]}"]`
                );

                correctOption.parentElement.style.backgroundColor = "#d4edda";
                correctOption.parentElement.style.borderColor = "#28a745";
            }
        }
    }

    // Check unanswered questions
    if (attempted < totalQuestions) {
        alert(
            `Please answer all questions.\nAnswered: ${attempted}/${totalQuestions}`
        );
        return;
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    let status = percentage >= 40
        ? "PASS"
        : "FAIL";

    document.getElementById("result").innerHTML = `
        <h2>Your Result</h2>
        <p><strong>Score:</strong> ${score} / ${totalQuestions}</p>
        <p><strong>Percentage:</strong> ${percentage}%</p>
        <p><strong>Status:</strong> ${status}</p>
    `;

    // Disable all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });

    // Disable submit button
    document.querySelector(".btn").disabled = true;
    document.querySelector(".btn").innerText = "Test Submitted";

    // Scroll to result
    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });
}
