import {
  closeElmt,
  openElmt,
  setElmtToWrong,
} from '../Utils/html-class-functions.js'

//-------------
// DOM Elements
//-------------

const contactButtonElmt = document.querySelector(
  '.contact-button'
) as HTMLButtonElement

const contactModalContainerElmt = document.querySelector(
  '.contact-modal__container'
) as HTMLDivElement
const contactModalElmt = document.querySelector(
  '.contact-modal'
) as HTMLDivElement
const contactModalOverlayElmt = document.querySelector(
  '.contact-modal__overlay'
) as HTMLDivElement
const contactModalCloseIconElmt = document.querySelector(
  '.contact-modal__close-icon'
) as HTMLImageElement
const contactModalSubmitButtonElmt = document.querySelector(
  '.submit-button'
) as HTMLButtonElement
const contactModalFormElmt = document.querySelector('.form') as HTMLFormElement

const confirmationModalElmt = document.querySelector(
  '.form-confirmation'
) as HTMLDivElement
const confirmationModalCloseButtonElmt = document.querySelector(
  '.form-confirmation__close-button'
) as HTMLButtonElement

//----------
// Functions
//----------

// Function that tests the value of a form data according to its key. It returns : the validity of the value and the error message if any.
const isInputValid: (
  key: string,
  value: FormDataEntryValue
) => { validity: boolean; errorMessage: string } = (key, value) => {
  let validity: boolean
  let errorMessage: string
  switch (key) {
    case 'first':
      validity = /[a-z]{2,15}/gi.test(value.toString())
      errorMessage =
        'Veuillez entrer un prénom contenant entre 2 et 15 caratères.'
      break
    case 'last':
      validity = /[a-z]{2,15}/gi.test(value.toString())
      errorMessage = 'Veuillez entrer un nom contenant entre 2 et 15 caratères.'
      break
    case 'email':
      validity = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.toString())
      errorMessage = 'Veuillez entrer une adresse mail valide.'
      break
    case 'message':
      validity = value.toString().length >= 10 && value.toString().length <= 300
      errorMessage =
        'Veuillez entrer un message contenant entre 10 et 300 caratères.'
      break

    default:
      validity = false
      errorMessage = ''
      break
  }

  return { validity: validity, errorMessage: errorMessage }
}

// Function that logs the form data
const logFormData: (formData: FormData) => void = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`)
  }
}

// Function that gets all the data from the form, checks their validity and submits the form if everything is valid
const handleSubmitForm = (event: SubmitEvent) => {
  let formData = new FormData(contactModalFormElmt)
  let formValidity = true

  event.preventDefault()

  for (const [key, value] of formData.entries()) {
    let currentInputElem: HTMLInputElement | HTMLTextAreaElement

    if (key === 'message') {
      currentInputElem = document.querySelector(
        `textarea[name=${key}]`
      ) as HTMLTextAreaElement
    } else {
      currentInputElem = document.querySelector(
        `input[name=${key}]`
      ) as HTMLInputElement
    }

    const currentErrorElem = currentInputElem.parentElement?.querySelector(
      'span[class*="form__error-message"]'
    ) as HTMLSpanElement

    setElmtToWrong(currentInputElem, false)
    closeElmt(currentErrorElem)
    currentErrorElem.innerText = ''

    if (!isInputValid(key, value).validity) {
      formValidity = false
      setElmtToWrong(currentInputElem, true)
      openElmt(currentErrorElem)
      currentErrorElem.innerText = isInputValid(key, value).errorMessage
    }
  }

  if (formValidity) {
    closeElmt(contactModalElmt)
    openElmt(confirmationModalElmt)
    contactModalFormElmt.reset()
    logFormData(formData)
  }
}

//----------------
// Event Listeners
//----------------

export const contactFormHandler = () => {
  contactButtonElmt.addEventListener('click', () => {
    openElmt(contactModalContainerElmt)
    openElmt(contactModalElmt)
    closeElmt(confirmationModalElmt)
  })
  contactModalCloseIconElmt.addEventListener('click', () =>
    closeElmt(contactModalContainerElmt)
  )
  contactModalOverlayElmt.addEventListener('click', () =>
    closeElmt(contactModalContainerElmt)
  )
  contactModalFormElmt.addEventListener('submit', handleSubmitForm)
  confirmationModalCloseButtonElmt.addEventListener('click', () =>
    closeElmt(contactModalContainerElmt)
  )
}
