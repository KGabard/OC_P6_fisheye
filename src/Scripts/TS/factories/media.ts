export type mediaData = {
  id: number
  photographerId: number
  title: string
  image: string
  likes: number
  date: string
  price: number
}

export const getCurrentMedia: (
  photographerId: number
) => Promise<mediaData[] | undefined> = async (photographerId) => {
  try {
    const res = await fetch('src/data/photographers.json')
    const data = await res.json()

    if (!res.ok) {
      Promise.reject('Error in 4xx or 5xx range')
      return
    }

    const mediaData: mediaData[] = data.media
    const currentMediaData = mediaData.filter(
      (media) => media.photographerId === photographerId
    )

    return currentMediaData
  } catch (error) {
    console.log(error)
  }
}

export const getMediaCardElmt: (media: mediaData) => HTMLDivElement = (media) => {
  const { image, title, likes } = media

  const card = document.createElement('div') as HTMLDivElement
  card.classList.add('mediaCard')

  card.innerHTML =
    `<a href="#" class="mediaCard__link">` +
    `<img src="./src/Assets/Medias/Pictures/${image}" alt="${title}" class="mediaCard__picture">` +
    `</a>` +
    `<div class="mediaCard__infos">` +
    `<h2 class="mediaCard__title">${title}</h2>` +
    `<div class="mediaCard__likeWrapper">` +
    `<p class="mediaCard__likeCount">${likes.toString()}</p>` +
    `<i class="mediaCard__likeIcon fa-solid fa-heart"></i>` +
    `</div>` +
    `</div>`

  return card
}
