export class MediaCard {
    constructor(media) {
        this._media = media;
    }
    get cardElmt() {
        const card = document.createElement('div');
        card.classList.add('media-card');
        card.innerHTML =
            `<a href="#" class="media-card__link">` +
                `<img src="${this._media.thumbnailSrc}" alt="${this._media.title}" class="media-card__picture">` +
                `</a>` +
                `<div class="media-card__infos">` +
                `<h2 class="media-card__title">${this._media.title}</h2>` +
                `<div class="media-card__like-wrapper">` +
                `<p class="media-card__likeCount">${this._media.likes.toString()}</p>` +
                `<i class="media-card__likeIcon fa-solid fa-heart"></i>` +
                `</div>` +
                `</div>`;
        return card;
    }
}
// export class PictureCard extends MediaCard {
//   get cardElmt() {
//     const card = document.createElement('div') as HTMLDivElement
//     card.classList.add('media-card')
//     card.innerHTML =
//       `<a href="#" class="media-card__link">` +
//       `<img src="${this._media.src}" alt="${this._media.title}" class="media-card__picture">` +
//       `</a>` +
//       `<div class="media-card__infos">` +
//       `<h2 class="media-card__title">${this._media.title}</h2>` +
//       `<div class="media-card__like-wrapper">` +
//       `<p class="media-card__likeCount">${this._media.likes.toString()}</p>` +
//       `<i class="media-card__likeIcon fa-solid fa-heart"></i>` +
//       `</div>` +
//       `</div>`
//     return card
//   }
// }
// export class VideoCard extends MediaCard {
//   get cardElmt() {
//     const card = document.createElement('div') as HTMLDivElement
//     card.classList.add('media-card')
//     card.innerHTML =
//       `<a href="#" class="media-card__link">` +
//       `<video src="${this._media.src}" alt="${this._media.title}" class="media-card__picture"></video>` +
//       `</a>` +
//       `<div class="media-card__infos">` +
//       `<h2 class="media-card__title">${this._media.title}</h2>` +
//       `<div class="media-card__like-wrapper">` +
//       `<p class="media-card__likeCount">${this._media.likes.toString()}</p>` +
//       `<i class="media-card__likeIcon fa-solid fa-heart"></i>` +
//       `</div>` +
//       `</div>`
//     return card
//   }
// }
// export class MediaCardFactory {
//   _media: PictureCard | VideoCard
//   constructor(media: Media) {
//     switch (media.type) {
//       case 'picture':
//         this._media = new PictureCard(media)
//         break
//       case 'video':
//         this._media = new VideoCard(media)
//         break
//       default:
//         throw 'Unknown type format'
//     }
//   }
//   get cardElmt() {
//     return this._media.cardElmt
//   }
// }
