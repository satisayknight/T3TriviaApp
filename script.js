let SESSION_TOKEN = "";

// let Button_Test = document.getElementById("click-test");
// Button_Test.addEventListener("click", getQuizData);

// eventually we need to store the token locally
// and only call this if needed.
window.addEventListener("load", getSessionToken);

/**
 *
 * @param {number} category - a number from 9-32 indicates which category
 * @param {number} numberOfQuestions - a number indicates how many questions are returned range(1-50)
 * @param {string} difficulty - a string on diffuculty of questions "easy","medium","hard"
 * @param {string} typeOfQuestions - a string either boolean for true/fale or multiple choice.
 */
function getQuizData(
  category = 9,
  numberOfQuestions = 10,
  difficulty = "easy",
  typeOfQuestions = "multiple"
) {
  const api_url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${typeOfQuestions}&token=${SESSION_TOKEN}`;

  console.log("Session Token: " + SESSION_TOKEN);

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json['results']);
      console.log(json["results"]);
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