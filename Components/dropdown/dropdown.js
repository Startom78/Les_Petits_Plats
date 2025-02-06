import createSearchBar from "../searchbar/searchBar.js";

function createDropdown(title, options, onSelect = () => {}) {
    console.log(options)
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const heading = document.createElement('div');
    heading.className = 'heading';

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = title;

    const chevron = document.createElement('div');
    chevron.innerHTML = `<i class= "fa-solid fa-chevron-down" > </i>`;
    chevron.className = 'chevron';

    const content = document.createElement('div');
    content.className = 'content' ; 

    const list = document.createElement('div');
    list.className = 'list';

    const selecteds = document.createElement('div');
    selecteds.className = 'selecteds';
    
    let lastItem = null;
    const items = document.createElement('div');
    items.className = 'items';
    options?.forEach(option => {
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = option;
        item.addEventListener('click', () => {
            if (lastItem) {
                lastItem.classList.remove('hidden');
            }

            item.classList.add('hidden');
            selecteds.innerHTML = `<div class = "item"> ${option} </div> `
            lastItem = item;
            onSelect?.(option);
        })
        items.appendChild(item);
    });


    list.appendChild(selecteds);
    list.appendChild(items);
    
    
    /*options.forEach(option => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = option;
        }); */
        
        chevron.addEventListener("click", () => {
            console.log('click');
            toggle();
        });

        const close = () => {
            dropdown.classList.remove("open");
            onOpenClose();
        };
        
        const open = () => {
            dropdown.classList.add("open");
            onOpenClose();
        };
        
        const toggle = () => {
            dropdown.classList.toggle("open");
            onOpenClose();
    };

    const onOpenClose = () => {
        const isOpen = content.classList.contains("open");
        const items = content.querySelectorAll(".option");
    };
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'searchContainer';

    const searchBar = createSearchBar('', 'small');
    searchContainer.appendChild(searchBar);

    content.appendChild(searchContainer);
    content.appendChild(list);
    
    heading.appendChild(label);
    heading.appendChild(chevron);
    dropdown.appendChild(heading);
    
    dropdown.appendChild(content);
    
    return dropdown;
};
export default createDropdown;