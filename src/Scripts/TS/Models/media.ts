import type { MediaDataType } from '../Types/types.js'

export class Media {
  _media: MediaDataType
  _isLiked: boolean

  constructor(media: MediaDataType) {
    this._media = media
    this._isLiked = false
  }

  get id() {
    return this._media.id
  }

  get photographerId() {
    return this._media.photographerId
  }

  get title() {
    return this._media.title
  }

  get type() {
    if (this._media.image) {
      return 'picture'
    }

    if (this._media.video) {
      return 'video'
    }

    throw new Error('Unknonw type format')
  }

  get originalSrc() {
    switch (this.type) {
      case 'picture':
        return `./src/Assets/Media/Originals/Pictures/${
          this._media.image ?? ''
        }`
      case 'video':
        return `./src/Assets/Media/Originals/Movies/${this._media.video ?? ''}`

      default:
        return ''
    }
  }

  get thumbnailSrc() {
    switch (this.type) {
      case 'picture':
        return `./src/Assets/Media/Thumbnails/${
          this._media.image?.slice(0, -4) ?? ''
        }.jpg`
      case 'video':
        return `./src/Assets/Media/Thumbnails/${
          this._media.video?.slice(0, -4) ?? ''
        }.jpg`

      default:
        return ''
    }
  }

  get likes() {
    return this._media.likes
  }

  get date() {
    return this._media.date
  }

  get price() {
    return `${this._media.price}€`
  }

  get isLiked() {
    return this._isLiked
  }

  addLike() {
    this._media.likes = this._media.likes + 1
  }

  removeLike() {
    if (this._media.likes > 0) {
      this._media.likes = this._media.likes + 1
    }
  }

  toggleIsLiked() {
    this._isLiked = !this.isLiked
  }
}
