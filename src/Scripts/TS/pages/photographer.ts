// Imports
import {
  contactFormHandler,
  contactModalContainerElmt,
} from '../Components/contact-form.js'
import { MediaApi, PhotographerApi } from '../Api/api.js'
import { Photographer } from '../Models/photographer.js'
import { Media } from '../Models/media.js'
import {
  selectorContainerElmt,
  sortButtonElmt,
  sortMenuHandler,
} from '../Components/sort-menu.js'
import { MediaCard } from '../Templates/media-card.js'
import {
  addMediaCardLink,
  lightboxContainerElmt,
  lightboxHandler,
} from '../Components/lightbox.js'
import { addLikeIconEventListener } from '../Components/media-card.js'
import { browseTabElmts, elmtIsActive } from '../Utils/html-functions.js'

// Global variables
export let currentMediaArray: Media[] = []
let currentPhotographer: Photographer | null
let firstLoading = true

// DOM Elements
export const homepageLinkElmt = document.querySelector(
  '.header__link'
) as HTMLAnchorElement
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
const likeCountElmt = document.querySelector(
  '.sticky-bar__like-count'
) as HTMLParagraphElement
const likePriceElmt = document.querySelector(
  '.sticky-bar__price'
) as HTMLParagraphElement
const headerElmt = document.querySelector('.header') as HTMLElement
const mainSectionElmt = document.querySelector('.main-section') as HTMLElement
const stickyBarElmt = document.querySelector('.sticky-bar') as HTMLDivElement

// Functions
const getCurrentPhotographer = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id') || ''

  const currentPhotographerData = await new PhotographerApi(
    './src/Data/photographers.json'
  ).getCurrentPhotographer(currentId)

  return currentPhotographerData
    ? new Photographer(currentPhotographerData)
    : null
}

const getCurrentMedia = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id') || ''

  const currentMediaData = await new MediaApi(
    './src/Data/photographers.json'
  ).getCurrentMedia(currentId)

  return currentMediaData
    ? currentMediaData.map((media) => new Media(media))
    : null
}

const getCurrentLikeCount = () => {
  return currentMediaArray.reduce(
    (totalLikes, media) => totalLikes + media.likes,
    0
  )
}

const displayphotographerInfos = () => {
  if (!currentPhotographer) return
  document.title = `Photographe - ${currentPhotographer.name}`
  photographerNameElmt.innerText = currentPhotographer.name
  photographerLocationElmt.innerText = currentPhotographer.location
  photographerTaglineElmt.innerText = currentPhotographer.tagline
  photographerPictureElmt.src = currentPhotographer.picture
  photographerPictureElmt.alt = `Photographe ${currentPhotographer.name}`
  contactTitleElmt.innerText = `Contactez-moi \n ${currentPhotographer.name}`
}

export const displayMediaCards = () => {
  mediaSectionElmt.innerHTML = ''
  currentMediaArray.forEach((media) => {
    const mediaCardElmt = new MediaCard(media).cardElmt
    mediaSectionElmt.appendChild(mediaCardElmt)
  })
  addMediaCardLink()
  addLikeIconEventListener()
  !firstLoading &&
    mediaSectionElmt.classList.remove('media-section--first-loading')
  firstLoading = false
}

export const displayStickyBarInfos = () => {
  likeCountElmt.innerText = getCurrentLikeCount().toString()
  if (currentPhotographer) likePriceElmt.innerText = currentPhotographer.price
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

export const sortMediaArray: (type: string) => void = (type) => {
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

export const ariaHideMainContent = (isHidden: boolean) => {
  if (isHidden) {
    headerElmt.setAttribute('aria-hidden', 'true')
    mainSectionElmt.setAttribute('aria-hidden', 'true')
    stickyBarElmt.setAttribute('aria-hidden', 'true')
  } else {
    headerElmt.setAttribute('aria-hidden', 'false')
    mainSectionElmt.setAttribute('aria-hidden', 'false')
    stickyBarElmt.setAttribute('aria-hidden', 'false')
  }
}

// Function that handles keyboard events
const handleKeyboard: (e: KeyboardEvent) => void = (e) => {
  const bodyTabIndex = 0
  const selectorTabIndex = 100
  if (
    elmtIsActive(contactModalContainerElmt) ||
    elmtIsActive(lightboxContainerElmt)
  )
    return

  switch (e.key) {
    case 'Enter':
      // (document.activeElement === contactModalCloseIconElmt) && closeContactModal()

      break
    case 'Tab':
      e.preventDefault()
      let currentHtmlElmt = document.body
      let currentTabIndex = bodyTabIndex
      if (elmtIsActive(selectorContainerElmt)) {
        currentHtmlElmt = selectorContainerElmt
        currentTabIndex = selectorTabIndex
      }

      if (e.shiftKey) {
        browseTabElmts(currentHtmlElmt, 'backward', currentTabIndex)
      } else {
        browseTabElmts(currentHtmlElmt, 'forward', currentTabIndex)
      }
      break

    default:
      break
  }
}

const initPhotographerPage = async () => {
  contactFormHandler()
  sortMenuHandler()
  lightboxHandler()
  currentPhotographer = await getCurrentPhotographer()
  currentMediaArray = (await getCurrentMedia()) || []
  sortMediaArray(sortButtonElmt.getAttribute('data-value') || '')
  displayphotographerInfos()
  displayMediaCards()
  displayStickyBarInfos()
  document.addEventListener('keydown', (e) => handleKeyboard(e))
}

initPhotographerPage()
