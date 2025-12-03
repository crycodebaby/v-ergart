import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity-client'

const builder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

// Preset für Blog-Bilder
export function getBlogImageUrl(source: any, width: number = 800) {
  if (!source) return null
  
  return builder
    .image(source)
    .width(width)
    .format('webp')
    .quality(85)
    .url()
}

// Preset für Thumbnails
export function getThumbnailUrl(source: any) {
  if (!source) return null
  
  return builder
    .image(source)
    .width(400)
    .height(300)
    .format('webp')
    .quality(80)
    .fit('crop')
    .url()
}
