var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { contactFormHandler } from '../Utils/contactForm.js';
const photographerNameElmt = document.querySelector('.photographerInfos__name');
const photographerLocationElmt = document.querySelector('.photographerInfos__location');
const photographerTaglineElmt = document.querySelector('.photographerInfos__tagline');
const photographerPictureElmt = document.querySelector('.photographerHeader__picture');
const contactTitleElmt = document.querySelector('.contactModal__title');
const mediaSectionElmt = document.querySelector('.mediaSection');
// const displayPhotographerData: (
//   photographer: photographerData | undefined
// ) => void = (photographer) => {
//   if (!photographer) return
//   const { name, country, city, tagline, portrait } = photographer
//   photographerNameElmt.innerText = name
//   photographerLocationElmt.innerText = city + ', ' + country
//   photographerTaglineElmt.innerText = tagline
//   photographerPictureElmt.src = `src/Assets/Photographers/${portrait}`
//   photographerPictureElmt.alt = `Photographer ${name}`
//   contactTitleElmt.innerText = `Contactez-moi \n ${name}`
// }
// const displayMedia: (mediaArray: mediaData[]) => void = (mediaArray) => {
//   const mediaSectionElmt = document.querySelector(
//     '.mediaSection'
//   ) as HTMLElement
//   mediaArray.forEach((media) => {
//     const mediaCardElmt = getMediaCardElmt(media)
//     mediaSectionElmt.appendChild(mediaCardElmt)
//   })
// }
// const initPhotographerPage = async () => {
//   const currentPhotographer = await getCurrentPhotographer()
//   if (!currentPhotographer) return
//   displayPhotographerData(currentPhotographer)
//   const currentMedia = await getCurrentMedia(currentPhotographer.id)
//   if (!currentMedia) return
//   displayMedia(currentMedia)
// }
// initPhotographerPage()
// const displayPhotographersCards: (
//   photographersArray: photographerDataType[]
// ) => void = (photographersArray) => {
//   photographersArray
//     .map((photographer) => new Photographer(photographer))
//     .forEach((photographer) => {
//       const photographerCardElmt = new PhotographerCard(photographer).cardElmt
//       photographersSectionElmt.appendChild(photographerCardElmt)
//     })
// }
import { MediaApi, PhotographerApi } from '../Api/api.js';
import { Photographer } from '../Models/photographer.js';
import { Media } from '../Models/media.js';
import { PictureCard, VideoCard } from '../Templates/mediaCard.js';
import { sortMenuHandler } from '../Utils/sortMenu.js';
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
    mediaArray.forEach((media) => {
        let mediaCardElmt;
        switch (media.type) {
            case 'picture':
                mediaCardElmt = new PictureCard(media).cardElmt;
                break;
            case 'video':
                mediaCardElmt = new VideoCard(media).cardElmt;
                break;
            default:
                break;
        }
        // const mediaCardElmt = new MediaCardFactory(media)
        if (mediaCardElmt)
            mediaSectionElmt.appendChild(mediaCardElmt);
    });
};
const initPhotographerPage = () => __awaiter(void 0, void 0, void 0, function* () {
    contactFormHandler();
    sortMenuHandler();
    const currentPhotographer = yield getCurrentPhotographer();
    const currentMediaArray = yield getCurrentMedia();
    if (currentPhotographer)
        displayPhotographerInfos(currentPhotographer);
    if (currentMediaArray)
        displayMediaCards(currentMediaArray);
});
initPhotographerPage();
