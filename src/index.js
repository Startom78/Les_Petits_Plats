import API from "./api/api.js";
import createCard from "../Components/card.js";
import createDropdown, {
    unselectItem,
} from "../Components/dropdown/dropdown.js";
import createSearchBar from "../Components/searchbar/searchBar.js";
import createTag, { removeTag } from "../Components/tags/tags.js";

const getRecipes = API.getRecipes;

async function init() {
    // Récupère les datas des recettes
    const recipes = await getRecipes();

    const searchBar = createSearchBar(
        "Rechercher une recette, un ingrédient...",
        "",
        (value) => {
            console.log(value);
        },
        (value) => {
            console.log("submit", value);
        }
    );

    const banner = document.querySelector(".banner");
    banner.appendChild(searchBar);

    const dropdownsContainer = document.querySelector(".dropdowns");

    const onUnselect = (name, type) => {
        unselectItem(dropdownsContainer.querySelector("#" + type), name);
    };

    const dropdownI = createDropdown(
        "Ingrédients",
        recipes.reduce((ingredients, recipe) => {
            recipe.ingredients.forEach((i) =>
                ingredients.add(i.ingredient.toLowerCase())
            );
            return ingredients;
        }, new Set()),
        (option) => {
            createTag(option.selected, "ingrédients", onUnselect);
        },
        (option) => {
            removeTag(option.unselected, "ingrédients");
        }
    );
    dropdownI.setAttribute("id", "ingrédients");

    const dropdownA = createDropdown(
        "Appareils",
        recipes.reduce((appliance, recipe) => {
            appliance.add(recipe.appliance.toLowerCase());
            return appliance;
        }, new Set()),
        (option) => {
            console.log(option);
            createTag(option.selected, "appareils");
        },
        (option) => {
            console.log("remove", option.unselected);
            removeTag(option.unselected.trim(), "appareils", onUnselect);
        },
        false
    );
    dropdownA.setAttribute("id", "appareils");

    const dropdownU = createDropdown(
        "Ustensils",
        recipes.reduce((ustensils, recipe) => {
            recipe.ustensils.forEach((u) => ustensils.add(u.toLowerCase()));
            return ustensils;
        }, new Set()),
        (option) => {
            console.log(option);
            createTag(option.selected, "ustensils");
        },
        (option) => {
            console.log("remove", option.unselected);
            removeTag(option.unselected, "ustensils");
        }
    );
    dropdownU.setAttribute("id", "ustensils", onUnselect);

    dropdownsContainer.appendChild(dropdownI);
    dropdownsContainer.appendChild(dropdownA);
    dropdownsContainer.appendChild(dropdownU);

    const cards = document.querySelector(".cards");

    recipes.forEach((recipe) => {
        // Pour chaque recette, je crée une carte de celle-ci
        const card = createCard(recipe);
        cards.appendChild(card);
    });
}
window.onload = () => {
    init();
};
