//-------------
// DOM Elements
//-------------
const contactButtonElmt = document.querySelector('.contact-button');
const contactModalContainerElmt = document.querySelector('.contact-modal__container');
const contactModalElmt = document.querySelector('.contact-modal');
const contactModalOverlayElmt = document.querySelector('.contact-modal__overlay');
const contactModalCloseIconElmt = document.querySelector('.contact-modal__close-icon');
const contactModalSubmitButtonElmt = document.querySelector('.submit-button');
const contactModalFormElmt = document.querySelector('.form');
const confirmationModalElmt = document.querySelector('.form-confirmation');
const confirmationModalCloseButtonElmt = document.querySelector('.form-confirmation__close-button');
//----------
// Functions
//----------
// Function that removes 'main-class--active' class
const closeElmt = (Elmt) => {
    Elmt.classList.remove(`${Elmt.classList[0]}--active`);
};
// Function that adds 'main-class--active' class
const openElmt = (Elmt) => {
    Elmt.classList.add(`${Elmt.classList[0]}--active`);
};
// Function that adds or remove 'main-class--wrong' class
const setElmtToWrong = (input, option) => {
    option
        ? input.classList.add(`${input.classList[0]}--wrong`)
        : input.classList.remove(`${input.classList[0]}--wrong`);
};
// Function that tests the value of a form data according to its key. It returns : the validity of the value and the error message if any.
const isInputValid = (key, value) => {
    let validity;
    let errorMessage;
    switch (key) {
        case 'first':
            validity = /[a-z]{2,15}/gi.test(value.toString());
            errorMessage =
                'Veuillez entrer un prénom contenant entre 2 et 15 caratères.';
            break;
        case 'last':
            validity = /[a-z]{2,15}/gi.test(value.toString());
            errorMessage = 'Veuillez entrer un nom contenant entre 2 et 15 caratères.';
            break;
        case 'email':
            validity = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.toString());
            errorMessage = 'Veuillez entrer une adresse mail valide.';
            break;
        case 'message':
            validity = value.toString().length >= 10 && value.toString().length <= 300;
            errorMessage =
                'Veuillez entrer un message contenant entre 10 et 300 caratères.';
            break;
        default:
            validity = false;
            errorMessage = '';
            break;
    }
    return { validity: validity, errorMessage: errorMessage };
};
// Function that logs the form data
const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
};
// Function that gets all the data from the form, checks their validity and submits the form if everything is valid
const handleSubmitForm = (event) => {
    var _a;
    let formData = new FormData(contactModalFormElmt);
    let formValidity = true;
    event.preventDefault();
    for (const [key, value] of formData.entries()) {
        let currentInputElem;
        if (key === 'message') {
            currentInputElem = document.querySelector(`textarea[name=${key}]`);
        }
        else {
            currentInputElem = document.querySelector(`input[name=${key}]`);
        }
        const currentErrorElem = (_a = currentInputElem.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('span[class*="form__error-message"]');
        setElmtToWrong(currentInputElem, false);
        closeElmt(currentErrorElem);
        currentErrorElem.innerText = '';
        if (!isInputValid(key, value).validity) {
            formValidity = false;
            setElmtToWrong(currentInputElem, true);
            openElmt(currentErrorElem);
            currentErrorElem.innerText = isInputValid(key, value).errorMessage;
        }
    }
    if (formValidity) {
        closeElmt(contactModalElmt);
        openElmt(confirmationModalElmt);
        contactModalFormElmt.reset();
        logFormData(formData);
    }
};
//----------------
// Event Listeners
//----------------
export const contactFormHandler = () => {
    contactButtonElmt.addEventListener('click', () => {
        openElmt(contactModalContainerElmt);
        openElmt(contactModalElmt);
        closeElmt(confirmationModalElmt);
    });
    contactModalCloseIconElmt.addEventListener('click', () => closeElmt(contactModalContainerElmt));
    contactModalOverlayElmt.addEventListener('click', () => closeElmt(contactModalContainerElmt));
    contactModalFormElmt.addEventListener('submit', handleSubmitForm);
    confirmationModalCloseButtonElmt.addEventListener('click', () => closeElmt(contactModalContainerElmt));
};
