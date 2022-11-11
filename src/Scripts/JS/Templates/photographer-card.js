export class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }
    get cardElmt() {
        const card = document.createElement('article');
        card.classList.add('photographer-card');
        card.innerHTML =
            `<a class="photographer-card__link" href="photographer.html?id=${this._photographer.id}" aria-label="Lien vers la page photographe de ${this._photographer.name}">` +
                `<img class="photographer-card__picture" src=${this._photographer.picture} alt="">` +
                `<h2 class="photographer-card__name">${this._photographer.name}</h2>` +
                '</a>' +
                `<h3 class="photographer-card__location">${this._photographer.location}</h3>` +
                `<p class="photographer-card__tagline">${this._photographer.tagline}</p>` +
                `<p class="photographer-card__price">${this._photographer.price}</p>`;
        return card;
    }
}
