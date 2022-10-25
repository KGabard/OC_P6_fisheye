var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getCurrentMedia = (photographerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('src/data/photographers.json');
        const data = yield res.json();
        if (!res.ok) {
            Promise.reject('Error in 4xx or 5xx range');
            return;
        }
        const mediaData = data.media;
        const currentMediaData = mediaData.filter((media) => media.photographerId === photographerId);
        return currentMediaData;
    }
    catch (error) {
        console.log(error);
    }
});
export const getMediaCardElmt = (media) => {
    const { image, title, likes } = media;
    const card = document.createElement('div');
    card.classList.add('mediaCard');
    card.innerHTML =
        `<a href="#" class="mediaCard__link">` +
            `<img src="./src/Assets/Medias/Pictures/${image}" alt="${title}" class="mediaCard__picture">` +
            `</a>` +
            `<div class="mediaCard__infos">` +
            `<h2 class="mediaCard__title">${title}</h2>` +
            `<div class="mediaCard__likeWrapper">` +
            `<p class="mediaCard__likeCount">${likes.toString()}</p>` +
            `<i class="mediaCard__likeIcon fa-solid fa-heart"></i>` +
            `</div>` +
            `</div>`;
    return card;
};
