let SESSION_TOKEN = "";
let questionCount = 0;

// window.addEventListener("load", getSessionToken);
//test

const Button_Test = document.getElementById("questionButton");
const sumbitButton = document.getElementById("sumbit_button");
let correctAnswers = [];

Button_Test.addEventListener("click", getQuizData);
sumbitButton.addEventListener("click", questionValidation);


/**
 *
 * @param {number} category - a number from 9-32 indicates which category
 * @param {number} numberOfQuestions - a number indicates how many questions are returned range(1-50)
 * @param {string} difficulty - a string on diffuculty of questions "easy","medium","hard"
 * @param {string} typeOfQuestions - a string either boolean for true/fale or multiple choice.
 */
function getQuizData(
  event,
  category = "9",
  numberOfQuestions = "10",
  difficulty = "easy",
  typeOfQuestions = "multiple"
) {
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
        let correctAnswer = questions[index].correct_answer;;
        answersArray.push(correctAnswer);
        correctAnswers.push(decodeHtml(correctAnswer));

        populateQuestions(question, answersArray);
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




function populateQuestions(question = "PlaceHolder", answers = [1, 2, 3, 4]) {
  questionCount++;

  const questionQuestionContainer =
    document.getElementById("question_container");



  // const questionTemplate = `
  // <div>
  //   <b>${questionCount}. ${question}</b>
  //   <ul>
  //     <li>${answers[0]}</li>
  //     <li>${answers[1]}</li>
  //     <li>${answers[2]}</li>
  //     <li>${answers[3]}</li>

  //   </ul>
  // <div>
  //   // `;

  //   <div class="card">
  //   <div class="card-body">
  //     This is some text within a card body.
  //   </div>
  // </div>


  const questionTemplate = `
  <div class="card">
  <div class="card-body">
    <b>${questionCount}. ${question}</b>
    <ul>
      <li><input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}0">
      <label class="form-check-label" for="flexRadioDefault${questionCount}0">
      ${answers[0]}
      </label></li>
      <li><input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}1">
      <label class="form-check-label" for="flexRadioDefault${questionCount}1">
      ${answers[1]}
      </label></li>
      <li><input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}2">
      <label class="form-check-label" for="flexRadioDefault${questionCount}2">
      ${answers[2]}
      </label></li>
      <li><input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}3">
      <label class="form-check-label" for="flexRadioDefault${questionCount}3">
      ${answers[3]}
      </label></li>
    </ul>
    </div>
    </div>    
        `;

  questionQuestionContainer.innerHTML += questionTemplate;
}


function questionValidation() {

  let questionsChecked = 0;
  let questionsCorrect = 0;

  const questionRadioButtons = document.querySelectorAll('[id ^= "flexRadio"]');
  let temp = [];
  console.log(questionRadioButtons);



  questionRadioButtons.forEach(element => {
    if (element.checked) {
      questionsChecked++;
      console.log("Checked: " + questionsChecked);
      temp.push(element)
    }else{

    }
  });

  if (questionsChecked != 10) {
    // pop up some alert here
  } else {
    // send to modal?
    temp.forEach(element => {
      // console.log(element.id);

      let labelTest = document.querySelector(`[for ^= "${element.id}"]`);
      let stringTest  = labelTest.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
      console.log(stringTest);
      console.log(typeof stringTest);
      // console.log(correctAnswers);

      if (correctAnswers.includes(stringTest)) {
        console.log('✅ String is contained in Array');
        questionsCorrect++;
      } else {
        console.log('⛔️ String is NOT contained in Array');
      }

    });


  }

  console.log("Questions correct: " + questionsCorrect);
  console.log(correctAnswers);




};

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}