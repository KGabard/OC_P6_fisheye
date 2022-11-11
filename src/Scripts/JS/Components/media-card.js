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
    const targetMediaCardElmt = targetLikeIconElmt.closest('.media-card');
    const targetMediaElmt = targetMediaCardElmt.querySelector('.media-card__picture');
    const targetId = parseInt((_a = targetMediaElmt.getAttribute('data-value')) !== null && _a !== void 0 ? _a : '');
    currentMediaArray.forEach((media) => {
        if (media.id === targetId) {
            if (media.isLiked) {
                media.removeLike();
            }
            else {
                media.addLike();
            }
            media.toggleIsLiked();
        }
    });
    displayMediaCards();
    displayStickyBarInfos();
};
//----------------
// Event Listeners
//----------------
export const addLikeIconEventListener = () => {
    const mediaCardLikeIconElmt = document.querySelectorAll('.media-card__like-icon');
    mediaCardLikeIconElmt.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            addLike(e);
        });
        icon.addEventListener('keydown', (e) => {
            if (e instanceof KeyboardEvent && e.key === 'Enter')
                addLike(e);
        });
    });
};
