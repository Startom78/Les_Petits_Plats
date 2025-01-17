import API from "./api/api.js";

const getRecipes = API.getRecipes;

async function displayData(recipes) {
  const recipesSection = document.querySelector(".cards");
  console.log(recipes);
  /*
  recipes.forEach((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.createCard();
    recipesSection.appendChild(recipeCardDOM);
  });*/
}

async function init() {
  // Récupère les datas des recettes
  const recipes = await getRecipes();
  displayData(recipes);
}
window.onload = () => {
  init();
};

/* function createCaroussel(medias) {
  const lightBoxes = document.querySelectorAll(".modal-click-away .lightbox");
  lightBoxes.forEach((lb) => lb.parentElement.remove());
  const lightbox = Lightbox.create(null, -1, undefined, () => {
    const index = lightbox.mediaIndex;
    const allCards = [
      ...document.querySelectorAll(".cards .card .card-media"),
    ];
    allCards[index]?.focus();
  });
  const cards = document.querySelector(".cards");
  let likedArray = JSON.parse(localStorage.getItem("Liked")) || [];
  medias.forEach((media, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    let element = undefined;
    if (!media.video) {
      element = document.createElement("img");
      element.setAttribute(
        "src",
        `assets/images/media/${name}/${media.image}`
      );
      element.setAttribute("alt", media.title);
      element.tabIndex = 0;
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          Modal.open(lightbox);
          Lightbox.openLightbox(lightbox, medias, name, index);
        }
      });
    } else {
      element = document.createElement("video");
      element.setAttribute(
        "src",
        `assets/images/media/${name}/${media.video}`
      );
      element.setAttribute("alt", "video de " + name);
      element.setAttribute("controls", "true");
      element.tabIndex = 0;
    }

    element.classList.add("card-media");
    element.onclick = () => {
      Lightbox.open(lightbox, medias, name, index);
    };

    const infoCard = document.createElement("div");
    infoCard.classList.add("infoCard");

    const title = document.createElement("div");
    title.textContent = media.title;

    const numberLikesContainer = document.createElement("button");
    numberLikesContainer.classList.add("numberLikesContainer");
    numberLikesContainer.tabIndex = 0;

    const likedMedia = "" + media.id;
    const onClickLikes = (heart) => {
      heart.classList.toggle("checked");
      const checked = heart.classList.contains("checked");
      if (checked) {
        likedArray.push("" + media.id);
        media.likes++;
      } else {
        likedArray = likedArray.filter((item) => "" + item !== likedMedia);
        media.likes--;
      }

      localStorage.setItem("Liked", JSON.stringify(likedArray));
      numberLikes.textContent = "" + media.likes;
      updateTotalLikes(medias);
    };

    const heart = createHeart(
      likedArray.some((item) => "" + item === likedMedia),
      null
    );

    numberLikesContainer.onclick = () => {
      onClickLikes(heart);
    };

    const numberLikes = document.createElement("span");
    numberLikes.textContent = media.likes.toString();

    numberLikesContainer.appendChild(numberLikes);
    numberLikesContainer.appendChild(heart);
    infoCard.appendChild(title);
    infoCard.appendChild(numberLikesContainer);
    card.appendChild(element);
    card.appendChild(infoCard);
    cards.appendChild(card);
  });
  updateTotalLikes(medias);
  return cards;
} /*

----------------------------------------------------


 /* function createCard() {
  const article = document.createElement("article");
  article.classList.add("card-index");

  const photographerUrl = `photographer.html?id=${id}`;
  const link = document.createElement("a");
  link.setAttribute("href", photographerUrl);
  link.classList.add("card-link");
  link.tabIndex = 3;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("avatar");
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", `photo de profil de ${name}`);

  const h2 = document.createElement("h2");
  h2.textContent = name;

  const description = document.createElement("div");
  description.classList.add("card-description");

  const h3 = document.createElement("h3");
  h3.textContent = city + ", " + country;

  const h4 = document.createElement("h4");
  h4.textContent = tagline;

  const h5 = document.createElement("h5");
  h5.textContent = price + "€/jour";

  imgContainer.appendChild(img);
  link.appendChild(imgContainer);
  link.appendChild(h2);
  description.appendChild(h3);
  description.appendChild(h4);
  description.appendChild(h5);
  article.appendChild(link);
  article.appendChild(description);
  return article;
} */
