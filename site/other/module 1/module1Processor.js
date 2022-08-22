const question = document.getElementById("question"); //the question element in the html
const answer_choice_radios = [document.getElementById("answer_choice_0"), document.getElementById("answer_choice_1"), 
document.getElementById("answer_choice_2"), document.getElementById("answer_choice_3")]; 
// the answer option radio button elements in the html
const incorrect_message = document.getElementById('incorrect_message') // the incorrect message element in the html
const correct_message = document.getElementById('correct_message') // the correct message element in the html
const incorrect_text = document.getElementById('incorrect_text')
const correct_text = document.getElementById('correct_text')
const q_button = document.getElementById("q_button"); //the submit/next button element in the html
var q_button_state = true; // true means that the q_button is on "Submit", false means the q_button is on "Next"

const questions = ["The number 143 is written and pronounced as:", 
"The first day of the week in the American calendar is:", 
"Complete the sentence with the correct pronoun: My little brother lost ____ phone and has to stay with me so he doesn't get lost.",
"Complete the sentence with the most appropriate pronoun: My family went to the park yesterday with _____ cousins.",
'Select the correct form of the verb "to be" to complete the sentence:  My cousin ____ six (6) years old.']; 
//array of the question text
const answer_choices = [["One-four-three", "Fourteen-three", "One hundred-forty-three", "One-thirteen"], 
["Tuesday", "Sunday", "Friday", "Wednesday"], 
["their", "my", "his", "its"],
["our","its","their","my"],
["am","be","are","is"]];
//array of the answer choices for each question
const correct_answers = ["2", "1", "2", "0", "3"] // array of the correct answers

var i = 0; //tracks the question we are on
var submitted_answers = [] // the answers submitted by the user
var user_correct_answers = [] //tracks which questions the user has gotten right/wrong

question.textContent = questions[i];
answer_choice_radios[0].textContent = answer_choices[i][0];
answer_choice_radios[1].textContent = answer_choices[i][1];
answer_choice_radios[2].textContent = answer_choices[i][2];
answer_choice_radios[3].textContent = answer_choices[i][3];

function q_button_clicked() {
    //function that goes off when the q_button (the Submit/Next) is clicked
    if (q_button_state == true) {
        //for when the q_button is a submit button, we go to the submit() function
        submit()
    } else if (q_button_state == false) {
        //when the q_button is a next button, we go to the next() function
        next();
    }
};

function submit() {
    //function for when the q_button is used to submit a multiple choice answer

    submitted_answers.push(document.forms['reviewTest']['q'].value); //add the submitted answer to the array of answers
    if (submitted_answers[i] !== correct_answers[i]) {
        //if the answer submitted is incorrect
        correct_message.style.display = "none"; //hide the correct message
        incorrect_text.textContent = "❌ " + "Incorrect - the correct answer is " + '"'+ answer_choices[i][(parseInt(correct_answers[i]))] + '"'; 
        //update the incorrect message for this question
        incorrect_message.style.display = "block"; //show the incorrect message
        
        user_correct_answers.push(false); //update the user answers array to show that the user got this question wrong
    } else if (submitted_answers[i] === correct_answers[i]) {
        //if the answer submitted is correct
        incorrect_message.style.display = "none"; //hide the incorrect message
        correct_text.textContent = "✅ " + '"' + answer_choices[i][(parseInt(correct_answers[i]))] + '"' + " is correct. Nice job!"; //update the correct message
        correct_message.style.display = "block"; //show the correct message

        user_correct_answers.push(true) //update the user answers array to show that the user got this question right
    }

    //change the q_button to be next
    q_button.textContent = "Next"; 
    q_button_state = false; 
}

function next() {
    //function for when the q_button is used to go to the next multiple choice question
    incorrect_message.style.display = "none";
    correct_message.style.display = "none";
    //hide the incorrect and correct messages

    i++; //increase the question # by 1

    //change the text of the question and the answer choices so it is the next question and next set of answer choices
    question.textContent = questions[i];
    answer_choice_radios[0].textContent = answer_choices[i][0];
    answer_choice_radios[1].textContent = answer_choices[i][1];
    answer_choice_radios[2].textContent = answer_choices[i][2];
    answer_choice_radios[3].textContent = answer_choices[i][3];

    //change the q_button back to submit
    q_button.textContent = "Submit";
    q_button_state = true;
}