import API from "./api.js";

async function getRecipes() {
  return {
    recipes: await api.getRecipes(),
  };
}

async function displayData(recipes) {
  const recipesSection = document.querySelector(".cards");

  recipes.forEach((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.createCard();
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  // Récupère les datas des recettes
  const { recipes } = await getRecipes();
  displayData(recipes);
}
init();
