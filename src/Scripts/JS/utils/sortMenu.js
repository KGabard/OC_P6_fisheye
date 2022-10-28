// DOM Classes
const selectorContainerClass = 'mediaSorter__selectorContainer';
const sortButtonClass = 'mediaSorter__sortButton';
const dropdownMenuClass = 'mediaSorter__dropdownMenu';
const chevronClass = 'mediaSorter__chevron';
const listItemClass = 'mediaSorter__dropdownMenu__listItem';
// DOM Elements
const selectorContainerElmt = document.querySelector('.' + selectorContainerClass);
export const sortButtonElmt = document.querySelector('.' + sortButtonClass);
const dropdownMenuElmt = document.querySelector('.' + dropdownMenuClass);
const chevronElmt = document.querySelector('.' + chevronClass);
export const listItemElmts = document.querySelectorAll('.' + listItemClass);
// Functions
const toggleMenu = () => {
    if (dropdownMenuElmt.classList.contains(dropdownMenuClass + '--active')) {
        dropdownMenuElmt.classList.remove(dropdownMenuClass + '--active');
        chevronElmt.classList.remove(chevronClass + '--active');
        sortButtonElmt.classList.add(sortButtonClass + '--active');
    }
    else {
        dropdownMenuElmt.classList.add(dropdownMenuClass + '--active');
        chevronElmt.classList.add(chevronClass + '--active');
        sortButtonElmt.classList.remove(sortButtonClass + '--active');
    }
};
const setLabelsInput = (label1, label2, label3) => {
    sortButtonElmt.innerText = label1;
    sortButtonElmt.setAttribute('data-value', label1.toLowerCase());
    listItemElmts[0].innerText = label1;
    listItemElmts[0].setAttribute('data-value', label1.toLowerCase());
    listItemElmts[1].innerText = label2;
    listItemElmts[1].setAttribute('data-value', label2.toLowerCase());
    listItemElmts[2].innerText = label3;
    listItemElmts[2].setAttribute('data-value', label3.toLowerCase());
};
export const updateLabelsInput = (currentInput) => {
    switch (currentInput) {
        case 'popularité':
            setLabelsInput('Popularité', 'Date', 'Titre');
            break;
        case 'date':
            setLabelsInput('Date', 'Popularité', 'Titre');
            break;
        case 'titre':
            setLabelsInput('Titre', 'Popularité', 'Date');
            break;
        default:
            break;
    }
};
// Add Eventlisteners
export const sortMenuHandler = () => {
    selectorContainerElmt.addEventListener('click', toggleMenu);
};
