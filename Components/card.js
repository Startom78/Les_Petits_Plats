function createCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    const img = document.createElement("img");
    img.setAttribute("src", `./Images/Images recettes/${recipe.image}`);
    img.setAttribute("alt", "image de recette");

    const timeContainer = document.createElement("div");
    timeContainer.classList.add("timeContainer");

    const timeCooking = document.createElement("p");
    timeCooking.textContent = `${recipe.time} min`;
    timeCooking.classList.add("timeCooking");

    const infoRecipe = document.createElement("div");
    infoRecipe.classList.add("infoRecipe");

    const titleRecipe = document.createElement("h2");
    titleRecipe.textContent = recipe.name;
    titleRecipe.classList.add("titleRecipe");

    const recipeDescContainer = document.createElement("div");
    recipeDescContainer.classList.add("recipeBlock");

    const recipeP = document.createElement("p");
    recipeP.textContent = "recette";
    recipeP.classList.add("titleInCard");

    const recipeAppliance = document.createElement("p");
    recipeAppliance.textContent = recipe.appliance;

    const recipeText = document.createElement("p");
    recipeText.classList.add("text");
    recipeText.textContent = recipe.description;

    const ingredientContainer = document.createElement("div");
    ingredientContainer.classList.add("recipeBlock");

    const ingredientsTitle = document.createElement("p");
    ingredientsTitle.textContent = "Ingrédients";
    ingredientsTitle.classList.add("titleInCard");

    const ingredientsList = document.createElement("div");
    ingredientsList.classList.add("listOfIngredients");
    recipe.ingredients.forEach((ingredients) => {
        const myIngredient = document.createElement("div");
        myIngredient.classList.add("myIngredient");

        const ingredient = document.createElement("p");
        ingredient.classList.add("ingredient");

        const quantity = document.createElement("p");
        quantity.classList.add("quantity");

        ingredient.textContent = `${ingredients.ingredient}`;
        myIngredient.appendChild(ingredient);

        if (ingredients.quantity !== undefined) {
            const quantity = document.createElement("p");
            quantity.classList.add("quantity");
            myIngredient.appendChild(quantity);

            if (ingredients.unit === undefined) {
                quantity.textContent = `${ingredients.quantity}`;
            } else {
                quantity.textContent = `${ingredients.quantity} ${ingredients.unit}`;
            }
        }

        ingredientsList.appendChild(myIngredient);
    });

    timeContainer.appendChild(timeCooking);
    imgContainer.appendChild(timeContainer);
    imgContainer.appendChild(img);

    recipeDescContainer.appendChild(recipeP);
    recipeDescContainer.appendChild(recipeText);

    ingredientContainer.appendChild(ingredientsTitle);
    ingredientContainer.appendChild(ingredientsList);

    infoRecipe.appendChild(titleRecipe);
    infoRecipe.appendChild(recipeAppliance);
    infoRecipe.appendChild(recipeDescContainer);
    infoRecipe.appendChild(ingredientContainer);

    card.appendChild(imgContainer);
    card.appendChild(infoRecipe);

    return card;
}
export default createCard;
