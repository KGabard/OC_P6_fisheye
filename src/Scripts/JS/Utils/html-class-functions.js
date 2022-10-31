// Function that removes 'main-class--active' class
export const closeElmt = (Elmt) => {
    Elmt.classList.remove(`${Elmt.classList[0]}--active`);
};
// Function that adds 'main-class--active' class
export const openElmt = (Elmt) => {
    Elmt.classList.add(`${Elmt.classList[0]}--active`);
};
// Function that adds or remove 'main-class--wrong' class
export const setElmtToWrong = (input, option) => {
    option
        ? input.classList.add(`${input.classList[0]}--wrong`)
        : input.classList.remove(`${input.classList[0]}--wrong`);
};
