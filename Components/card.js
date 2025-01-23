function createCard(recipe) {
  const cards = document.getElementById('cards');
  const card = document.createElement("div");
  card.classList.add("card");
  console.log(card);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");

  const img = document.createElement("img");
  img.setAttribute("src", `./Images/Images recettes/${recipe.image}`);
  img.setAttribute("alt", "image de recette");

  const timeContainer = document.createElement("div");
  timeContainer.classList.add("timeContainer");

  const timeCooking = document.createElement('p');
  timeCooking.textContent = `${recipe.time} min`;
  timeCooking.classList.add('timeCooking');

  const infoRecipe = document.createElement("div");
  infoRecipe.classList.add("infoRecipe");

  const titleRecipe = document.createElement("h2");
  titleRecipe.textContent = recipe.name;
  titleRecipe.classList.add("titleRecipe");

  const recipeP = document.createElement("p");
  recipeP.textContent = "recette";
  recipeP.classList.add("titleInCard");

  const recipeDescription = document.createElement("div");
  recipeDescription.classList.add("description");
  recipeDescription.textContent = recipe.description;


  const textRecipe = document.createElement("p");
  textRecipe.textContent = recipe.description;
  textRecipe.classList.add("description");

  const ingredientsTitle = document.createElement("p");
  ingredientsTitle.textContent = "Ingrédients";
  ingredientsTitle.classList.add("titleInCard");

  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("listOfIngredients");
  (recipe.ingredients).forEach(ingredients => {
    const myIngredient = document.createElement('div');
    myIngredient.classList.add('myIngredient');

    const ingredient = document.createElement('p');
    ingredient.classList.add('ingredient');

    const quantity = document.createElement('p');
    quantity.classList.add('quantity');

    const unit = document.createElement('p');
    unit.classList.add('unit');

    if (ingredients.quantity === undefined){
      ingredient.textContent = `${ingredients.ingredient}`;
    }

    else if (ingredients.unit === undefined){
      ingredient.textContent = `${ingredients.ingredient}`;
      quantity.textContent = `${ingredients.quantity}`;
    }

    else{
      ingredient.textContent = `${ingredients.ingredient}`;
      quantity.textContent = `${ingredients.quantity} ${ingredients.unit}`;
    }

    myIngredient.appendChild(ingredient);
    myIngredient.appendChild(quantity);
    myIngredient.appendChild(unit);
    ingredientsList.appendChild(myIngredient);

  })
  console.log(ingredientsList);

  timeContainer.appendChild(timeCooking);
  imgContainer.appendChild(timeContainer);
  imgContainer.appendChild(img);

  infoRecipe.appendChild(titleRecipe);
  infoRecipe.appendChild(recipeP);
  infoRecipe.appendChild(recipeDescription);
  infoRecipe.appendChild(ingredientsTitle);
  infoRecipe.appendChild(ingredientsList);

  card.appendChild(imgContainer);
  card.appendChild(infoRecipe);
  cards.appendChild(card);
  
  return card;
}
export default createCard;
