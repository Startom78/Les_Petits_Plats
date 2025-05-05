const ArrayMethods = {
    /**
     * Filtre un tableau
     * @param {Array} arr
     * @param {Function} condition callback
     * @returns {Array}  nouvel array filtré
     */
    filter: (arr, condition) => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    /**
     *
     * @param {Array} arr
     * @param {Function} format
     * @returns {Array} nouveau tableau formaté
     */
    map: (arr, format) => {
        const result = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            result[i] = format(arr[i], i, arr);
        }
        return result;
    },

    find: (arr, condition) => {
        for (let i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                return arr[i];
            }
        }
        return undefined;
    },

    some: (arr, condition) => {
        for (let i = 0; i < arr.length; i++) {
            if (condition(arr[i], i, arr)) {
                return true;
            }
        }
        return false;
    },

    any: (arr, condition) => {
        for (let i = 0; i < arr.length; i++) {
            if (!condition(arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    },

    reduce: (arr, reducer, initial) => {
        let obj = initial;
        for (let i = 0; i < arr.length; i++) obj = reducer(obj, arr[i], i);
        return obj;
    },

    every: (arr, condition) => {
        for (let i = 0; i < arr.length; i++) {
            if (!condition(arr[i], i, arr)) {
                return false;
            }
        }
        return true;
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
    applySearchFilter: (recipes, searchValue) => {
        const value = searchValue.toLowerCase();

        return ArrayMethods.filter(
            recipes,
            (recipe) =>
                // Recherche dans le titre
                recipe.name.toLowerCase().includes(value) ||
                // Recherche dans les ingrédients
                ArrayMethods.some(
                    recipe.ingredients,
                    (
                        ingredient // ajouter méthode some ici
                    ) => ingredient.ingredient.toLowerCase().includes(value)
                ) ||
                // Recherche dans la description
                recipe.description.toLowerCase().includes(value)
        );
    },
    applyTagsFilter: (recipes, tagsList) => {
        return ArrayMethods.filter(
            recipes, // Filtre les recettes par tags
            (recipe) =>
                ArrayMethods.every(tagsList, (tag) => {
                    // Cherche si, dans chaque recette, tous les tags sont appliqués
                    if (tag.type === "ingrédients") {
                        return ArrayMethods.some(
                            recipe.ingredients,

                            (ingredient) =>
                                ingredient.ingredient.toLowerCase() === tag.name
                        );
                    } else if (tag.type === "appareils") {
                        return recipe.appliance.toLowerCase() === tag.name;
                    } else if (tag.type === "ustensils") {
                        return ArrayMethods.some(
                            recipe.ustensils,
                            (u) => u.toLowerCase() === tag.name
                        );
                    }

                    return false;
                })
        );
    },
};

// Test Benchmark
// Faire la page quand il n'y a aucune correspondance
