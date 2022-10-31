import { closeElmt, openElmt } from '../Utils/html-class-functions.js'

// DOM Elements
const selectorContainerElmt = document.querySelector(
  '.media-sorter__selector-container'
) as HTMLDivElement
export const sortButtonElmt = document.querySelector(
  '.media-sorter__sort-button'
) as HTMLButtonElement
const dropdownMenuElmt = document.querySelector(
  '.media-sorter__dropdown-menu'
) as HTMLDivElement
const chevronElmt = document.querySelector(
  '.media-sorter__chevron'
) as HTMLElement
export const listItemElmts = document.querySelectorAll(
  '.media-sorter__dropdown-menu__list-item'
) as NodeListOf<HTMLLIElement>

// Functions
const toggleMenu = () => {
  if (
    dropdownMenuElmt.classList.contains(
      dropdownMenuElmt.classList[0] + '--active'
    )
  ) {
    closeElmt(dropdownMenuElmt)
    closeElmt(chevronElmt)
    openElmt(sortButtonElmt)
  } else {
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

// Add Eventlisteners
export const sortMenuHandler = () => {
  selectorContainerElmt.addEventListener('click', toggleMenu)
}
