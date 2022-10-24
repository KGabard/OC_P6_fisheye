var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { photographerFactory, } from '../factories/photographer.js';
const getPhotographers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('src/data/photographers.json');
        const data = yield res.json();
        if (!res.ok) {
            Promise.reject('Error in 4xx or 5xx range');
            return;
        }
        return data.photographers;
    }
    catch (error) {
        console.log(error);
    }
});
const displayData = (photographers) => __awaiter(void 0, void 0, void 0, function* () {
    const photographersSection = document.querySelector('.photographerSection');
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
});
export const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const photographers = yield getPhotographers();
    displayData(photographers);
});
init();
