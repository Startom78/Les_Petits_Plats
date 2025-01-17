const API = {
  getRecipes: async () => {
    return await fetch("./data/recipes.json")
      .then((response) => response.json())
      .then((data) => data.recipes);
  },

  getRecipe: async (recipeId) => {
    const recipes = await API.getRecipes();
    return recipes.find((m) => m.recipeId === recipeId);
  },
};

export default API;
