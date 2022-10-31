// Function that removes 'main-class--active' class
export const closeElmt = (Elmt: HTMLElement) => {
  Elmt.classList.remove(`${Elmt.classList[0]}--active`)
}

// Function that adds 'main-class--active' class
export const openElmt = (Elmt: HTMLElement) => {
  Elmt.classList.add(`${Elmt.classList[0]}--active`)
}

// Function that adds or remove 'main-class--wrong' class
export const setElmtToWrong = (input: HTMLElement, option: boolean) => {
  option
    ? input.classList.add(`${input.classList[0]}--wrong`)
    : input.classList.remove(`${input.classList[0]}--wrong`)
}
