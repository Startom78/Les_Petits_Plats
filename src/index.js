import API from "./api/api.js";
import createCard from "../Components/card.js";
import createDropdown, {
    unselectItem,
    updateDropdownOptions,
    disableDropdownOptions,
} from "../Components/dropdown/dropdown.js";
import createSearchBar from "../Components/searchbar/searchBar.js";
import createTag, { removeTag } from "../Components/tags/tags.js";
import totalRecipes from "../Components/totalrecipes/totalRecipes.js";
//import filterApi from "../algorithms.js";
import filterApi from "../algorithms-native.js";

const getRecipes = API.getRecipes;
const emptyCards = document.querySelector(".emptyCards");

function initEmptyCards(input) {
    const tags = [...emptyCards.querySelectorAll(".searchText-suggestion")];
    tags.forEach((tag) => {
        tag.onclick = () => {
            input.value = tag.textContent.trim();
        };
    });
}

async function init() {
    // Récupère les datas des recettes
    const recipes = await getRecipes();
    let timeOutSearch = null;
    let lastValue = "";

    const debounceSubmit = (value) => {
        // Compacte les espaces
        value = value.replace(/\s\s+/g, " ").trim();
        if (value === lastValue) {
            return;
        }

        if (value.length < 3 && value.length > 0) {
            return;
        }

        lastValue = value;

        if (timeOutSearch) {
            clearTimeout(timeOutSearch);
            timeOutSearch = null;
        }
        timeOutSearch = setTimeout(() => applyFilterSearch(value), 500);
    };
    const searchBar = createSearchBar(
        "Rechercher une recette, un ingrédient...",
        "",
        (value) => {
            console.log(value);
        },
        debounceSubmit
    );

    initEmptyCards(searchBar.querySelector("input"));

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

    const extractIngredients = (recipes) => {
        const ingredients = new Set();
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((i) =>
                ingredients.add(i.ingredient.toLowerCase())
            );
        });
        return ingredients;
    };

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
            onUnselect(option.unselected, "ingrédients");
        }
    );
    dropdownI.setAttribute("id", "ingrédients");

    const dropdownA = createDropdown(
        "Appareils",
        extractAppliances(recipes),
        (option) => {
            console.log(option.selected);
            onSelect(option.selected, "appareils");
        },
        (option) => {
            removeTag(option.unselected.trim(), "appareils", onUnselect);
            onUnselect(option.unselected, "appareils");
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
            onUnselect(option.unselected, "ustensils");
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

    totalRecipes(recipes);

    let filteredSearchRecipes = [...recipes];
    let resultRecipes = [...recipes];

    const applyFilterSearch = (value) => {
        filteredSearchRecipes = filterApi.applySearchFilter(recipes, value);
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
        totalRecipes(filteredSearchRecipes);
    };

    const applyFilterTag = () => {
        const tagsBar = document.querySelector(".tags");
        const tags = [...tagsBar.querySelectorAll(".tag")].map((tag) => ({
            name: tag.getAttribute("key-name"),
            type: tag.getAttribute("key-type"),
        }));
        resultRecipes = filterApi.applyTagsFilter(filteredSearchRecipes, tags);

        disableDropdownOptions(dropdownI, extractIngredients(resultRecipes));
        disableDropdownOptions(dropdownA, extractAppliances(resultRecipes));
        disableDropdownOptions(dropdownU, extractUstensils(resultRecipes));
        renderRecipes(resultRecipes);
        totalRecipes(resultRecipes);
    };

    const renderRecipes = (recipes) => {
        const cards = document.querySelector(".cards");
        cards.innerHTML = "";
        if (recipes.length > 0) {
            recipes.forEach((recipe) => {
                // Pour chaque recette, je crée une carte de celle-ci
                const card = createCard(recipe);
                cards.appendChild(card);
            });
            cards.style.display = "grid";
            emptyCards.style.display = "none";
        } else {
            cards.style.display = "none";
            emptyCards.style.display = "block";
        }
    };
}
window.onload = () => {
    init();
};
