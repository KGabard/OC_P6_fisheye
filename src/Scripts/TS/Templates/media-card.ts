import type { Media } from '../Models/media.js'

export class MediaCard {
  _media: Media
  constructor(media: Media) {
    this._media = media
  }

  get cardElmt() {
    const card = document.createElement('div')
    card.classList.add('media-card')

    card.innerHTML = `
		<img data-value="${this._media.id.toString()}" src="${
      this._media.thumbnailSrc ?? ''
    }" alt="Afficher ${
      this._media.title
    } en grand" class="media-card__picture" tabindex="0">
    <div class="media-card__infos">
    	<h2 class="media-card__title">${this._media.title}</h2>
    	<div class="media-card__like-container ${
        this._media.isLiked ? 'media-card__like-container--liked' : ''
      }">
    		<p class="media-card__like-count">${this._media.likes.toString()}</p>
    		<i class="media-card__like-icon fa-solid fa-heart" aria-label="Aimer le média ${
          this._media.title
        }" tabindex="0"></i>
    	</div>
    </div>`

    return card
  }
}
