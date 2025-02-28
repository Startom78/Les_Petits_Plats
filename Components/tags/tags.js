function createTag(name, type, onClose = () => {}) {
    if (!name) return null;

    const menu = document.querySelector(".tags");
    const tagDiv = document.createElement("div");

    tagDiv.innerHTML = `<p class="selectedOption" > ${name} </p> <i class = "fa-solid fa-xmark close-button"> </i>`;
    tagDiv.classList.add("tag");
    tagDiv.setAttribute("key-item", type + "-" + name);
    tagDiv.setAttribute("key-type", type);
    tagDiv.setAttribute("key-name", name);

    tagDiv.querySelector(".close-button").addEventListener("click", () => {
        onClose?.(name, type);
    });
    menu.appendChild(tagDiv);

    return tagDiv;
}

export function removeTag(name, type) {
    const menu = document.querySelector(".tags");
    const tag = menu.querySelector(`.tag[key-item="${type + "-" + name}"]`);
    if (tag) tag.remove();
}

export default createTag;
