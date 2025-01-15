const API = {
  getRecipes: async () => {
    return fetch("recipes.json")
      .then((response) => response.json())
      .then((data) => data.recipes);
  },

  getRecipe: async (recipeId) => {
    return fetch(".recipes.json")
      .then((response) => response.json())
      .then((data) => {
        return {
          image: data.recipes.find((m) => m.recipeId === recipeId).image,
          name: data.recipes.find((n) => n.recipeId === recipeId).name,
          servings: data.recipes.find((c) => c.id === recipeId).servings,
          ingredients: data.recipes.find((i) => i.id === recipeId).ingredients,
          time: data.recipes.find((t) => t.id === recipeId).time,
          description: data.recipes.find((d) => d.id === recipeId).description,
          appliance: data.recipes.find((a) => a.id === recipeId).appliance,
          unstensils: data.recipes.find((u) => u.id === recipeId).unstensils,
        };
      });
  },
};

export default API;
