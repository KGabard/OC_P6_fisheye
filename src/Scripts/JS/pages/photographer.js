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
import { getPhotographers } from '../pages/index.js';
const photographerNameElmt = document.querySelector('.photographerInfos__name');
const photographerLocationElmt = document.querySelector('.photographerInfos__location');
const photographerTaglineElmt = document.querySelector('.photographerInfos__tagline');
const photographerPictureElmt = document.querySelector('.photographerHeader__picture');
contactFormHandler();
const getCurrentPhotographer = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id');
    console.log(currentId);
    const photographers = yield getPhotographers();
    return photographers.filter((photographer) => photographer.id.toString() === currentId);
});
const displayPhotographerData = (photographer) => {
    const { name, country, city, tagline, portrait } = photographer[0];
    photographerNameElmt.innerText = name;
    photographerLocationElmt.innerText = country + ', ' + city;
    photographerTaglineElmt.innerText = tagline;
    photographerPictureElmt.src = `src/Assets/photographers/ID_Photos/${portrait}`;
    photographerPictureElmt.alt = `Photographer ${name}`;
};
const initPhotographerPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentPhotographer = yield getCurrentPhotographer();
    displayPhotographerData(currentPhotographer);
});
initPhotographerPage();
