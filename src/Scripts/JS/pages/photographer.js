var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import { contactFormHandler } from '../Utils/contactForm.js';
import { MediaApi, PhotographerApi } from '../Api/api.js';
import { Photographer } from '../Models/photographer.js';
import { Media } from '../Models/media.js';
import { MediaCardFactory } from '../Templates/mediaCard.js';
import { listItemElmts, sortButtonElmt, sortMenuHandler, updateLabelsInput, } from '../Utils/sortMenu.js';
// Global variables
let currentMediaArray = [];
// DOM Elements
const photographerNameElmt = document.querySelector('.photographerInfos__name');
const photographerLocationElmt = document.querySelector('.photographerInfos__location');
const photographerTaglineElmt = document.querySelector('.photographerInfos__tagline');
const photographerPictureElmt = document.querySelector('.photographerHeader__picture');
const contactTitleElmt = document.querySelector('.contactModal__title');
const mediaSectionElmt = document.querySelector('.mediaSection');
// Functions
const getCurrentPhotographer = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id');
    if (!currentId)
        return;
    const currentPhotographerData = yield new PhotographerApi('../src/Data/photographers.json').getCurrentPhotographer(currentId);
    if (!currentPhotographerData)
        return;
    return new Photographer(currentPhotographerData);
});
const getCurrentMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id');
    if (!currentId)
        return;
    const currentMediaData = yield new MediaApi('../src/Data/photographers.json').getCurrentMedia(currentId);
    if (!currentMediaData)
        return;
    return currentMediaData.map((media) => new Media(media));
});
const displayPhotographerInfos = (photographer) => {
    photographerNameElmt.innerText = photographer.name;
    photographerLocationElmt.innerText = photographer.location;
    photographerTaglineElmt.innerText = photographer.tagline;
    photographerPictureElmt.src = photographer.picture;
    photographerPictureElmt.alt = `Photographer ${photographer.name}`;
    contactTitleElmt.innerText = `Contactez-moi \n ${photographer.name}`;
};
const displayMediaCards = (mediaArray) => {
    mediaSectionElmt.innerHTML = '';
    mediaArray.forEach((media) => {
        const mediaCardElmt = new MediaCardFactory(media).cardElmt;
        mediaSectionElmt.appendChild(mediaCardElmt);
    });
};
const likesComparator = (a, b) => {
    return b.likes - a.likes;
};
const datesComparator = (a, b) => {
    const aDate = a.date.split('-');
    const bDate = b.date.split('-');
    const aYear = parseInt(aDate[0]);
    const bYear = parseInt(bDate[0]);
    const aMonth = parseInt(aDate[1]);
    const bMonth = parseInt(bDate[1]);
    const aDay = parseInt(aDate[2]);
    const bDay = parseInt(bDate[2]);
    if (aYear !== bYear)
        return bYear - aYear;
    if (aMonth !== bMonth)
        return bMonth - aMonth;
    if (aDay !== bDay)
        return bDay - aDay;
    return 0;
};
const titlesComparator = (a, b) => {
    return a.title.localeCompare(b.title);
};
const sortMediaArray = (type) => {
    switch (type) {
        case 'popularité':
            currentMediaArray.sort(likesComparator);
            break;
        case 'date':
            currentMediaArray.sort(datesComparator);
            break;
        case 'titre':
            currentMediaArray.sort(titlesComparator);
            break;
        default:
            break;
    }
};
const handleSortMenu = () => {
    listItemElmts.forEach((item) => item.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLiEmlt = e.target;
        const currentInput = currentLiEmlt.getAttribute('data-value') || '';
        sortMediaArray(currentInput);
        updateLabelsInput(currentInput);
        displayMediaCards(currentMediaArray);
    }));
};
const initPhotographerPage = () => __awaiter(void 0, void 0, void 0, function* () {
    contactFormHandler();
    sortMenuHandler();
    const currentPhotographer = yield getCurrentPhotographer();
    currentMediaArray = (yield getCurrentMedia()) || [];
    sortMediaArray(sortButtonElmt.getAttribute('data-value') || '');
    if (currentPhotographer)
        displayPhotographerInfos(currentPhotographer);
    displayMediaCards(currentMediaArray);
    handleSortMenu();
});
initPhotographerPage();
