import { contactFormHandler } from '../Utils/contactForm.js'

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

const mediaSectionElmt = document.querySelector('.mediaSection') as HTMLElement

// const displayPhotographerData: (
//   photographer: photographerData | undefined
// ) => void = (photographer) => {
//   if (!photographer) return
//   const { name, country, city, tagline, portrait } = photographer

//   photographerNameElmt.innerText = name
//   photographerLocationElmt.innerText = city + ', ' + country
//   photographerTaglineElmt.innerText = tagline
//   photographerPictureElmt.src = `src/Assets/Photographers/${portrait}`
//   photographerPictureElmt.alt = `Photographer ${name}`

//   contactTitleElmt.innerText = `Contactez-moi \n ${name}`
// }

// const displayMedia: (mediaArray: mediaData[]) => void = (mediaArray) => {
//   const mediaSectionElmt = document.querySelector(
//     '.mediaSection'
//   ) as HTMLElement

//   mediaArray.forEach((media) => {
//     const mediaCardElmt = getMediaCardElmt(media)
//     mediaSectionElmt.appendChild(mediaCardElmt)
//   })
// }

// const initPhotographerPage = async () => {
//   const currentPhotographer = await getCurrentPhotographer()
//   if (!currentPhotographer) return
//   displayPhotographerData(currentPhotographer)
//   const currentMedia = await getCurrentMedia(currentPhotographer.id)
//   if (!currentMedia) return
//   displayMedia(currentMedia)
// }

// initPhotographerPage()

// const displayPhotographersCards: (
//   photographersArray: photographerDataType[]
// ) => void = (photographersArray) => {
//   photographersArray
//     .map((photographer) => new Photographer(photographer))
//     .forEach((photographer) => {
//       const photographerCardElmt = new PhotographerCard(photographer).cardElmt
//       photographersSectionElmt.appendChild(photographerCardElmt)
//     })
// }

import { MediaApi, PhotographerApi } from '../Api/api.js'
import { Photographer } from '../Models/photographer.js'
import { Media } from '../Models/media.js'
import { MediaCardFactory, PictureCard, VideoCard } from '../Templates/mediaCard.js'
import { sortMenuHandler } from '../Utils/sortMenu.js'

const getCurrentPhotographer = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id')
  if (!currentId) return

  const currentPhotographerData = await new PhotographerApi(
    '../src/Data/photographers.json'
  ).getCurrentPhotographer(currentId)
  if (!currentPhotographerData) return

  return new Photographer(currentPhotographerData)
}

const getCurrentMedia = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id')
  if (!currentId) return

  const currentMediaData = await new MediaApi(
    '../src/Data/photographers.json'
  ).getCurrentMedia(currentId)
  if (!currentMediaData) return

  return currentMediaData.map((media) => new Media(media))
}

const displayPhotographerInfos: (photographer: Photographer) => void = (
  photographer
) => {
  photographerNameElmt.innerText = photographer.name
  photographerLocationElmt.innerText = photographer.location
  photographerTaglineElmt.innerText = photographer.tagline
  photographerPictureElmt.src = photographer.picture
  photographerPictureElmt.alt = `Photographer ${photographer.name}`
  contactTitleElmt.innerText = `Contactez-moi \n ${photographer.name}`
}

const displayMediaCards: (mediaArray: Media[]) => void = (mediaArray) => {
  mediaArray.forEach((media) => {
    let mediaCardElmt
    switch (media.type) {
      case 'picture':
        mediaCardElmt = new PictureCard(media).cardElmt
        break;
      case 'video':
        mediaCardElmt = new VideoCard(media).cardElmt
        break;
    
      default:
        break;
    }
    // const mediaCardElmt = new MediaCardFactory(media)
    if (mediaCardElmt) mediaSectionElmt.appendChild(mediaCardElmt)
  })
}

const initPhotographerPage = async () => {
  contactFormHandler()
  sortMenuHandler()
  const currentPhotographer = await getCurrentPhotographer()
  const currentMediaArray = await getCurrentMedia()
  if (currentPhotographer) displayPhotographerInfos(currentPhotographer)
  if (currentMediaArray) displayMediaCards(currentMediaArray)
}

initPhotographerPage()
