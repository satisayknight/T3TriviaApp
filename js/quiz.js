const SESSION_TOKEN = "";
const sumbitButton = document.getElementById("submit_button");
const gifs_container = document.getElementById("gifs_container");

let questionCount = 0;
let correctAnswers = [];
let quizKey = 0;
let correctAnswersAfterValidation = -1;

quiz_title.innerHTML = localStorage.getItem("Title");
window.addEventListener("load", getQuizData);

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
  category = localStorage.getItem("category"),
  numberOfQuestions = "10",
  difficulty = "easy",
  typeOfQuestions = "multiple"
) {
  const api_url = `https://triviavalidationserver.onrender.com/api?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${typeOfQuestions}&token=${SESSION_TOKEN}`;

  console.log("URL:" + api_url);

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      for (let index = 0; index < json.length; index++) {
        let question = json[index].question;
        let answersArray = json[index].all_answers;
        correctAnswers.push(json[index].all_answers[3]);
        quizKey = json[index].quiz_key;

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

  questionRadioButtons.forEach((element) => {
    if (element.checked) {
      questionsChecked++;
      temp.push(element);
    } else {
      unchecked.push(element);
    }
  });

  if (questionsChecked != 10) {
    showalert();
    gif_Retrieval();
    modalTextData();
    return -1;
  } else {
    document.getElementById("submit_button").disabled = true;

    let tempArray = [];

    temp.forEach((element) => {
      let elementLabal = document.querySelector(`[for ^= "${element.id}"]`);
      let labelAnswerText = elementLabal.textContent
        .replace(/[\n\r]+|[\s]{2,}/g, " ")
        .trim();

      tempArray.push(labelAnswerText);
    });

    let data = {
      quiz_key: quizKey,
      answers: tempArray,
    };

    const body = JSON.stringify(data);

    fetch("https://triviavalidationserver.onrender.com/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data1) => {
        questionsCorrect = colorAnswers(data1, temp, unchecked);
      });
  }

  return questionsCorrect;
}

/**
 *
 * @param {string} html - a string that contains html entities to be removed
 */
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
  // let questionsCorrect = questionValidation();
  // console.log("my func" + questionsCorrect);
  if (correctAnswersAfterValidation === -1) {
    txt = "Incomplete";
    text = "Complete All Questions...!!!";
  } else if (correctAnswersAfterValidation >= 7) {
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
  // let questionsCorrect = questionValidation();
  let randomnumber = Math.floor(Math.random() * 50);
  let txt;
  gifs_container.innerHTML = "";

  if (correctAnswersAfterValidation === -1) {
    txt = "Incomplete";
    document.getElementById("Review_button").style.display = "none";
  } else if (correctAnswersAfterValidation >= 7) {
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
      // console.log(gifs);
      let randomImage = gifs[randomnumber];
      const url = randomImage.images.downsized_medium.url;
      const myImg = document.createElement("img");
      myImg.setAttribute("src", url);
      gifs_container.appendChild(myImg);
    });
}

/**
 *
 * @param {JSON} data - a json object that contains two keys the number of questions correct and all the correct answers for the quiz by id
 * @param {NODES} answersButtons - a list of nodes containing the buttons that the users checked when sumbitting the quiz.
 * @param {NODES} unchecked - a list of nodes containing the buttons that the users DID NOT check when sumbitting the quiz.
 */
function colorAnswers(data, answersButtons, unchecked) {
  let questionsCorrect = 0;
  let correctAnswersArray = data["all_answers"];

  answersButtons.forEach((element) => {
    let elementLabel = document.querySelector(`[for ^= "${element.id}"]`);
    let elementlabelAnswerText = elementLabel.textContent
      .replace(/[\n\r]+|[\s]{2,}/g, " ")
      .trim();

    if (correctAnswersArray.includes(elementlabelAnswerText)) {
      // console.log("✅ String is contained in Array");
      questionsCorrect++;
      element.style.background = "#08fc7e";
    } else {
      // console.log("⛔️ String is NOT contained in Array");
      element.style.background = "#f52c03";
      unchecked.forEach((element) => {
        element.disabled = true;
        let elementLabal = document.querySelector(`[for ^= "${element.id}"]`);
        let labelAnswerText = elementLabal.textContent
          .replace(/[\n\r]+|[\s]{2,}/g, " ")
          .trim();
        if (correctAnswersArray.includes(labelAnswerText)) {
          // console.log("String contained in Unchecked");
          element.style.background = "#08fc7e";
        }
      });
    }
  });

  correctAnswersAfterValidation = questionsCorrect;

  gif_Retrieval();
  modalTextData();
}
