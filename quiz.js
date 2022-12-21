const SESSION_TOKEN = "";

let questionCount = 0;
let correctAnswers = [];

const sumbitButton = document.getElementById("submit_button");
const gifs_container = document.getElementById("gifs_container");
quiz_title.innerHTML = localStorage.getItem("Title");
window.addEventListener("load", getQuizData);

// sumbitButton.addEventListener("click", gif_Retrieval);
// sumbitButton.addEventListener("click", modalTextData);

sumbitButton.addEventListener("click", () => {
  gif_Retrieval();
  modalTextData();
});

/**
 *
 * @param {number} category - a number from 9-32 indicates which category
 * @param {number} numberOfQuestions - a number indicates how many questions are returned range(1-50)
 * @param {string} difficulty - a string on diffuculty of questions "easy","medium","hard"
 * @param {string} typeOfQuestions - a string either boolean for true/fale or multiple choice.
 */
function getQuizData(
  event,
  category = localStorage.getItem("category"),
  numberOfQuestions = "10",
  difficulty = "easy",
  typeOfQuestions = "multiple"
) {
  // let category = localStorage.getItem("category");

  const api_url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${typeOfQuestions}&token=${SESSION_TOKEN}`;

  console.log("URL:" + api_url);

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json["results"]);

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
      }
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
  let randomize_numbers = [0, 1, 2, 3];
  randomize_numbers = _.shuffle(randomize_numbers);

  const questionQuestionContainer =
    document.getElementById("question_container");

  const questionTemplate = `
  <div class="question-card">
  <div class="card-body">
    <b>${questionCount}. ${question}</b>
    <div class="form-group">
    <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}0">
      <label class="form-check-label" for="flexRadioDefault${questionCount}0">
      ${answers[randomize_numbers[0]]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}1">
      <label class="form-check-label" for="flexRadioDefault${questionCount}1">
      ${answers[randomize_numbers[1]]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}2">
      <label class="form-check-label" for="flexRadioDefault${questionCount}2">
      ${answers[randomize_numbers[2]]}
      </label>
      </div>
      <div>
      <input class="form-check-input" type="radio" name="flexRadioDefault${questionCount}" id="flexRadioDefault${questionCount}3">
      <label class="form-check-label" for="flexRadioDefault${questionCount}3">
      ${answers[randomize_numbers[3]]}
      </label>
      </div>
      </div>
 
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
  let unchecked = [];
  console.log(questionRadioButtons);

  questionRadioButtons.forEach((element) => {
    if (element.checked) {
      questionsChecked++;
      console.log("Checked: " + questionsChecked);
      temp.push(element);
    } else {
      unchecked.push(element);
    }
  });

  if (questionsChecked != 10) {
    showalert();
    return -1;
  } else {
    document.getElementById("submit_button").disabled = true;
    temp.forEach((element) => {
      let elementLabal = document.querySelector(`[for ^= "${element.id}"]`);
      let labelAnswerText = elementLabal.textContent
        .replace(/[\n\r]+|[\s]{2,}/g, " ")
        .trim();
      //change all the correct answers to green
      if (correctAnswers.includes(labelAnswerText)) {
        console.log("✅ String is contained in Array");
        questionsCorrect++;
        element.style.background = "#08fc7e";
      } else {
        console.log("⛔️ String is NOT contained in Array");
        element.style.background = "#f52c03";
        unchecked.forEach((element) => {
          let elementLabal = document.querySelector(`[for ^= "${element.id}"]`);
          let labelAnswerText = elementLabal.textContent
            .replace(/[\n\r]+|[\s]{2,}/g, " ")
            .trim();
          if (correctAnswers.includes(labelAnswerText)) {
            console.log(" String contained in Unchecked");
            element.style.background = "#08fc7e";
            element.disabled = true;
          } else {
            element.disabled = true;
          }
        });

        // let test = element.parentNode.parentNode.childNodes;
        // test.forEach(function (item) {
        //   console.log(item);
        // });
      }
    });
  }
  console.log("Questions correct: " + questionsCorrect);
  console.log(correctAnswers);

  return questionsCorrect;
}

function decodeHtml(html) {
  const tempTxt = document.createElement("textarea");
  tempTxt.innerHTML = html;
  return tempTxt.value;
}

function showalert() {
  const alertContainer = document.getElementById("alert_placeholder");

  const incompleteQuestionAlert = ` 
  <div class="alert alert-warning alert-fixed" role="alert">
  Please complete all questions before submitting!
  </div>`;

  alertContainer.innerHTML = incompleteQuestionAlert;

  setTimeout(function () {
    alertContainer.innerHTML = "";
  }, 5000);
}

function modalTextData() {
  let txt;
  let text;
  let questionsCorrect = questionValidation();
  console.log("my func" + questionsCorrect);
  if (questionsCorrect === -1) {
    txt = "Incomplete";
    text = "Complete All Questions...!!!";
  } else if (questionsCorrect >= 7) {
    txt = "You WIN!";
    text = "Great Job...!!!";
  } else {
    txt = "You Lose!";
    text = "Better Luck Next Time!!!";
  }
  document.getElementById("exampleModalLabel").innerHTML = txt;
  document.getElementById("modal_text").innerHTML = text;
}

function gif_Retrieval() {
  let questionsCorrect = questionValidation();
  let randomnumber = Math.floor(Math.random() * 50);
  let txt;
  gifs_container.innerHTML = "";

  if (questionsCorrect === -1) {
    txt = "Incomplete";
    document.getElementById("Review_button").style.display = "none";
  } else if (questionsCorrect >= 7) {
    txt = "Win";
    document.getElementById("Review_button").style.display = "block";
  } else {
    txt = "Lose";
    document.getElementById("Review_button").style.display = "block";
  }

  const api_url = `https://api.giphy.com/v1/gifs/search?api_key=05buYscSAn6xA1qiwVS5XZS6OqXQRMqZ&q=${txt}`;

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      const gifs = json.data;
      console.log(gifs);
      let randomImage = gifs[randomnumber];
      const url = randomImage.images.downsized_medium.url;
      const myImg = document.createElement("img");
      myImg.setAttribute("src", url);
      gifs_container.appendChild(myImg);
    });
}
