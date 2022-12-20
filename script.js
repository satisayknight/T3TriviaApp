window.addEventListener("load", addCategoryListeners);

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

function setQuizTitles(event) {
  const category = event.target.id;
  localStorage.setItem("Title", category);
  
}

function addCategoryListeners() {
  const allCategorys = document.querySelectorAll('[id^="categ"]');

  for (let index = 0; index < allCategorys.length; index++) {
    const element = allCategorys[index];

    element.addEventListener("click", setQuizTitles);
  }
}
