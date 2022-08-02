var question1 = document.forms['reviewTest']['question1']

var question1_wrong = document.getElementById('question1_wrong')

function check() {
    if (question1.value !== "3") {
        question1_wrong.style.display = "block";
        return false;
    }
}