export const elmtIsActive = (elmt) => elmt.classList.contains(elmt.classList[0] + '--active');
// Function that removes 'main-class--active' class
export const closeElmt = (elmt) => {
    elmt.classList.remove(`${elmt.classList[0]}--active`);
    elmt.setAttribute('aria-hidden', 'true');
};
// Function that adds 'main-class--active' class
export const openElmt = (elmt) => {
    elmt.classList.add(`${elmt.classList[0]}--active`);
    elmt.setAttribute('aria-hidden', 'false');
};
// Function that adds or remove 'main-class--wrong' class
export const setElmtToWrong = (input, isWrong) => {
    if (isWrong) {
        input.classList.add(`${input.classList[0]}--wrong`);
        input.setAttribute('aria-invalid', 'true');
    }
    else {
        input.classList.remove(`${input.classList[0]}--wrong`);
        input.setAttribute('aria-invalid', 'false');
    }
};
export const browseTabElmts = (elmt, option, tabIndex) => {
    const tabElmts = elmt.querySelectorAll(`[tabindex = "${tabIndex.toString()}"]`);
    const arrayTabElmts = Array.from(tabElmts);
    if (arrayTabElmts.length === 0) {
        return;
    }
    const currentElmt = document.activeElement;
    let currentIndex = arrayTabElmts.findIndex((elmt) => elmt === currentElmt);
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    const nextElmt = currentIndex === arrayTabElmts.length - 1
        ? arrayTabElmts[0]
        : arrayTabElmts[currentIndex + 1];
    const previousElmt = currentIndex === 0
        ? arrayTabElmts[arrayTabElmts.length - 1]
        : arrayTabElmts[currentIndex - 1];
    switch (option) {
        case 'forward':
            nextElmt.focus();
            break;
        case 'backward':
            previousElmt.focus();
            break;
        default:
            break;
    }
};
