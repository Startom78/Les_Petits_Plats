const ArrayMethods = {
    filter: (arr, condition) => {
        const result = [];
        for (const i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                result.push(arr);
            }
        }
        return result;
    },

    map: (arr, format) => {
        const result = new Array(arr.length);
        for (const i = 0; i < arr.length; i++) {
            result[i] = format(arr[i], i, arr);
        }
        return result;
    },

    find: (arr, condition) => {
        for (const i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                return arr[i];
            }
        }
        return undefined;
    },

    some: (arr, condition) => {
        for (const i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                return true;
            }
        }
        return false;
    },

    any: (arr, condition) => {
        for (const i = 0; i < arr.length; i++) {
            if (!condition(arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    },

    reduce: (arr, reducer, initial) => {
        let obj = initial;
        for (const i = 0; i < arr.length; i++) obj = reducer(obj, arr[i], i);
        return obj;
    },
};

const filterApi = {
    applySearchFilter: (recipes, searchValue) => {
        const value = searchValue.toLowerCase();
        const filteredRecipes = ArrayMethods.filter(recipes, (recipe) => {
            if (recipe.name.toLowerCase().includes(value)) return true;

            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (
                    recipe.ingredients[j].ingredient
                        .toLowerCase()
                        .includes(value)
                ) {
                    return true;
                }
            }
            return recipe.description.toLowerCase().includes(value);
        });

        return filteredRecipes;
    },

    applyTagsFilter: (recipes, tagsList) => {
        console.log(tagsList);
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            let matchesTags = 0;

            for (let j = 0; j < tagsList.length; j++) {
                const tag = tagsList[j];

                if (tag.type === "ingrédients") {
                    for (let k = 0; k < recipe.ingredients.length; k++) {
                        if (
                            recipe.ingredients[k].ingredient.toLowerCase() ===
                            tag.name
                        ) {
                            matchesTags++;
                            break;
                        }
                    }
                } else if (tag.type === "appareils") {
                    matchesTags +=
                        recipe.appliance.toLowerCase() === tag.name ? 1 : 0;
                } else if (tag.type === "ustensils") {
                    for (let k = 0; k < recipe.ustensils.length; k++) {
                        if (recipe.ustensils[k].toLowerCase() === tag.name) {
                            matchesTags++;
                            break;
                        }
                    }
                }

                if (matchesTags === j + 1) {
                    break;
                }
            }

            if (matchesTags === tagsList.length) {
                filteredRecipes.push(recipe);
            }
        }

        return filteredRecipes;
    },
};

export default filterApi;

export const filterApi2 = {
    // Faire la méthode Every et remplacer par ceci
    applySearchFilter: (recipes, searchValue) => {
        const value = searchValue.toLowerCase();
        return ArrayMethods.filter(
            recipes,
            (recipe) =>
                recipe.name.toLowerCase().includes(value) ||
                ArrayMethods.some(
                    recipe.ingredients,
                    (
                        ingredient // ajouter méthode some ici
                    ) => ingredient.ingredient.toLowerCase().includes(value)
                ) ||
                recipe.description.toLowerCase().includes(value)
        );
    },
    applyTagsFilter: (recipes, tagsList) => {
        console.log(tagsList);
        return recipes.filter(
            (
                recipe // ajouter méthode filter ici
            ) =>
                tagsList.every((tag) => {
                    // ajouter méthode every ici
                    if (tag.type === "ingrédients") {
                        return recipe.ingredients.some(
                            // ajouter méthode some ici
                            (ingredient) =>
                                ingredient.ingredient.toLowerCase() === tag.name
                        );
                    } else if (tag.type === "appareils") {
                        return recipe.appliance.toLowerCase() === tag.name;
                    } else if (tag.type === "ustensils") {
                        return recipe.ustensils.some(
                            // ajouter méthode some ici
                            (u) => u.toLowerCase() === tag.name
                        );
                    }

                    return false;
                })
        );
    },
};
