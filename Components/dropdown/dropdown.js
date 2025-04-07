import createSearchBar from "../searchbar/searchBar.js";

function createDropdown(
    title,
    options,
    onSelect = () => {},
    onUnselect = () => {},
    multiSelection = true
) {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.setAttribute("multi-selection", multiSelection);
    dropdown.onSelect = onSelect;
    dropdown.onUnselect = onUnselect;

    const heading = document.createElement("div");
    heading.className = "heading";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = title;

    const chevron = document.createElement("div");
    chevron.innerHTML = `<i class= "fa-solid fa-chevron-down" > </i>`;
    chevron.className = "chevron";

    const content = document.createElement("div");
    content.className = "content";

    const list = document.createElement("div");
    list.className = "list";

    const selecteds = document.createElement("div");
    selecteds.className = "selecteds";

    const items = document.createElement("div");
    items.className = "items";

    list.appendChild(selecteds);
    list.appendChild(items);
    chevron.addEventListener("click", () => {
        toggle();
    });

    const toggle = () => {
        dropdown.classList.toggle("open");
    };

    const searchContainer = document.createElement("div");
    searchContainer.className = "searchContainer";

    const searchBar = createSearchBar("", "small");
    searchContainer.appendChild(searchBar);

    content.appendChild(searchContainer);
    content.appendChild(list);

    heading.appendChild(label);
    heading.appendChild(chevron);

    dropdown.appendChild(heading);
    dropdown.appendChild(content);
    updateDropdownOptions(dropdown, options);

    return dropdown;
}

export function updateDropdownOptions(dropdown, options) {
    const items = dropdown.querySelector(".items");
    const selecteds = dropdown.querySelector(".selecteds");
    const multiSelection = dropdown.getAttribute("multi-selection");
    const onSelect = dropdown.onSelect;
    const onUnselect = dropdown.onUnselect;

    items.innerHTML = "";
    selecteds.innerHTML = "";
    const optionItems = options
        ? [...options].map((option) =>
              typeof option === "string"
                  ? { name: option, disabled: false }
                  : option
          )
        : [];
    optionItems?.forEach((option) => {
        const item = document.createElement("div");
        item.className = "item";
        item.textContent = option.name;
        item.setAttribute("key-item", `item-${option.name}`);
        item.setAttribute("key-disabled", `${option.disabled}`);
        const onSelectCallBack = () => {
            if (multiSelection === "false") {
                const lastSelected = [...selecteds.querySelectorAll(".item")];
                lastSelected.forEach((s) => {
                    const key = s.getAttribute("key-item");
                    const lastItem = items.querySelector(
                        `.item[key-item="${key}"]`
                    );
                    if (lastItem) {
                        lastItem.classList.remove("hidden");
                    }
                    onUnselect?.({
                        unselected: s.querySelector("span").textContent,
                        selecteds: [...selecteds.querySelectorAll(".item")].map(
                            (item) => item.querySelector("span").textContent
                        ),
                    });
                });

                selecteds.innerHTML = ``;
            }
            const selected = document.createElement("div");
            selected.className = "item";
            selected.setAttribute("key-item", `item-${option.name}`);
            selected.innerHTML = `<span>${option.name}</span><i class="fa-solid fa-circle-xmark close-button"></i>`;

            item.classList.add("hidden");
            const closeButton = selected.querySelector(".close-button");
            closeButton.addEventListener("click", () => {
                item.classList.remove("hidden");
                selected.remove();
                onUnselect?.({
                    unselected: option.name,
                    selecteds: [...selecteds.querySelectorAll(".item")].map(
                        (item) => item.querySelector("span").textContent
                    ),
                });
            });

            selecteds.appendChild(selected);
            onSelect?.({
                selected: option.name,
                selecteds: [...selecteds.querySelectorAll(".item")].map(
                    (item) => item.querySelector("span").textContent
                ),
            });
        };

        item.addEventListener("click", onSelectCallBack);
        items.appendChild(item);
    });
}

export function disableDropdownOptions(dropdown, options) {
    const items = [...dropdown.querySelectorAll(".items .item")];
    const selecteds = [...dropdown.querySelectorAll(".selecteds .item")];
    options = Array.from(options);
    items.forEach((item) => {
        if (
            options.find(
                (option) =>
                    "item-" + option.toLowerCase() ===
                    item.getAttribute("key-item")
            )
        ) {
            item.setAttribute("key-disabled", "false");
        } else {
            item.setAttribute("key-disabled", "true");
        }
    });

    selecteds.forEach((item) => {
        if (
            options.find(
                (option) => "item-" + option === item.getAttribute("key-item")
            )
        ) {
            item.setAttribute("key-disabled", "false");
        } else {
            item.setAttribute("key-disabled", "true");
        }
    });
}

export function unselectItem(dropdown, option) {
    const items = dropdown.querySelector(".items");
    const selecteds = dropdown.querySelector(".selecteds");
    const onUnselect = dropdown.onUnselect;
    const selected = selecteds.querySelector(
        `.item[key-item="item-${option}"]`
    );
    if (!selected) return;
    const item = items.querySelector(`.item[key-item="item-${option}"]`);
    if (!item) return;
    item.classList.remove("hidden");
    selected.remove();
    onUnselect?.({
        unselected: option,
        selecteds: [...selecteds.querySelectorAll(".item")].map(
            (item) => item.querySelector("span").textContent
        ),
    });
}
export default createDropdown;
