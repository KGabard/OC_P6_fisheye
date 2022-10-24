const contactButton = document.querySelector('.contactButton');
const closeModalButton = document.querySelector('.contactModal__closeButton');
const contactModalOverlay = document.querySelector('.contactModal__overlay');
const toggleContactModal = () => {
    contactModalOverlay.classList.contains('contactModal__overlay--active')
        ? contactModalOverlay.classList.remove('contactModal__overlay--active')
        : contactModalOverlay.classList.add('contactModal__overlay--active');
};
export const contactFormHandler = () => {
    contactButton.addEventListener('click', toggleContactModal);
    closeModalButton.addEventListener('click', toggleContactModal);
};
