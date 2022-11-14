import type { Media } from '../Models/media.js'
import { currentMediaArray, displayMediaCards } from '../Pages/photographer.js'
import { closeElmt, elmtIsActive, openElmt } from '../Utils/html-functions.js'

// DOM Elements
export const selectorContainerElmt = document.querySelector(
  '.media-sorter__selector-container'
)! as HTMLDivElement
export const sortButtonElmt = document.querySelector(
  '.media-sorter__sort-button'
)! as HTMLButtonElement
const dropdownMenuElmt = document.querySelector(
  '.media-sorter__dropdown-menu'
)! as HTMLDivElement
const chevronElmt = document.querySelector(
  '.media-sorter__chevron'
)! as HTMLElement
export const listItemElmts = document.querySelectorAll(
  '.media-sorter__dropdown-menu__list-item'
)! as NodeListOf<HTMLLIElement>

// Functions
const toggleMenu = () => {
  if (elmtIsActive(dropdownMenuElmt)) {
    closeElmt(selectorContainerElmt)
    selectorContainerElmt.setAttribute('aria-hidden', 'false')
    selectorContainerElmt.setAttribute('aria-expanded', 'false')
    closeElmt(dropdownMenuElmt)
    closeElmt(chevronElmt)
    openElmt(sortButtonElmt)
    selectorContainerElmt.focus()
  } else {
    openElmt(selectorContainerElmt)
    selectorContainerElmt.setAttribute('aria-expanded', 'true')
    openElmt(dropdownMenuElmt)
    openElmt(chevronElmt)
    closeElmt(sortButtonElmt)
  }
}

const setLabelsInput: (
  label1: string,
  label2: string,
  label3: string
) => void = (label1, label2, label3) => {
  sortButtonElmt.innerText = label1
  sortButtonElmt.setAttribute('data-value', label1.toLowerCase())
  listItemElmts[0].innerText = label1
  listItemElmts[0].setAttribute('data-value', label1.toLowerCase())
  listItemElmts[1].innerText = label2
  listItemElmts[1].setAttribute('data-value', label2.toLowerCase())
  listItemElmts[2].innerText = label3
  listItemElmts[2].setAttribute('data-value', label3.toLowerCase())
}

export const updateLabelsInput: (currentInput: string) => void = (
  currentInput
) => {
  switch (currentInput) {
    case 'popularité':
      setLabelsInput('Popularité', 'Date', 'Titre')
      break

    case 'date':
      setLabelsInput('Date', 'Popularité', 'Titre')
      break

    case 'titre':
      setLabelsInput('Titre', 'Popularité', 'Date')
      break

    default:
      break
  }
}

const clickOnSelectorItem = (e: Event) => {
  e.preventDefault()

  const currentLiEmlt = e.target as HTMLLIElement
  const currentInput = currentLiEmlt.getAttribute('data-value') ?? ''

  sortMediaArray(currentInput)
  updateLabelsInput(currentInput)
  displayMediaCards()
}

const likesComparator: (a: Media, b: Media) => number = (a, b) =>
  b.likes - a.likes

const datesComparator: (a: Media, b: Media) => number = (a, b) => {
  const aDate = a.date.split('-')
  const bDate = b.date.split('-')
  const aYear = parseInt(aDate[0])
  const bYear = parseInt(bDate[0])
  const aMonth = parseInt(aDate[1])
  const bMonth = parseInt(bDate[1])
  const aDay = parseInt(aDate[2])
  const bDay = parseInt(bDate[2])
  if (aYear !== bYear) {
    return bYear - aYear
  }

  if (aMonth !== bMonth) {
    return bMonth - aMonth
  }

  if (aDay !== bDay) {
    return bDay - aDay
  }

  return 0
}

const titlesComparator: (a: Media, b: Media) => number = (a, b) =>
  a.title.localeCompare(b.title)

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

// Add Eventlisteners
export const sortMenuHandler = () => {
  selectorContainerElmt.addEventListener('click', toggleMenu)
  selectorContainerElmt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      toggleMenu()
    }
  })
  listItemElmts.forEach((item) => {
    item.addEventListener('click', (e) => {
      clickOnSelectorItem(e)
    })
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') clickOnSelectorItem(e)
    })
  })
}
