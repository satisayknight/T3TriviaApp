let SESSION_TOKEN = "";
let questionCount = 0;

// window.addEventListener("load", getSessionToken);
//test

const Button_Test = document.getElementById("questionButton");
// const sumbitButton = document.getElementById("sumbit_button");
const general_knowledge = document.getElementById("general_knowledge");

let correctAnswers = [];

// Button_Test.addEventListener("click", getQuizData);

if (general_knowledge) {
  general_knowledge.addEventListener("click", getQuizData);
}

// if (true) {
//   console.log(window.location.hash);
//   console.log("Here");
// }

// if (document.readyState === 'complete'){
//   console.log(window.location);
//   console.log("Here");
// };

/**
 *
 * @param {number} category - a number from 9-32 indicates which category
 * @param {number} numberOfQuestions - a number indicates how many questions are returned range(1-50)
 * @param {string} difficulty - a string on diffuculty of questions "easy","medium","hard"
 * @param {string} typeOfQuestions - a string either boolean for true/fale or multiple choice.
 */
export function getQuizData(
  event,
  category = "9",
  numberOfQuestions = "10",
  difficulty = "easy",
  typeOfQuestions = "multiple"
) {
  // window.location='trivia_game.html';

  const api_url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${typeOfQuestions}&token=${SESSION_TOKEN}`;

  console.log("URL:" + api_url);

  // console.log("Session Token: " + SESSION_TOKEN);

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json["results"]);
      // console.log(json);

      let questions = json["results"];

      for (let index = 0; index < questions.length; index++) {
        let question = questions[index].question;
        let answersArray = questions[index].incorrect_answers;
        let correctAnswer = questions[index].correct_answer;
        answersArray.push(correctAnswer);
        correctAnswers.push(decodeHtml(correctAnswer));

        //shuffle array here
        // answersArray = _.shuffle(answersArray)

        populateQuestions(question, answersArray);

        // Button_Test.disabled = true;
      }
      // console.log(json["results"]);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Grabs a session token from the opentdb api
 * ensures that we do not get the same questions if
 * if querying from the same token
 */
function getSessionToken() {
  const sessionUrl = "https://opentdb.com/api_token.php?command=request";

  fetch(sessionUrl)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      SESSION_TOKEN = json["token"];
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Populates questions that are passed into the question container div
 * @param {number} question - a number from 9-32 indicates which category
 * @param {number} answers - a number indicates how many questions are returned range(1-50)
 */
function populateQuestions(question = "PlaceHolder", answers = [1, 2, 3, 4]) {
  questionCount++;

  const questionQuestionContainer =
    document.getElementById("question_container");

  // <li><input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}3" checked>

  const questionTemplate = `
  <div class="question-card">
  <div class="card-body">
    <b>${questionCount}. ${question}</b>
    <div class="form-group">
    <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}0">
      <label class="form-check-label" for="flexRadioDefault${questionCount}0">
      ${answers[0]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}1">
      <label class="form-check-label" for="flexRadioDefault${questionCount}1">
      ${answers[1]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}2">
      <label class="form-check-label" for="flexRadioDefault${questionCount}2">
      ${answers[2]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}3">
      <label class="form-check-label" for="flexRadioDefault${questionCount}3">
      ${answers[3]}
      </label>
      </div>
      </div>
 
    </div>
    </div>    
        `;

  questionQuestionContainer.innerHTML += questionTemplate;
}

export function questionValidation() {
  let questionsChecked = 0;
  let questionsCorrect = 0;

  const questionRadioButtons = document.querySelectorAll('[id ^= "flexRadio"]');
  let temp = [];
  console.log(questionRadioButtons);

  questionRadioButtons.forEach((element) => {
    if (element.checked) {
      questionsChecked++;
      console.log("Checked: " + questionsChecked);
      temp.push(element);
    } else {
    }
  });

  if (questionsChecked != 10) {
    // document.prepend(incompleteQuestionAlert);

    showalert();
  } else {
    // send to modal?
    temp.forEach((element) => {
      // console.log(element.id);

      let elementLabal = document.querySelector(`[for ^= "${element.id}"]`);
      let labelAnswerText = labelTest.textContent
        .replace(/[\n\r]+|[\s]{2,}/g, " ")
        .trim();

      // console.log(stringTest);
      // console.log(typeof stringTest);
      // console.log(correctAnswers);

      if (correctAnswers.includes(labelAnswerText)) {
        console.log("✅ String is contained in Array");
        questionsCorrect++;
      } else {
        console.log("⛔️ String is NOT contained in Array");
      }
    });
  }
  console.log("Questions correct: " + questionsCorrect);
  console.log(correctAnswers);
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showalert() {
  let test = document.getElementById("alert_placeholder");

  const incompleteQuestionAlert = ` 
  <div class="alert alert-warning" role="alert">
  Please complete all questions before submitting!
  </div>`;

  test.innerHTML = incompleteQuestionAlert;

  setTimeout(function () {
    // this will automatically close the alert and remove this if the users doesnt close it in 5 secs

    test.innerHTML = "";
  }, 5000);
}
