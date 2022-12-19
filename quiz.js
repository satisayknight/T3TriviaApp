import {getQuizData,questionValidation} from "./script.js";

const sumbitButton = document.getElementById("sumbit_button");

window.addEventListener('load', getQuizData);

sumbitButton.addEventListener("click", questionValidation);
