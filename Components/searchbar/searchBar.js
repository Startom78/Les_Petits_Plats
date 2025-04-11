const createSearchBar = (
    placeholder,
    size,
    onChange = () => {},
    onSubmit = () => {}
) => {
    const div = document.createElement("div");
    div.className = `searchBar${size === "small" ? " sm" : ""}`;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;

    input.addEventListener("change", (ev) => {
        onChange?.(ev.target.value);
    });

    input.addEventListener("input", (ev) => {
        if (ev.target.value !== "") {
            closeButton.classList.add("visible");
        } else {
            closeButton.classList.remove("visible");
        }
        onSubmit?.(input.value);
    });

    input.addEventListener("keydown", (ev) => {
        if (ev === "Enter") {
            onSubmit?.(input.value);
        }
    });

    const searchIcon = document.createElement("button");
    searchIcon.className = "submit";
    searchIcon.innerHTML = `<i class="fas fa-magnifying-glass"></i>`;
    searchIcon.addEventListener("click", () => {
        onSubmit?.(input.value);
    });

    const closeButton = document.createElement("button");
    closeButton.className = "close";
    closeButton.innerHTML = `<i class="fas fa-xmark"></i>`;
    closeButton.addEventListener("click", () => {
        input.value = "";
        closeButton.classList.remove("visible");
    });

    div.appendChild(input);
    div.appendChild(closeButton);
    div.appendChild(searchIcon);

    return div;
};
export default createSearchBar;
