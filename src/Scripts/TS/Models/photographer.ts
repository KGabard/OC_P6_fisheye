import { photographerDataType } from '../Types/types.js'

export class Photographer {
  _photographer: photographerDataType

  constructor(photographer: photographerDataType) {
    this._photographer = photographer
  }

  get name() {
    return this._photographer.name
  }

  get id() {
    return this._photographer.id
  }

  get location() {
    return `${this._photographer.city}, ${this._photographer.country}`
  }

  get tagline() {
    return this._photographer.tagline
  }

  get price() {
    return `${this._photographer.price}€/jour`
  }

  get picture() {
    return `./src/Assets/Photographers/${this._photographer.portrait}`
  }
}
