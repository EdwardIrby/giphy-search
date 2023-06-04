
import { Data, GifsResult } from '../types.js'
/**
 * @description formats the data fetched from Giphy for rendering
 */
export const formatData = (data: GifsResult['data']): Data=> {
  const toRet = new Map()
  for(const gif of data ) {
    const {
      title,
      id,
      images: { preview_webp, preview },
    } = gif
    const aspectRatio =  preview.width / preview.height
    toRet.set(
      id,
      {
        title,
        src: preview_webp?.url ?? preview.url,
        aspectRatio,
      })
  }
  return toRet
}
