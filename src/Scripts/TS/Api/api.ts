import type { FullDataType } from '../Types/types.js'

class Api {
  _url: string

  constructor(url: string) {
    this._url = url
  }

  async getData(): Promise<FullDataType | undefined> {
    try {
      const res = await fetch(this._url)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json()

      if (!res.ok) {
        Promise.reject(new Error('Error in 4xx or 5xx range'))
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data
    } catch (error: unknown) {
      console.log(error)
    }
  }
}

export class PhotographerApi extends Api {
  async getPhotographers() {
    const fullData = await this.getData()
    if (!fullData) {
      return
    }

    return fullData.photographers
  }

  async getCurrentPhotographer(currentId: string) {
    const photographers = await this.getPhotographers()
    if (!photographers) {
      return
    }

    return photographers.find(
      (photographer) => photographer.id.toString() === currentId
    )
  }
}

export class MediaApi extends Api {
  async getAllMedia() {
    const fullData = await this.getData()
    return fullData ? fullData.media : undefined
  }

  async getCurrentMedia(currentId: string) {
    const mediaArray = await this.getAllMedia()
    return mediaArray
      ? mediaArray.filter(
          (media) => media.photographerId.toString() === currentId
        )
      : undefined
  }
}
