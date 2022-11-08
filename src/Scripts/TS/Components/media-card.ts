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
  const targetMediaElmt = targetLikeIconElmt
    .closest('.media-card')
    ?.querySelector('.media-card__picture') as HTMLImageElement
  const targetId = parseInt(targetMediaElmt.getAttribute('data-value') || '')

  currentMediaArray.map((media) => {
    if (media.id === targetId) {
      media.isLiked ? media.removeLike() : media.addLike()
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
  ) as NodeListOf<HTMLElement>

  mediaCardLikeIconElmt.forEach((icon) => {
    icon.addEventListener('click', (e) => addLike(e))
    icon.addEventListener('keydown', (e) => {
      e.key === 'Enter' && addLike(e)
    })
  })
}
