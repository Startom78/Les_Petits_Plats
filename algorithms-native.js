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
        return [...recipes];
    },
};

export default filterApi;
