import { ariaHideMainContent, currentMediaArray, homepageLinkElmt, } from '../Pages/photographer.js';
import { browseTabElmts, closeElmt, elmtIsActive, openElmt, } from '../Utils/html-functions.js';
//-------------
// DOM Elements
//-------------
export const lightboxContainerElmt = document.querySelector('.lightbox__container');
export const lightboxModalElmt = document.querySelector('.lightbox');
const lightboxOverlayElmt = document.querySelector('.lightbox__overlay');
const lightboxCloseIconElmt = document.querySelector('.lightbox__close-icon');
const lightboxPreviousButtonElmt = document.querySelector('.lightbox__previous-button');
const lightboxNextButtonElmt = document.querySelector('.lightbox__next-button');
const lightboxMediaContainerElmt = document.querySelector('.lightbox__media-container');
const lightboxTitleElmt = document.querySelector('.lightbox__title');
//----------
// Functions
//----------
const displayTargetMedia = (targetMedia) => {
    lightboxTitleElmt.innerText = `${targetMedia.title}`;
    switch (targetMedia.type) {
        case 'picture':
            lightboxMediaContainerElmt.innerHTML = `<img src="${targetMedia.originalSrc}" alt="${targetMedia.title}" class="lightbox__media" data-value="${targetMedia.id}">`;
            break;
        case 'video':
            lightboxMediaContainerElmt.innerHTML = `<video src="${targetMedia.originalSrc}" controls class="lightbox__media" data-value="${targetMedia.id}">`;
            break;
        default:
            throw 'Unkowned format type';
    }
};
const openLightbox = (e) => {
    e.preventDefault();
    const targetThumbnail = e.target;
    const targetId = targetThumbnail.getAttribute('data-value') || '';
    const targetMedia = currentMediaArray.find((media) => media.id === parseInt(targetId));
    openElmt(lightboxContainerElmt);
    ariaHideMainContent(true);
    lightboxNextButtonElmt.focus();
    if (targetMedia) {
        displayTargetMedia(targetMedia);
    }
};
const browseMedia = (option) => {
    const currentDisplayedMedia = document.querySelector('.lightbox__media');
    const currentId = parseInt(currentDisplayedMedia.getAttribute('data-value') || '');
    const currentIndex = currentMediaArray.findIndex((media) => media.id === currentId);
    if (isNaN(currentIndex) || currentIndex === -1)
        return;
    const nextMedia = currentIndex === currentMediaArray.length - 1
        ? currentMediaArray[0]
        : currentMediaArray[currentIndex + 1];
    const previousMedia = currentIndex === 0
        ? currentMediaArray[currentMediaArray.length - 1]
        : currentMediaArray[currentIndex - 1];
    switch (option) {
        case 'forward':
            displayTargetMedia(nextMedia);
            break;
        case 'backward':
            displayTargetMedia(previousMedia);
            break;
        default:
            throw 'Unkowned format type';
    }
};
// Function that close the lightbox modal
const closeLightboxModal = () => {
    closeElmt(lightboxContainerElmt);
    ariaHideMainContent(false);
    homepageLinkElmt.focus();
};
const handleKeyboard = (e) => {
    const lightboxTabIndex = 300;
    if (!elmtIsActive(lightboxContainerElmt))
        return;
    switch (e.key) {
        case 'ArrowRight':
            browseMedia('forward');
            break;
        case 'ArrowLeft':
            browseMedia('backward');
            break;
        case 'Escape':
            closeElmt(lightboxContainerElmt);
            break;
        case 'Tab':
            e.preventDefault();
            if (e.shiftKey) {
                browseTabElmts(lightboxContainerElmt, 'backward', lightboxTabIndex);
            }
            else {
                browseTabElmts(lightboxContainerElmt, 'forward', lightboxTabIndex);
            }
            break;
        default:
            break;
    }
};
//----------------
// Event Listeners
//----------------
export const addMediaCardLink = () => {
    const mediaCardLinkElmt = document.querySelectorAll('.media-card__picture');
    mediaCardLinkElmt.forEach((image) => {
        image.addEventListener('click', (e) => openLightbox(e));
        image.addEventListener('keydown', (e) => {
            e.key === 'Enter' && openLightbox(e);
        });
    });
};
export const lightboxHandler = () => {
    lightboxOverlayElmt.addEventListener('click', () => {
        closeLightboxModal();
    });
    lightboxCloseIconElmt.addEventListener('click', () => {
        closeLightboxModal();
    });
    lightboxCloseIconElmt.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter')
            return;
        closeLightboxModal();
    });
    lightboxNextButtonElmt.addEventListener('click', () => browseMedia('forward'));
    lightboxNextButtonElmt.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter')
            return;
        browseMedia('forward');
    });
    lightboxPreviousButtonElmt.addEventListener('click', () => browseMedia('backward'));
    lightboxPreviousButtonElmt.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter')
            return;
        browseMedia('backward');
    });
    document.addEventListener('keydown', (e) => handleKeyboard(e));
};
