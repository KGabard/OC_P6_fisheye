import { fullDataType } from '../Types/types.js'

class Api {
  _url: string

  constructor(url: string) {
    this._url = url
  }

  async getData(): Promise<fullDataType | undefined> {
    try {
      const res = await fetch(this._url)
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
  constructor(_url: string) {
    super(_url)
  }

  async getPhotographers() {
    const fullData = await this.getData()
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
    const fullData = await this.getData()
    return fullData ? fullData.media : undefined
  }

  async getCurrentMedia(currentId: string) {
    const mediaArray = await this.getAllMedia()
    return mediaArray ? mediaArray.filter(media => media.photographerId.toString() === currentId) : undefined
  }
}
