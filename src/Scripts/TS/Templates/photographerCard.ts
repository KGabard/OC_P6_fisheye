import { Photographer } from '../Models/photographer.js'

export class PhotographerCard {
  _photographer: Photographer
  constructor(photographer: Photographer) {
    this._photographer = photographer
  }

  get cardElmt() {
    const card = document.createElement('article') as HTMLElement
    card.classList.add('photographerCard')

    card.innerHTML =
      `<a class="photographerCard__link" href="photographer.html?id=${this._photographer.id}" aria-label="Link to photographer ${this._photographer.name}">` +
      `<img class="photographerCard__picture" src=${this._photographer.picture} alt="">` +
      `<h2 class="photographerCard__name">${this._photographer.name}</h2>` +
      `</a>` +
      `<h3 class="photographerCard__location">${this._photographer.location}</h3>` +
      `<p class="photographerCard__tagline">${this._photographer.tagline}</p>` +
      `<p class="photographerCard__price">${this._photographer.price}</p>`

    return card
  }
}
