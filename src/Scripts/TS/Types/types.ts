export type PhotographerDataType = {
  name: string
  id: number
  city: string
  country: string
  tagline: string
  price: number
  portrait: string
}

export type MediaDataType = {
  id: number
  photographerId: number
  title: string
  image?: string
  video?: string
  likes: number
  date: string
  price: number
}

export type FullDataType = {
  photographers: PhotographerDataType[]
  media: MediaDataType[]
}
