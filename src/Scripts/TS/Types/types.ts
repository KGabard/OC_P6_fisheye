export type photographerDataType = {
  name: string
  id: number
  city: string
  country: string
  tagline: string
  price: number
  portrait: string
}

export type mediaDataType = {
  id: number
  photographerId: number
  title: string
  image?: string
  video?: string
  likes: number
  date: string
  price: number
}

export type fullDataType = {
  photographers: photographerDataType[]
  media: mediaDataType[]
}
