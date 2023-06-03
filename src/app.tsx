import {
  isle,
  PlaitProps,
  PlaitedElement,
  css,
  useStore,
} from 'plaited'
import { useFetch, useSearchParams, getFetchURL, formatData } from './utils/index.js'
import { Data, GifsResult } from './types.js'
import {
  GiphyIcon,
  Button,
  ButtonRow,
  ScreenReaderOnly,
  GifModal,
  GifGrid,
} from './components/index.js'
/**
 * I'm  exposing my API key. Normally I wouldn't do this but I'm trying to timebox to 2-4 hours
 */
const API_KEY = '0LRue8eVT7QMC87k7mT8FkCDNAtJN1kC'


export const App = isle(
  { tag: 'giphy-app' },
  base => class extends base {
    async plait({ $, feedback }: PlaitProps) {
      const [ getSearchParams, setSearchParams ] = useSearchParams()
      const limitSelector = $<HTMLSelectElement>('limit')
      const searchField = $<HTMLInputElement>('search')
      const main = $<HTMLElement>('main')
      const limit = limitSelector.value
      const q = searchField.value || 'kittens'
      const offset = getSearchParams().get('offset') ?? 0
      const [ getOffset, setOffset ] = useStore<number>(Number(offset))
      const { data, pagination }: GifsResult = await useFetch(getFetchURL({ q, limit, offset: getOffset(), API_KEY }))
      const [ getData, setData ] = useStore<Data>(formatData(data))
      const [ getTotal, setTotal ] = useStore<number>(pagination.count)
      getData().size && main.render(<GifGrid thumbs={getData()} />)
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
  .icon {

  }
  .largeIcon {

  }
`

export const AppTemplate: PlaitedElement = () => (
  <App.template { ...stylesheet}>
    <header className={cls.header}>
      <label htmlFor='search'>Search Giphy:</label>
      <div className={cls.inputAddOn}>
        <GiphyIcon className={cls.icon} />
        <input
          type='search'
          data-target='search'
          id='search'
        />
        <select 
          data-target='limit'
          aria-label='Select results count to show per page'
        >
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='75'>75</option>
        </select>
      </div>
      <ButtonRow className={cls.pagination}>
        <Button data-target='prev'>Prev</Button>
        <Button data-target='next'>Next</Button>
      </ButtonRow>
    </header>
    <main
      data-target='main'
      className={cls.main}
    >
      <GiphyIcon className={cls.largeIcon} />
      <ScreenReaderOnly>No results yet</ScreenReaderOnly>
    </main>
  </App.template>
)
