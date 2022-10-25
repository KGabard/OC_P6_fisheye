//Mettre le code JavaScript lié à la page photographer.html
import { contactFormHandler } from '../utils/contactForm.js'
import {
  photographerData,
  getCurrentPhotographer,
} from '../factories/photographer.js'
import { mediaData, getCurrentMedia, getMediaCardElmt } from '../factories/media.js'

const photographerNameElmt = document.querySelector(
  '.photographerInfos__name'
) as HTMLHeadingElement
const photographerLocationElmt = document.querySelector(
  '.photographerInfos__location'
) as HTMLParagraphElement
const photographerTaglineElmt = document.querySelector(
  '.photographerInfos__tagline'
) as HTMLParagraphElement
const photographerPictureElmt = document.querySelector(
  '.photographerHeader__picture'
) as HTMLImageElement
const contactTitleElmt = document.querySelector(
  '.contactModal__title'
) as HTMLHeadingElement

contactFormHandler()

const displayPhotographerData: (
  photographer: photographerData | undefined
) => void = (photographer) => {
  if (!photographer) return
  const { name, country, city, tagline, portrait } = photographer

  photographerNameElmt.innerText = name
  photographerLocationElmt.innerText = city + ', ' + country
  photographerTaglineElmt.innerText = tagline
  photographerPictureElmt.src = `src/Assets/Photographers/${portrait}`
  photographerPictureElmt.alt = `Photographer ${name}`

  contactTitleElmt.innerText = `Contactez-moi \n ${name}`
}

const displayMedia:(mediaArray: mediaData[]) => void = (mediaArray) => {
  const mediaSectionElmt = document.querySelector(
    '.mediaSection'
  ) as HTMLElement

  mediaArray.forEach((media) => {
    const mediaCardElmt = getMediaCardElmt(media)
    mediaSectionElmt.appendChild(mediaCardElmt)
  })
}

const initPhotographerPage = async () => {
  const currentPhotographer = await getCurrentPhotographer()
  if (!currentPhotographer) return
  displayPhotographerData(currentPhotographer)
  const currentMedia = await getCurrentMedia(currentPhotographer.id)
  if (!currentMedia) return
  displayMedia(currentMedia)
}

initPhotographerPage()
