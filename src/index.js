import API from "./api/api.js";
import createCard from "../Components/card.js";
import createDropdown, {
    unselectItem,
    updateDropdownOptions,
} from "../Components/dropdown/dropdown.js";
import createSearchBar from "../Components/searchbar/searchBar.js";
import createTag, { removeTag } from "../Components/tags/tags.js";
import { applySearchFilter, applyTagsFilter } from "../algorithms.js";

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
            applyFilterSearch(value);
        }
    );

    const banner = document.querySelector(".banner");
    banner.appendChild(searchBar);

    const dropdownsContainer = document.querySelector(".dropdowns");

    const onSelect = (name, type) => {
        createTag(name, type, onUnselect);
        applyFilterTag();
    };
    const onUnselect = (name, type) => {
        unselectItem(dropdownsContainer.querySelector("#" + type), name);
        applyFilterTag();
    };
    const extractIngredients = (recipes) =>
        recipes.reduce((ingredients, recipe) => {
            recipe.ingredients.forEach((i) =>
                ingredients.add(i.ingredient.toLowerCase())
            );
            return ingredients;
        }, new Set());

    const extractAppliances = (recipes) =>
        recipes.reduce((appliance, recipe) => {
            appliance.add(recipe.appliance.toLowerCase());
            return appliance;
        }, new Set());

    const extractUstensils = (recipes) =>
        recipes.reduce((ustensils, recipe) => {
            recipe.ustensils.forEach((u) => ustensils.add(u.toLowerCase()));
            return ustensils;
        }, new Set());

    const dropdownI = createDropdown(
        "Ingrédients",
        extractIngredients(recipes),
        (option) => {
            onSelect(option.selected, "ingrédients");
        },
        (option) => {
            removeTag(option.unselected, "ingrédients");
        }
    );
    dropdownI.setAttribute("id", "ingrédients");

    const dropdownA = createDropdown(
        "Appareils",
        extractAppliances(recipes),
        (option) => {
            onSelect(option.selected, "appareils");
        },
        (option) => {
            removeTag(option.unselected.trim(), "appareils", onUnselect);
        },
        false
    );
    dropdownA.setAttribute("id", "appareils");

    const dropdownU = createDropdown(
        "Ustensils",
        extractUstensils(recipes),
        (option) => {
            onSelect(option.selected, "ustensils");
        },
        (option) => {
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

    let filteredSearchRecipes = [...recipes];
    let resultRecipes = [...recipes];

    const applyFilterSearch = (value) => {
        filteredSearchRecipes = applySearchFilter(recipes, value);
        const tagsBar = document.querySelector(".tags");
        tagsBar.innerHTML = "";
        updateDropdownOptions(
            dropdownI,
            extractIngredients(filteredSearchRecipes)
        );
        updateDropdownOptions(
            dropdownA,
            extractAppliances(filteredSearchRecipes)
        );
        updateDropdownOptions(
            dropdownU,
            extractUstensils(filteredSearchRecipes)
        );
        renderRecipes(filteredSearchRecipes);
    };

    const applyFilterTag = () => {
        const tagsBar = document.querySelector(".tags");
        const tags = [...tagsBar.querySelectorAll(".tag")].map((tag) => ({
            name: tag.getAttribute("key-name"),
            type: tag.getAttribute("key-type"),
        }));
        resultRecipes = applyTagsFilter(filteredSearchRecipes, tags);
        renderRecipes(resultRecipes);
    };

    const renderRecipes = (recipes) => {
        const cards = document.querySelector(".cards");
        cards.innerHTML = "";
        recipes.forEach((recipe) => {
            // Pour chaque recette, je crée une carte de celle-ci
            const card = createCard(recipe);
            cards.appendChild(card);
        });
    };
}
window.onload = () => {
    init();
};
