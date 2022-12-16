let SESSION_TOKEN = "";
let questionCount = 0;

window.addEventListener("load", getSessionToken);

let Button_Test = document.getElementById("questionButton");

Button_Test.addEventListener("click", getQuizData);

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

        createQuestions(question, answersArray);
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

function createQuestions(question = "PlaceHolder", answers = [1, 2, 3, 4]) {
  questionCount++;

  const questionQuestionContainer =
    document.getElementById("question_container");

  const questionTemplate = `
  <div>
    <b>${questionCount}. ${question}</b>
    <ul>
      <li>${answers[0]}</li>
      <li>${answers[1]}</li>
      <li>${answers[2]}</li>
      <li>${answers[3]}</li>

    </ul>
  <div>
  `;

  questionQuestionContainer.innerHTML += questionTemplate;
}
