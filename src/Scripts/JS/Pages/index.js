var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PhotographerApi } from '../Api/api.js';
import { Photographer } from '../Models/photographer.js';
import { PhotographerCard } from '../Templates/photographer-card.js';
const photographersSectionElmt = document.querySelector('.photographer-section');
const displayPhotographersCards = (photographersArray) => {
    photographersSectionElmt.innerHTML = '';
    photographersArray
        .map((photographer) => new Photographer(photographer))
        .forEach((photographer) => {
        const photographerCardElmt = new PhotographerCard(photographer).cardElmt;
        photographersSectionElmt.appendChild(photographerCardElmt);
    });
};
const initIndexPage = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const photographersArray = (_a = (yield new PhotographerApi('./src/Data/photographers.json').getPhotographers())) !== null && _a !== void 0 ? _a : [];
    displayPhotographersCards(photographersArray);
});
initIndexPage();
