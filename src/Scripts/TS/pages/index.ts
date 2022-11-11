import { PhotographerApi } from '../Api/api.js'
import { Photographer } from '../Models/photographer.js'
import { PhotographerCard } from '../Templates/photographer-card.js'
import type { PhotographerDataType } from '../Types/types.js'

const photographersSectionElmt = document.querySelector(
  '.photographer-section'
)!

const displayPhotographersCards: (
  photographersArray: PhotographerDataType[]
) => void = (photographersArray) => {
  photographersSectionElmt.innerHTML = ''
  photographersArray
    .map((photographer) => new Photographer(photographer))
    .forEach((photographer) => {
      const photographerCardElmt = new PhotographerCard(photographer).cardElmt
      photographersSectionElmt.appendChild(photographerCardElmt)
    })
}

const initIndexPage = async () => {
  const photographersArray =
    (await new PhotographerApi(
      './src/Data/photographers.json'
    ).getPhotographers()) ?? []
  displayPhotographersCards(photographersArray)
}

initIndexPage()
