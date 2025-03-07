const filterApi = {
    applySearchFilter: (recipes, searchValue) => {
        const value = searchValue.toLowerCase();
        return recipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(value) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(value)
                ) ||
                recipe.description.toLowerCase().includes(value)
        );
    },
    applyTagsFilter: (recipes, tagsList) => {
        console.log(tagsList);
        return recipes.filter((recipe) =>
            tagsList.every((tag) => {
                if (tag.type === "ingrédients") {
                    return recipe.ingredients.some(
                        (ingredient) =>
                            ingredient.ingredient.toLowerCase() === tag.name
                    );
                } else if (tag.type === "appareils") {
                    return recipe.appliance.toLowerCase() === tag.name;
                } else if (tag.type === "ustensils") {
                    return recipe.ustensils.some(
                        (u) => u.toLowerCase() === tag.name
                    );
                }

                return false;
            })
        );
    },
};

export default filterApi;
