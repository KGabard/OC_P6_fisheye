"use strict";
// export type photographerData = {
//   name: string
//   id: number
//   city: string
//   country: string
//   tagline: string
//   price: number
//   portrait: string
// }
// type photographerFactoryType = (data: photographerData) => {
//   name: string
//   picture: string
//   getUserCardDOM: () => HTMLElement
// }
// export const photographerFactory: photographerFactoryType = (data) => {
//   const { name, id, city, country, tagline, price, portrait } = data
//   const picture = `src/Assets/Photographers/${portrait}`
//   const getUserCardDOM = () => {
//     const card = document.createElement('article') as HTMLElement
//     card.classList.add('photographerCard')
//     card.innerHTML =
//       `<a class="photographerCard__link" href="photographer.html?id=${id}" aria-label="Link to photographer ${name}">` +
//       `<img class="photographerCard__picture" src=${picture} alt="">` +
//       `<h2 class="photographerCard__name">${name}</h2>` +
//       `</a>` +
//       `<h3 class="photographerCard__location">${city}, ${country}</h3>` +
//       `<p class="photographerCard__tagline">${tagline}</p>` +
//       `<p class="photographerCard__price">${price}€/jour</p>`
//     return card
//   }
//   return { name, picture, getUserCardDOM }
// }
// export const getPhotographers: () => Promise<photographerData[]> = async () => {
//   try {
//     const res = await fetch('src/data/photographers.json')
//     const data = await res.json()
//     if (!res.ok) {
//       Promise.reject('Error in 4xx or 5xx range')
//       return
//     }
//     return data.photographers
//   } catch (error) {
//     console.log(error)
//   }
// }
// export const getCurrentPhotographer: () => Promise<
//   photographerData | undefined
// > = async () => {
//   const currentId = new URLSearchParams(window.location.search).get('id')
//   const photographers = await getPhotographers()
//   return photographers.find(
//     (photographer) => photographer.id.toString() === currentId
//   )
// }
