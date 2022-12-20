const categoryMap = new Map([
  ["category_general_knowledge", ["General Knowledge", 9]],
  ["category_science_nature", ["Science & Nature", 17]],
  ["category_art", ["Art", 25]],
  ["category_animals", ["Animals", 27]],
]);

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
  let selectedCategory = categoryMap.get(category);
  let categoryTitle = selectedCategory[0];
  console.log(categoryTitle);
  let categoryID = selectedCategory[1];
  console.log(categoryID);

  localStorage.setItem("Title", categoryTitle);
  localStorage.setItem("category", categoryID);
}

function addCategoryListeners() {
  const allCategorys = document.querySelectorAll('[id^="categ"]');

  for (let index = 0; index < allCategorys.length; index++) {
    const element = allCategorys[index];

    element.addEventListener("click", setQuizTitles);
  }
}
