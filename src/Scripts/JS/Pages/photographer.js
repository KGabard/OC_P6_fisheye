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
import { contactFormHandler } from '../Components/contact-form.js';
import { MediaApi, PhotographerApi } from '../Api/api.js';
import { Photographer } from '../Models/photographer.js';
import { Media } from '../Models/media.js';
import { sortButtonElmt, sortMenuHandler } from '../Components/sort-menu.js';
import { MediaCard } from '../Templates/media-card.js';
import { addMediaCardLink, lightboxHandler } from '../Components/lightbox.js';
import { addLikeIconEventListener } from '../Components/media-card.js';
// Global variables
export let currentMediaArray = [];
let currentPhotographer;
let firstLoading = true;
// DOM Elements
const photographerNameElmt = document.querySelector('.photographer-infos__name');
const photographerLocationElmt = document.querySelector('.photographer-infos__location');
const photographerTaglineElmt = document.querySelector('.photographer-infos__tagline');
const photographerPictureElmt = document.querySelector('.photographer-header__picture');
const contactTitleElmt = document.querySelector('.contact-modal__title');
const mediaSectionElmt = document.querySelector('.media-section');
const likeCountElmt = document.querySelector('.sticky-bar__like-count');
const likePriceElmt = document.querySelector('.sticky-bar__price');
const headerElmt = document.querySelector('.header');
const mainSectionElmt = document.querySelector('.main-section');
const stickyBarElmt = document.querySelector('.sticky-bar');
// Functions
const getCurrentPhotographer = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id') || '';
    const currentPhotographerData = yield new PhotographerApi('./src/Data/photographers.json').getCurrentPhotographer(currentId);
    return currentPhotographerData
        ? new Photographer(currentPhotographerData)
        : null;
});
const getCurrentMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id') || '';
    const currentMediaData = yield new MediaApi('./src/Data/photographers.json').getCurrentMedia(currentId);
    return currentMediaData
        ? currentMediaData.map((media) => new Media(media))
        : null;
});
const getCurrentLikeCount = () => {
    return currentMediaArray.reduce((totalLikes, media) => totalLikes + media.likes, 0);
};
const displayphotographerInfos = () => {
    if (!currentPhotographer)
        return;
    photographerNameElmt.innerText = currentPhotographer.name;
    photographerLocationElmt.innerText = currentPhotographer.location;
    photographerTaglineElmt.innerText = currentPhotographer.tagline;
    photographerPictureElmt.src = currentPhotographer.picture;
    photographerPictureElmt.alt = `Photographe ${currentPhotographer.name}`;
    contactTitleElmt.innerText = `Contactez-moi \n ${currentPhotographer.name}`;
};
export const displayMediaCards = () => {
    mediaSectionElmt.innerHTML = '';
    currentMediaArray.forEach((media) => {
        const mediaCardElmt = new MediaCard(media).cardElmt;
        mediaSectionElmt.appendChild(mediaCardElmt);
    });
    addMediaCardLink();
    addLikeIconEventListener();
    !firstLoading &&
        mediaSectionElmt.classList.remove('media-section--first-loading');
    firstLoading = false;
};
export const displayStickyBarInfos = () => {
    likeCountElmt.innerText = getCurrentLikeCount().toString();
    if (currentPhotographer)
        likePriceElmt.innerText = currentPhotographer.price;
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
export const sortMediaArray = (type) => {
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
export const ariaHideMainContent = (isHidden) => {
    if (isHidden) {
        headerElmt.setAttribute('aria-hidden', 'true');
        mainSectionElmt.setAttribute('aria-hidden', 'true');
        stickyBarElmt.setAttribute('aria-hidden', 'true');
    }
    else {
        headerElmt.setAttribute('aria-hidden', 'false');
        mainSectionElmt.setAttribute('aria-hidden', 'false');
        stickyBarElmt.setAttribute('aria-hidden', 'false');
    }
};
const initPhotographerPage = () => __awaiter(void 0, void 0, void 0, function* () {
    contactFormHandler();
    sortMenuHandler();
    lightboxHandler();
    currentPhotographer = yield getCurrentPhotographer();
    currentMediaArray = (yield getCurrentMedia()) || [];
    sortMediaArray(sortButtonElmt.getAttribute('data-value') || '');
    displayphotographerInfos();
    displayMediaCards();
    displayStickyBarInfos();
});
initPhotographerPage();
