import {
  photographerData,
  photographerFactory,
  getPhotographers,
} from '../factories/photographer.js'

const displayData: (photographers: photographerData[]) => void = async (
  photographers
) => {
  const photographersSection = document.querySelector(
    '.photographerSection'
  ) as HTMLDivElement

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

export const init = async () => {
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()
