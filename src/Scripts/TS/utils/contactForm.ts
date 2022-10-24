const contactButton = document.querySelector(
  '.contactButton'
) as HTMLButtonElement
const closeModalButton = document.querySelector(
  '.contactModal__closeButton'
) as HTMLButtonElement
const contactModalOverlay = document.querySelector(
  '.contactModal__overlay'
) as HTMLDivElement

const toggleContactModal = () => {
  contactModalOverlay.classList.contains('contactModal__overlay--active')
    ? contactModalOverlay.classList.remove('contactModal__overlay--active')
    : contactModalOverlay.classList.add('contactModal__overlay--active')
}

export const contactFormHandler = () => {
  contactButton.addEventListener('click', toggleContactModal)
  closeModalButton.addEventListener('click', toggleContactModal)
}
