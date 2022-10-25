const contactButton = document.querySelector(
  '.contactButton'
) as HTMLButtonElement
const closeModalButton = document.querySelector(
  '.contactModal__closeButton'
) as HTMLButtonElement
const contactModalOverlay = document.querySelector(
  '.contactModal__overlay'
) as HTMLDivElement
const contactModalWrapper = document.querySelector(
  '.contactModal__wrapper'
) as HTMLDivElement

const toggleContactModal = () => {
  contactModalWrapper.classList.contains('contactModal__wrapper--active')
    ? contactModalWrapper.classList.remove('contactModal__wrapper--active')
    : contactModalWrapper.classList.add('contactModal__wrapper--active')
}

export const contactFormHandler = () => {
  contactButton.addEventListener('click', toggleContactModal)
  closeModalButton.addEventListener('click', toggleContactModal)
  contactModalOverlay.addEventListener('click', toggleContactModal)
}
