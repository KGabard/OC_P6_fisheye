import { fullDataType } from '../Types/types.js'

class Api {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async get(): Promise<fullDataType | undefined> {
    try {
      const res = await fetch(this.url)
      const data = await res.json()

      if (!res.ok) {
        Promise.reject('Error in 4xx or 5xx range')
        return
      }

      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export class PhotographerApi extends Api {
  constructor(url: string) {
    super(url)
  }

  async getPhotographers() {
    const fullData = await this.get()
    if (!fullData) return
    return fullData.photographers
  }

  async getCurrentPhotographer(currentId: string) {
    const photographers = await this.getPhotographers()
    if (!photographers) return
    return photographers.find(photographer => photographer.id.toString() === currentId)
  }
}

export class MediaApi extends Api {
  constructor(url: string) {
    super(url)
  }

  async getAllMedia() {
    const fullData = await this.get()
    if (!fullData) return
    return fullData.media
  }

  async getCurrentMedia(currentId: string) {
    const mediaArray = await this.getAllMedia()
    if (!mediaArray) return
    return mediaArray.filter(media => media.photographerId.toString() === currentId)
  }
}
