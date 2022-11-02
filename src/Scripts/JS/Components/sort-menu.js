import { displayMediaCards, sortMediaArray } from '../Pages/photographer.js';
import { closeElmt, openElmt } from '../Utils/html-class-functions.js';
// DOM Elements
const selectorContainerElmt = document.querySelector('.media-sorter__selector-container');
export const sortButtonElmt = document.querySelector('.media-sorter__sort-button');
const dropdownMenuElmt = document.querySelector('.media-sorter__dropdown-menu');
const chevronElmt = document.querySelector('.media-sorter__chevron');
export const listItemElmts = document.querySelectorAll('.media-sorter__dropdown-menu__list-item');
// Functions
const toggleMenu = () => {
    if (dropdownMenuElmt.classList.contains(dropdownMenuElmt.classList[0] + '--active')) {
        closeElmt(selectorContainerElmt);
        closeElmt(dropdownMenuElmt);
        closeElmt(chevronElmt);
        openElmt(sortButtonElmt);
    }
    else {
        openElmt(selectorContainerElmt);
        openElmt(dropdownMenuElmt);
        openElmt(chevronElmt);
        closeElmt(sortButtonElmt);
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
    listItemElmts.forEach((item) => item.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLiEmlt = e.target;
        const currentInput = currentLiEmlt.getAttribute('data-value') || '';
        sortMediaArray(currentInput);
        updateLabelsInput(currentInput);
        displayMediaCards();
    }));
};
