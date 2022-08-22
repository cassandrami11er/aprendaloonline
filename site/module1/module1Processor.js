//REVIEW TEST CODE
const question = document.getElementById("question"); //the question element in the html
const multiple_choice_qs = document.getElementsByClassName('multiple_choice');
const multiple_choice_radios = [document.getElementById("answer_choice_0"), document.getElementById("answer_choice_1"), 
document.getElementById("answer_choice_2"), document.getElementById("answer_choice_3")]; 
// the answer option radio button elements in the html
const fill_in_spot = document.getElementById('fill_in');
const checking_message = document.getElementById('checking_message'); // the correct message element in the html
const checking_text = document.getElementById('checking_text');
const completed_message = document.getElementById('completed_message');
const completed_text = document.getElementById('completed_text');
const completed_text_arr = document.getElementsByClassName('completed_text_byq');
const q_button = document.getElementById("q_button"); //the check/next button element in the html
var q_button_state = 0; // 0 = "Check", 1 = "Next", 2 = "Complete"
const breaks = document.getElementsByClassName('breaks');
const module2_button = document.getElementById('module2_button');
const all_correct = document.getElementById('all_correct');

const questions = ["The number 143 is written \n and pronounced as:", 
"The first day of the week in the American calendar is:", 
"Complete the sentence with the correct pronoun: My little brother lost ____ phone and has to stay with me so he doesn't get lost.",
"Write the most appropriate pronoun: My family went to the park yesterday with _____ cousins.",
'Select the correct form of the verb "to be" to complete the sentence:  My cousin ____ six (6) years old.',
'Write the correct form of the verb "to be" to complete the sentence: My friends and I ____ all from the same town.']; 
//array of the question text
const answer_choices = [["One-four-three", "Fourteen-three", "One hundred-forty-three", "One-thirteen"], 
["Tuesday", "Sunday", "Friday", "Wednesday"], 
["their", "my", "his", "its"],
"0",
["am","be","are","is"],
"0"];
const question_types = [0,0,0,1,0,1] // 0 = multiple choice, 1 = fill in the blank
//array of the answer choices for each question
const correct_answers = ["2", "1", "2", "our", "3", "are"] // array of the correct answers

var i = 0; //tracks the question we are on
var submitted_answers = [] // the answers submitted by the user
var user_correct_answers = [] //tracks which questions the user has gotten right/wrong


//set up the first question
question.textContent = (i+1).toString() + ". " + questions[i];
multiple_choice_radios[0].textContent = answer_choices[i][0];
multiple_choice_radios[1].textContent = answer_choices[i][1];
multiple_choice_radios[2].textContent = answer_choices[i][2];
multiple_choice_radios[3].textContent = answer_choices[i][3];

//VIDEO PANELS CODE
const vid_buttons = document.getElementsByClassName("video_title");
const vid_content = document.getElementsByClassName("video_content");
var showing_vid = Array(vid_buttons.length).fill(false);
var start = Array(vid_buttons.length).fill(true);


function open_close_vid(ind) {
    //function to open and close the video content panels
    if (start[ind] === true) {
        vid_content[ind].style.display="block";
        vid_buttons[ind].style.marginBottom = "0px";
        showing_vid[ind] = true;
        start[ind] = false;
    } else if (showing_vid[ind] === false) {
        vid_content[ind].style.display="block";
        vid_buttons[ind].style.marginBottom = "0px";
        showing_vid[ind] = true;
    } else {
        vid_content[ind].style.display="none";
        vid_buttons[ind].style.marginBottom = "10px";
        showing_vid[ind] = false;
    }
}


function q_button_clicked() {
    //function that goes off when the q_button is clicked
    if (q_button_state === 0) {//if q_button is check button --> go to the check() function
        check()
    } else if (q_button_state === 1) {//if q_button is a next button --> go the next() function
        next();
    } else if (q_button_state === 2) {
        completed();
    }
}

function check() {
    //function for when the q_button is used to check an answer

    //get the user's answer
    if (question_types[i] === 0) {//if the question was an MCQ --> gets user answer
        answer = document.forms['reviewTest']['q'].value; //get the answer
    } else if (question_types[i] === 1) {//if the question was a fill in --> gets user answer
        //if the question was a fill in the blank
        a = document.getElementById('fill_in').value;
        answer = a.toLowerCase().trim();
    }
    submitted_answers.push(answer); //add the answer to the array

    //find the text of the correct answer to display to the user
    if (question_types[i] === 0) {//if question is MCQ --> finds correct answer text
        corr_ans = answer_choices[i][(parseInt(correct_answers[i]))];
    } else if (question_types[i] === 1) {//if question is fill in the blank --> finds correct answer text
        corr_ans = correct_answers[i].toString();
    }

    //check the user answer against the submitted answer and display the appropriate message
    if (submitted_answers[i] !== correct_answers[i]) {//if the answer submitted is incorrect --> shows correct message
        checking_text.textContent = "❌ " + "Incorrect - the correct answer is " + '"'+ corr_ans + '"'; //update the incorrect message
        checking_message.style.backgroundColor = "#fcb6b6";
        checking_message.style.border = "2px solid #780404";
        checking_message.style.display = "block"; //show the incorrect message
        user_correct_answers.push(false); //update the user answers array to show that the user got this question wrong
    } else if (submitted_answers[i] === correct_answers[i]) {//if the answer submitted is correct --> shows incorrect message
        checking_text.textContent = "✅ " + '"' + corr_ans + '"' + " is correct. Nice job!"; //update the correct message
        checking_message.style.backgroundColor = "#b6fcbd";
        checking_message.style.border = "2px solid green";
        checking_message.style.display = "block"; //show the correct message
        user_correct_answers.push(true) //update the user answers array to show that the user got this question right
    }

    if (i === questions.length-1) {
        q_button.textContent = "Complete"; 
        q_button_state = 2; 
    } else {
        q_button.textContent = "Next"; 
        q_button_state = 1; 
    }
    
}

function next() {
    //function for when the q_button is used to go to the next multiple choice question
    checking_message.style.display = "none";
    //hide the incorrect and correct messages

    i++; //increase the question # by 1

    //updates the question text to be that of the next question
    question.textContent = (i+1).toString() + ". " + "\n" + questions[i];

    //updates the answer slot (and choices if an MCQ) to be that of the next question
    if (question_types[i] === 0) {//if next question is MCQ --> goes to the next question

        fill_in_spot.style.display = "none"; //hide the fill in the blank spot
        //update the radio buttons to have this question's options, and show the radio buttons
        for (ind = 0; ind < 4; ind++) {
            multiple_choice_radios[ind].textContent = answer_choices[i][ind];
            multiple_choice_qs[ind].style.display = "block";
        }
    } else if (question_types[i] === 1) {//if  next question is fill in --> goes to next question
        //hide the radio buttons
        for (ind = 0; ind < 4; ind++) {
            multiple_choice_qs[ind].style.display = "none";
        }
        fill_in_spot.style.display = "block"; //show the fill in the blank spot
    }

    //change the q_button back to Check
    q_button.textContent = "Check";
    q_button_state = 0;
}

function completed() {
    checking_message.style.display = "none";
    question.style.display = "none";
    for (var k=0;k<breaks.length;k++) {
        breaks[k].style.display = "none";
    }
    for (var j=0; j<4; j++) {
        multiple_choice_qs[j].style.display = "none";
    }
    fill_in_spot.style.display = "none";
    all_correct.style.display = "none";
    module2_button.style.display = "none";
    num_correct = user_correct_answers.filter(ans => ans == true).length;
    num_total = questions.length.toString();
    completed_text.textContent = "Congrats for completing the Module 1 review test! You got " + num_correct + " out of " + num_total + " correct.";
    completed_message.style.display = "block";
    for (j=0;j<questions.length;j++) {
        message = "Question " + (j+1).toString() + ": ";
        if (user_correct_answers[j] === true) {
            message = message + "Correct ✅";
        } else {
            message = message + "Incorrect ❌";
        }
        completed_text_arr[j].textContent = message;
    }
    q_button.style.display = "none";

    if (num_correct === parseInt(num_total)) {
        all_correct.textContent = "Since you did so well on Module 1, we recommend that you go to Module 2!"
        module2_button.style.display="block";
        all_correct.style.display = "block";
    }
}

