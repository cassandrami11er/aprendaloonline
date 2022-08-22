var submitted_answers = [document.forms['reviewTest']['q1']] // array to store the answers submitted by the user
const correct_answers = ["3"] // array of the correct answers
const incorrect_messages = [document.getElementById('q1_incorrect')] // array of the elements in the html that contain the > 
// incorrect messages -- will need to turn these on if the answers are incorrect


function check() {
    // a function to check the users answers

    if (submitted_answers[0].value !== correct_answers[0]) {
        incorrect_messages[0].style.display = "block";
        return false;
    } else {
        incorrect_messages[0].style.display = "none";
    }
}