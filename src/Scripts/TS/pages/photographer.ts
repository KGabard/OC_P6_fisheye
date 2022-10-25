//Mettre le code JavaScript lié à la page photographer.html
import { contactFormHandler } from '../utils/contactForm.js'
import { getPhotographers } from '../pages/index.js'
import { photographerData } from '../factories/photographer.js'

const photographerNameElmt = document.querySelector('.photographerInfos__name') as HTMLHeadingElement
const photographerLocationElmt = document.querySelector(
  '.photographerInfos__location'
) as HTMLParagraphElement
const photographerTaglineElmt = document.querySelector(
  '.photographerInfos__tagline'
) as HTMLParagraphElement
const photographerPictureElmt = document.querySelector(
  '.photographerHeader__picture'
) as HTMLImageElement

contactFormHandler()

const getCurrentPhotographer: () => Promise<photographerData[]> = async () => {
  const currentId = new URLSearchParams(window.location.search).get('id')
  console.log(currentId)
  const photographers = await getPhotographers()

  return photographers.filter(
    (photographer) => photographer.id.toString() === currentId
  )
}

const displayPhotographerData: (photographer: photographerData[]) => void = (
  photographer
) => {
  const { name, country, city, tagline, portrait } = photographer[0]

  photographerNameElmt.innerText = name
  photographerLocationElmt.innerText = country + ', ' + city
  photographerTaglineElmt.innerText = tagline
  photographerPictureElmt.src = `src/Assets/photographers/ID_Photos/${portrait}`
  photographerPictureElmt.alt = `Photographer ${name}`
}

const initPhotographerPage = async () => {
  const currentPhotographer = await getCurrentPhotographer()
  displayPhotographerData(currentPhotographer)
}

initPhotographerPage()
