export function totalRecipes(recipes) {
    const div = document.querySelector(".totalRecipes");
    const totalrecipes = recipes.length;

    if (totalrecipes === 0) {
        div.innerHTML = `Aucune recette`;
    } else if (totalrecipes === 1) {
        div.innerHTML = `1 Recette`;
    } else if (totalrecipes > 1) {
        div.innerHTML = `${totalrecipes} Recettes`;
    }

    return div;
}

export default totalRecipes;
