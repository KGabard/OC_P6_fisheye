//-------------
// DOM Elements
//-------------
import { currentMediaArray, displayMediaCards, displayStickyBarInfos, } from '../Pages/photographer.js';
//----------
// Functions
//----------
const addLike = (e) => {
    var _a;
    e.preventDefault();
    const targetLikeIconElmt = e.target;
    const targetMediaElmt = (_a = targetLikeIconElmt
        .closest('.media-card')) === null || _a === void 0 ? void 0 : _a.querySelector('.media-card__picture');
    const targetId = parseInt(targetMediaElmt.getAttribute('data-value') || '');
    currentMediaArray.map((media) => {
        if (media.id === targetId) {
            media.isLiked ? media.removeLike() : media.addLike();
            media.toggleIsLiked();
        }
    });
    //! Ne pas re-display tous les médias, juste changer le nombre de like sur la carte concernée
    displayMediaCards();
    displayStickyBarInfos();
};
//----------------
// Event Listeners
//----------------
export const addLikeIconEventListener = () => {
    const mediaCardLikeIconElmt = document.querySelectorAll('.media-card__like-icon');
    mediaCardLikeIconElmt.forEach((icon) => icon.addEventListener('click', (e) => addLike(e)));
};
export const mediaCardHandler = () => { };
