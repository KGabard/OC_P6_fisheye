import {
  photographerData,
  photographerFactory,
} from '../factories/photographer.js'

const getPhotographers: () => Promise<photographerData[]> = async () => {
  try {
    const res = await fetch('src/data/photographers.json')
    const data = await res.json()

    if (!res.ok) {
      Promise.reject('Error in 4xx or 5xx range')
      return
    }

    return data.photographers
  } catch (error) {
    console.log(error)
  }
}

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
