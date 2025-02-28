export function applySearchFilter(recipes, searchValue) {
    const value = searchValue.toLowerCase();
    return recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value)
    );
}

export function applyTagsFilter(recipes, tagsList) {
    return [...recipes];
}
