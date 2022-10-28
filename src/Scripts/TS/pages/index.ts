import { PhotographerApi } from '../Api/api.js'
import { Photographer } from '../Models/photographer.js'
import { PhotographerCard } from '../Templates/photographerCard.js'
import { photographerDataType } from '../Types/types.js'

const photographersSectionElmt = document.querySelector(
  '.photographerSection'
) as HTMLDivElement

const displayPhotographersCards: (
  photographersArray: photographerDataType[]
) => void = (photographersArray) => {
  photographersArray
    .map((photographer) => new Photographer(photographer))
    .forEach((photographer) => {
      const photographerCardElmt = new PhotographerCard(photographer).cardElmt
      photographersSectionElmt.appendChild(photographerCardElmt)
    })
}

const initIndexPage = async () => {
  const photographersArray = await new PhotographerApi(
    '../src/Data/photographers.json'
  ).getPhotographers()
  if (!photographersArray) return
  displayPhotographersCards(photographersArray)
}

initIndexPage()
