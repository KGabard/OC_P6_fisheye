export const photographerFactory = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `src/Assets/photographers/ID_Photos/${portrait}`;
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
