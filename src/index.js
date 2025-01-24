import API from "./api/api.js";
import createCard from "../Components/card.js";
const getRecipes = API.getRecipes;

async function init() {
  // Récupère les datas des recettes
  const recipes = await getRecipes();
  console.log(recipes);
  const cards = document.getElementById('cards');

  recipes.forEach(recipe => { // Pour chaque recette, je crée une carte de celle-ci
   const card = createCard(recipe);
   cards.appendChild(card);
  })
}
window.onload = () => {
  init();
};