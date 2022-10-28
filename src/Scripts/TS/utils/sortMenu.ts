// DOM Classes
const selectorContainerClass = 'mediaSorter__selectorContainer'
const sortButtonClass = 'mediaSorter__sortButton'
const dropdownMenuClass = 'mediaSorter__dropdownMenu'
const chevronClass = 'mediaSorter__chevron'
const listItemClass = 'mediaSorter__dropdownMenu__listItem'

// DOM Elements
const selectorContainerElmt = document.querySelector(
  '.' + selectorContainerClass
) as HTMLDivElement
const sortButtonElmt = document.querySelector(
  '.' + sortButtonClass
) as HTMLButtonElement
const dropdownMenuElmt = document.querySelector(
  '.' + dropdownMenuClass
) as HTMLDivElement
const chevronElmt = document.querySelector('.' + chevronClass) as HTMLElement
const listItemElmts = document.querySelectorAll(
  '.' + listItemClass
) as NodeListOf<HTMLLIElement>

// Functions
const toggleMenu = () => {
  if (dropdownMenuElmt.classList.contains(dropdownMenuClass + '--active')) {
    dropdownMenuElmt.classList.remove(dropdownMenuClass + '--active')
    chevronElmt.classList.remove(chevronClass + '--active')
    sortButtonElmt.classList.add(sortButtonClass + '--active')
  } else {
    dropdownMenuElmt.classList.add(dropdownMenuClass + '--active')
    chevronElmt.classList.add(chevronClass + '--active')
    sortButtonElmt.classList.remove(sortButtonClass + '--active')
  }
}

const setLabelsInput: (
  label1: string,
  label2: string,
  label3: string
) => void = (label1, label2, label3) => {
  sortButtonElmt.innerText = label1
  listItemElmts[0].innerText = label1
  listItemElmts[0].setAttribute('data-value', label1.toLowerCase())
  listItemElmts[1].innerText = label2
  listItemElmts[1].setAttribute('data-value', label2.toLowerCase())
  listItemElmts[2].innerText = label3
  listItemElmts[2].setAttribute('data-value', label3.toLowerCase())
}

const updateLabelsInput: (currentInput: string) => void = (currentInput) => {
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

const getInput: (e: MouseEvent) => string | null = (e) => {
  const currentLiEmlt = e.target as HTMLLIElement
  const currentInput = currentLiEmlt.getAttribute('data-value')
  currentInput && updateLabelsInput(currentInput)
  return currentInput
}

// Add Eventlisteners
export const sortMenuHandler = () => {
  selectorContainerElmt.addEventListener('click', toggleMenu)
  dropdownMenuElmt.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(getInput(e))
  })
}
