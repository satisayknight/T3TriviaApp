import { getQuizData, questionValidation } from "./script.js";

const sumbitButton = document.getElementById("submit_button");

window.addEventListener("load", getQuizData);

// sumbitButton.addEventListener("click", questionValidation);

sumbitButton.addEventListener("click", Gif_retrieval);
sumbitButton.addEventListener("click", myFunction);

function myFunction() {
  let txt;
  let text;
  let questionsCorrect = questionValidation();
  if ((questionsCorrect = -1)) {
    txt = "Incomple";
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

function Gif_retrieval() {
  let questionsCorrect = questionValidation();
  let txt;
  if ((questionsCorrect = -1)) {
    txt = "Incomplete";
  } else if (questionsCorrect >= 7) {
    txt = "Win";
  } else {
    txt = "Lose";
  }
  const api_url = `https://api.giphy.com/v1/gifs/search?api_key=05buYscSAn6xA1qiwVS5XZS6OqXQRMqZ&q=${txt}`;
  let randomnumber = Math.floor(Math.random() * 50);
  gifs_container.innerHTML = "";
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
