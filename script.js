
const SESSION_TOKEN = "";


// let test2 = document.getElementById("test1");
// test2.addEventListener("click", getQuizData);


function getQuizData() {
  // session token?
  //https://opentdb.com/api_token.php?command=request
  // reset token

  let category = 18; // 9-32
  let difficulty = "easy"; // medium  hard
  let typeOfQuestions = "multiple"; // or "boolean"
  let numberOfQuestions = 10; // 1 - 50

  const api_url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${typeOfQuestions}`;

  fetch(api_url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json['results']);
    })
    .catch((error) => {
      console.log(error);
    });
}



