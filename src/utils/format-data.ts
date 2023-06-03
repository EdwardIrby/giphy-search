
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
      images: { preview_webp, '480w_still': large },
    } = gif
    toRet.set(
      id,
      {
        title,
        src: preview_webp.url,
        size: preview_webp.size,
        large: large.url, 
      })
  }
  return toRet
}
