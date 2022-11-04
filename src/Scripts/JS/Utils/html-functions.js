export const elmtIsActive = (elmt) => {
    return elmt.classList.contains(elmt.classList[0] + '--active');
};
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
export const browseTabElmt = (elmt, option, tabIndex) => {
    const tabElmts = elmt.querySelectorAll(`[tabindex = "${tabIndex.toString()}"`);
    const currentElmt = document.activeElement;
    let currentIndex = 0;
    let elmtIsFound = false;
    tabElmts.forEach((elmt) => {
        if (!elmtIsFound) {
            if (elmt === currentElmt) {
                elmtIsFound = true;
            }
            else {
                currentIndex += 1;
            }
        }
    });
    const nextElmt = currentIndex === tabElmts.length - 1
        ? tabElmts[0]
        : tabElmts[currentIndex + 1];
    const previousElmt = currentIndex === 0
        ? tabElmts[tabElmts.length - 1]
        : tabElmts[currentIndex - 1];
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
