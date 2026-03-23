import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity-client'

const builder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

// Preset für Blog-Bilder
export function getBlogImageUrl(source: any) {
  if (!source) return null
  return builder.image(source).url()
}

// Preset für Thumbnails
export function getThumbnailUrl(source: any) {
  if (!source) return null
  return builder.image(source).url()
}
