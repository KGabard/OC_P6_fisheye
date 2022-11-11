//-------------
// DOM Elements
//-------------

import {
  currentMediaArray,
  displayMediaCards,
  displayStickyBarInfos,
} from '../Pages/photographer.js'

//----------
// Functions
//----------

const addLike: (e: Event) => void = (e) => {
  e.preventDefault()

  const targetLikeIconElmt = e.target as HTMLElement
  const targetMediaCardElmt = targetLikeIconElmt.closest(
    '.media-card'
  )! as HTMLDivElement
  const targetMediaElmt = targetMediaCardElmt.querySelector(
    '.media-card__picture'
  )! as HTMLImageElement
  const targetId = parseInt(targetMediaElmt.getAttribute('data-value') ?? '')

  currentMediaArray.forEach((media) => {
    if (media.id === targetId) {
      if (media.isLiked) {
        media.removeLike()
      } else {
        media.addLike()
      }

      media.toggleIsLiked()
    }
  })

  displayMediaCards()
  displayStickyBarInfos()
}

//----------------
// Event Listeners
//----------------

export const addLikeIconEventListener = () => {
  const mediaCardLikeIconElmt = document.querySelectorAll(
    '.media-card__like-icon'
  )

  mediaCardLikeIconElmt.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      addLike(e)
    })
    icon.addEventListener('keydown', (e) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') addLike(e)
    })
  })
}
