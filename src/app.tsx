import {
  isle,
  PlaitProps,
  PlaitedElement,
  css,
  useStore,
} from 'plaited'
import { useFetch } from './use-fetch.js'
import { useSearchParams } from './use-search-params.js'
import { GifsResult } from '@giphy/js-fetch-api'
import { Data } from './types.js'
import { Grid } from './grid.js'
/**
 * I'm  exposing my API key. Normally I wouldn't do this but I'm trying to timebox to 2-4 hours
 */
const API_KEY = '0LRue8eVT7QMC87k7mT8FkCDNAtJN1kC'

const getFetchURL = (q: string, limit: string) => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=${limit}&offset=0&rating=g&lang=en`
const formatData = (data: GifsResult['data']): Data=> {
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
export const App = isle(
  { tag: 'giphy-app' },
  base => class extends base {
    async plait({ $, feedback }: PlaitProps) {
      const [ getSearchParams, setSearchParams ] = useSearchParams()
      const searchParams = getSearchParams()
      const limitSelector = $<HTMLSelectElement>('limit')
      const searchField = $<HTMLInputElement>('search')
      const main = $<HTMLElement>('main')
      const limit = limitSelector.value
      const q = searchField.value || 'kittens'
      const { data, meta, pagination }: GifsResult = await useFetch(getFetchURL(q, limit))
      const [ getData, setData ] = useStore<Data>(formatData(data))
      getData().size && main.render(<Grid thumbs={getData()} />)
      console.log(pagination)
    }
  }
)

const [ cls, stylesheet ] = css`
  :host {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {

  }
  .main {

  }
  .inputAddOn{

  }
  .pagination {

  }
`

export const AppTemplate: PlaitedElement = () => (
  <App.template { ...stylesheet}>
    <header class={cls.header}>
      <div class={cls.inputAddOn}>
        <input
          type='search'
          data-target='search'
        />
        <select data-target='limit'>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='75'>75</option>
        </select>
      </div>
      <div class={cls.pagination}>
        <button data-target='prev'>Prev</button>
        <button data-target='next'>Next</button>
      </div>
    </header>
    <main
      data-target='main'
      class={cls.main}
    >
    </main>
  </App.template>
)
