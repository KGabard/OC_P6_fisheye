var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Mettre le code JavaScript lié à la page photographer.html
import { contactFormHandler } from '../utils/contactForm.js';
import { getCurrentPhotographer, } from '../factories/photographer.js';
import { getCurrentMedia, getMediaCardElmt } from '../factories/media.js';
const photographerNameElmt = document.querySelector('.photographerInfos__name');
const photographerLocationElmt = document.querySelector('.photographerInfos__location');
const photographerTaglineElmt = document.querySelector('.photographerInfos__tagline');
const photographerPictureElmt = document.querySelector('.photographerHeader__picture');
const contactTitleElmt = document.querySelector('.contactModal__title');
contactFormHandler();
const displayPhotographerData = (photographer) => {
    if (!photographer)
        return;
    const { name, country, city, tagline, portrait } = photographer;
    photographerNameElmt.innerText = name;
    photographerLocationElmt.innerText = city + ', ' + country;
    photographerTaglineElmt.innerText = tagline;
    photographerPictureElmt.src = `src/Assets/Photographers/${portrait}`;
    photographerPictureElmt.alt = `Photographer ${name}`;
    contactTitleElmt.innerText = `Contactez-moi \n ${name}`;
};
const displayMedia = (mediaArray) => {
    const mediaSectionElmt = document.querySelector('.mediaSection');
    mediaArray.forEach((media) => {
        const mediaCardElmt = getMediaCardElmt(media);
        mediaSectionElmt.appendChild(mediaCardElmt);
    });
};
const initPhotographerPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentPhotographer = yield getCurrentPhotographer();
    if (!currentPhotographer)
        return;
    displayPhotographerData(currentPhotographer);
    const currentMedia = yield getCurrentMedia(currentPhotographer.id);
    if (!currentMedia)
        return;
    displayMedia(currentMedia);
});
initPhotographerPage();
