import { ariaHideMainContent, homepageLinkElmt } from '../Pages/photographer.js';
import { browseTabElmts, closeElmt, elmtIsActive, openElmt, setElmtToWrong, } from '../Utils/html-functions.js';
//-------------
// DOM Elements
//-------------
const contactButtonElmt = document.querySelector('.contact-button');
export const contactModalContainerElmt = document.querySelector('.contact-modal__container');
const contactModalElmt = document.querySelector('.contact-modal');
const contactModalOverlayElmt = document.querySelector('.contact-modal__overlay');
const contactModalCloseIconElmt = document.querySelector('.contact-modal__close-icon');
const contactModalSubmitButtonElmt = document.querySelector('.submit-button');
const contactModalFormElmt = document.querySelector('.form');
const confirmationModalElmt = document.querySelector('.form-confirmation');
const confirmationModalText = document.querySelector('.form-confirmation__text');
const confirmationModalCloseButtonElmt = document.querySelector('.form-confirmation__close-button');
//----------
// Functions
//----------
// Function that tests the value of a form data according to its key. It returns : the validity of the value and the error message if any.
const isInputValid = (key, value) => {
    let validity = false;
    let errorMessage = '';
    if (typeof value === 'string') {
        switch (key) {
            case 'first':
                validity = /[a-z]{2,15}/gi.test(value.toString());
                errorMessage =
                    'Veuillez entrer un prénom contenant entre 2 et 15 caratères.';
                break;
            case 'last':
                validity = /[a-z]{2,15}/gi.test(value.toString());
                errorMessage =
                    'Veuillez entrer un nom contenant entre 2 et 15 caratères.';
                break;
            case 'email':
                validity = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.toString());
                errorMessage = 'Veuillez entrer une adresse mail valide.';
                break;
            case 'message':
                validity =
                    value.toString().length >= 10 && value.toString().length <= 300;
                errorMessage =
                    'Veuillez entrer un message contenant entre 10 et 300 caractères.';
                break;
            default:
                validity = false;
                errorMessage = '';
                break;
        }
    }
    return { validity, errorMessage };
};
// Function that logs the form data
const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
        if (value instanceof String)
            console.log(`${key}: ${value.toString()}`);
    }
};
// Function that gets all the data from the form, checks their validity and submits the form if everything is valid
const handleSubmitForm = (event) => {
    const formData = new FormData(contactModalFormElmt);
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
        const currentParentElem = currentInputElem.parentElement;
        const currentErrorElem = currentParentElem.querySelector('span[class*="form__error-message"]');
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
        confirmationModalText.focus();
        contactModalFormElmt.reset();
        logFormData(formData);
    }
};
// Function that handles keyboard events
const handleKeyboard = (e) => {
    const contactModalTabIndex = 200;
    if (!elmtIsActive(contactModalContainerElmt)) {
        return;
    }
    let currentActiveModal;
    switch (e.key) {
        case 'Escape':
            if (elmtIsActive(contactModalContainerElmt))
                closeContactModal();
            break;
        case 'Enter':
            if (document.activeElement === contactModalCloseIconElmt)
                closeContactModal();
            break;
        case 'Tab':
            e.preventDefault();
            if (elmtIsActive(contactModalElmt)) {
                currentActiveModal = contactModalElmt;
            }
            if (elmtIsActive(confirmationModalElmt)) {
                currentActiveModal = confirmationModalElmt;
            }
            if (currentActiveModal) {
                if (e.shiftKey) {
                    browseTabElmts(currentActiveModal, 'backward', contactModalTabIndex);
                }
                else {
                    browseTabElmts(currentActiveModal, 'forward', contactModalTabIndex);
                }
            }
            break;
        default:
            break;
    }
};
// Function that open the contact modal
const openContactModal = () => {
    var _a;
    openElmt(contactModalContainerElmt);
    openElmt(contactModalElmt);
    closeElmt(confirmationModalElmt);
    ariaHideMainContent(true);
    (_a = contactModalElmt.querySelector('input')) === null || _a === void 0 ? void 0 : _a.focus();
};
// Function that close the contact modal
const closeContactModal = () => {
    closeElmt(contactModalContainerElmt);
    closeElmt(contactModalElmt);
    closeElmt(confirmationModalElmt);
    ariaHideMainContent(false);
    homepageLinkElmt.focus();
};
//----------------
// Event Listeners
//----------------
export const contactFormHandler = () => {
    contactButtonElmt.addEventListener('click', () => {
        openContactModal();
    });
    contactModalCloseIconElmt.addEventListener('click', () => {
        closeContactModal();
    });
    contactModalOverlayElmt.addEventListener('click', () => {
        closeContactModal();
    });
    contactModalFormElmt.addEventListener('submit', handleSubmitForm);
    confirmationModalCloseButtonElmt.addEventListener('click', () => {
        closeContactModal();
    });
    document.addEventListener('keydown', (e) => {
        handleKeyboard(e);
    });
};
