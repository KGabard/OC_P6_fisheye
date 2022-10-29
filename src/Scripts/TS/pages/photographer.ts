// Imports
import { contactFormHandler } from '../Utils/contactForm.js'
import { MediaApi, PhotographerApi } from '../Api/api.js'
import { Photographer } from '../Models/photographer.js'
import { Media } from '../Models/media.js'
import {
  listItemElmts,
  sortButtonElmt,
  sortMenuHandler,
  updateLabelsInput,
} from '../Utils/sortMenu.js'
import { MediaCard } from '../Templates/mediaCard.js'

// Global variables
let currentMediaArray: Media[] = []

// DOM Elements
const photographerNameElmt = document.querySelector(
  '.photographer-infos__name'
) as HTMLHeadingElement
const photographerLocationElmt = document.querySelector(
  '.photographer-infos__location'
) as HTMLParagraphElement
const photographerTaglineElmt = document.querySelector(
  '.photographer-infos__tagline'
) as HTMLParagraphElement
const photographerPictureElmt = document.querySelector(
  '.photographer-header__picture'
) as HTMLImageElement
const contactTitleElmt = document.querySelector(
  '.contact-modal__title'
) as HTMLHeadingElement
const mediaSectionElmt = document.querySelector('.media-section') as HTMLElement

// Functions
const getCurrentPhotographer = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id') || ''

  const currentPhotographerData = await new PhotographerApi(
    '../src/Data/photographers.json'
  ).getCurrentPhotographer(currentId)

  return currentPhotographerData
    ? new Photographer(currentPhotographerData)
    : null
}

const getCurrentMedia = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id') || ''

  const currentMediaData = await new MediaApi(
    '../src/Data/photographers.json'
  ).getCurrentMedia(currentId)

  return currentMediaData
    ? currentMediaData.map((media) => new Media(media))
    : null
}

const displayphotographerInfos: (photographer: Photographer) => void = (
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
  mediaSectionElmt.innerHTML = ''
  mediaArray.forEach((media) => {
    const mediaCardElmt = new MediaCard(media).cardElmt
    mediaSectionElmt.appendChild(mediaCardElmt)
  })
}

const likesComparator: (a: Media, b: Media) => number = (a, b) => {
  return b.likes - a.likes
}

const datesComparator: (a: Media, b: Media) => number = (a, b) => {
  const aDate = a.date.split('-')
  const bDate = b.date.split('-')
  const aYear = parseInt(aDate[0])
  const bYear = parseInt(bDate[0])
  const aMonth = parseInt(aDate[1])
  const bMonth = parseInt(bDate[1])
  const aDay = parseInt(aDate[2])
  const bDay = parseInt(bDate[2])
  if (aYear !== bYear) return bYear - aYear
  if (aMonth !== bMonth) return bMonth - aMonth
  if (aDay !== bDay) return bDay - aDay
  return 0
}

const titlesComparator: (a: Media, b: Media) => number = (a, b) => {
  return a.title.localeCompare(b.title)
}

const sortMediaArray: (type: string) => void = (type) => {
  switch (type) {
    case 'popularité':
      currentMediaArray.sort(likesComparator)
      break
    case 'date':
      currentMediaArray.sort(datesComparator)
      break
    case 'titre':
      currentMediaArray.sort(titlesComparator)
      break

    default:
      break
  }
}

const handleSortMenu = () => {
  listItemElmts.forEach((item) =>
    item.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()

      const currentLiEmlt = e.target as HTMLLIElement
      const currentInput = currentLiEmlt.getAttribute('data-value') || ''

      sortMediaArray(currentInput)
      updateLabelsInput(currentInput)
      displayMediaCards(currentMediaArray)
    })
  )
}

const initPhotographerPage = async () => {
  contactFormHandler()
  sortMenuHandler()
  const currentPhotographer = await getCurrentPhotographer()
  currentMediaArray = (await getCurrentMedia()) || []
  sortMediaArray(sortButtonElmt.getAttribute('data-value') || '')
  if (currentPhotographer) displayphotographerInfos(currentPhotographer)
  displayMediaCards(currentMediaArray)
  handleSortMenu()
}

initPhotographerPage()
