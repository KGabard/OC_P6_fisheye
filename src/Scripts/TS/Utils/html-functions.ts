export const elmtIsActive = (elmt: HTMLElement) => {
  return elmt.classList.contains(elmt.classList[0] + '--active')
}

// Function that removes 'main-class--active' class
export const closeElmt = (elmt: HTMLElement) => {
  elmt.classList.remove(`${elmt.classList[0]}--active`)
  elmt.setAttribute('aria-hidden', 'true')
}

// Function that adds 'main-class--active' class
export const openElmt = (elmt: HTMLElement) => {
  elmt.classList.add(`${elmt.classList[0]}--active`)
  elmt.setAttribute('aria-hidden', 'false')
}

// Function that adds or remove 'main-class--wrong' class
export const setElmtToWrong = (input: HTMLElement, isWrong: boolean) => {
  if (isWrong) {
    input.classList.add(`${input.classList[0]}--wrong`)
    input.setAttribute('aria-invalid', 'true')
  } else {
    input.classList.remove(`${input.classList[0]}--wrong`)
    input.setAttribute('aria-invalid', 'false')
  }
}

export const browseTabElmts = (
  elmt: HTMLElement,
  option: 'forward' | 'backward',
  tabIndex: number
) => {
  const tabElmts = Array.from(
    elmt.querySelectorAll(
      `[tabindex = "${tabIndex.toString()}"]`
    ) as NodeListOf<HTMLElement>
  )

  if (tabElmts.length === 0) return
  const currentElmt = document.activeElement
  let currentIndex = tabElmts.findIndex((elmt) => elmt === currentElmt)
  if (currentIndex < 0) currentIndex = 0

  const nextElmt =
    currentIndex === tabElmts.length - 1
      ? tabElmts[0]
      : tabElmts[currentIndex + 1]
  const previousElmt =
    currentIndex === 0
      ? tabElmts[tabElmts.length - 1]
      : tabElmts[currentIndex - 1]

  switch (option) {
    case 'forward':
      nextElmt.focus()
      break
    case 'backward':
      previousElmt.focus()
      break

    default:
      break
  }
}