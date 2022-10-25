var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const photographerFactory = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `src/Assets/Photographers/${portrait}`;
    const getUserCardDOM = () => {
        const card = document.createElement('article');
        card.classList.add('photographerCard');
        card.innerHTML =
            `<a class="photographerCard__link" href="photographer.html?id=${id}" aria-label="Link to photographer ${name}">` +
                `<img class="photographerCard__picture" src=${picture} alt="">` +
                `<h2 class="photographerCard__name">${name}</h2>` +
                `</a>` +
                `<h3 class="photographerCard__location">${city}, ${country}</h3>` +
                `<p class="photographerCard__tagline">${tagline}</p>` +
                `<p class="photographerCard__price">${price}€/jour</p>`;
        return card;
    };
    return { name, picture, getUserCardDOM };
};
export const getPhotographers = () => __awaiter(void 0, void 0, void 0, function* () {
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
export const getCurrentPhotographer = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = new URLSearchParams(window.location.search).get('id');
    const photographers = yield getPhotographers();
    return photographers.find((photographer) => photographer.id.toString() === currentId);
});
