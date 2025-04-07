function searchInText(inText, value) {
    return inText.toLowerCase().includes(value);
}

function searchInTitle(recipe, searchText) {
    return searchInText(recipe.name, searchText);
}

function searchInIngredients(recipe, searchText) {
    return recipe.ingredients.some((ingredient) =>
        searchInText(ingredient.ingredient, searchText)
    );
}

function searchInDescription(recipe, searchText) {
    return searchInText(recipe.description, searchText);
}

function isTagInIngredients(recipe, tag) {
    return recipe.ingredients.some(
        (ingredient) => ingredient.ingredient.toLowerCase() === tag.name
    );
}

function isTagInAppliance(recipe, tag) {
    return recipe.appliance.toLowerCase() === tag.name;
}

function isTagInUstensils(recipe, tag) {
    return recipe.ustensils.some((u) => u.toLowerCase() === tag.name);
}

const filterApi = {
    applySearchFilter: (recipes, searchValue) => {
        const value = searchValue.toLowerCase();
        return recipes.filter(
            (recipe) =>
                searchInTitle(recipe, value) ||
                searchInIngredients(recipe, value) ||
                searchInDescription(recipe, value)
        );
    },
    applyTagsFilter: (recipes, tagsList) => {
        return recipes.filter((recipe) =>
            tagsList.every((tag) => {
                if (tag.type === "ingrédients") {
                    return isTagInIngredients(recipe, tag);
                } else if (tag.type === "appareils") {
                    return isTagInAppliance(recipe, tag);
                } else if (tag.type === "ustensils") {
                    return isTagInUstensils(recipe, tag);
                }

                return false;
            })
        );
    },
};

export default filterApi;
