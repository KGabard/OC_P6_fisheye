const contactButton = document.querySelector('.contact-button');
const closeModalButton = document.querySelector('.contact-modal__closeButton');
const contactModalOverlay = document.querySelector('.contact-modal__overlay');
const contactModalWrapper = document.querySelector('.contact-modal__wrapper');
const toggleContactModal = () => {
    contactModalWrapper.classList.contains('contact-modal__wrapper--active')
        ? contactModalWrapper.classList.remove('contact-modal__wrapper--active')
        : contactModalWrapper.classList.add('contact-modal__wrapper--active');
};
export const contactFormHandler = () => {
    contactButton.addEventListener('click', toggleContactModal);
    closeModalButton.addEventListener('click', toggleContactModal);
    contactModalOverlay.addEventListener('click', toggleContactModal);
};
