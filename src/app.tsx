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

/** styles for app  */
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
  .modalContainer {

  }
  .modalOpen {

  }
  .grid {

  }
`

/** custom app element logic */
export const App = isle(
  { tag: 'giphy-app' },
  base => class extends base {
    async plait({ $, feedback, addThreads, loop, sync, trigger }: PlaitProps) {
      const [ getSearchParams, setSearchParams ] = useSearchParams()
      const limitSelector = $<HTMLSelectElement>('limit')
      const searchField = $<HTMLInputElement>('search')
      const gridContainer = $<HTMLDivElement>('grid-container')
      const modalContainer = $<HTMLDivElement>('modal-container')
      const previousBtn = $<HTMLButtonElement>('prev')
      const nextBtn = $<HTMLButtonElement>('next')
      const [ getData, setData ] = useStore<Data>(new Map())
      addThreads({
        onUpdate: loop([
          sync({
            waitFor: [ { type: 'prev' }, { type: 'next' }, { type: 'search' }, { type: 'limit' } ],
          }),
          sync({ request: { type: 'update' } }),
        ]),
        onPaginationUpdate: loop([
          sync({ waitFor: { type: 'results-updated' } }),
          sync({ request: { type: 'paginationUpdate' } }),
        ]),
      })
      feedback({
        paginationUpdate() {
          const params = getSearchParams()
          const limit = Number(params.get('limit'))
          const offset = Number(params.get('offset'))
          const total = Number(params.get('total'))
        
          if((limit + offset) > total) {
            nextBtn.toggleAttribute('disabled', true)
          }
          if((limit + offset) < total && nextBtn.hasAttribute('disabled')) {
            nextBtn.toggleAttribute('disabled', false)
          }
          if((offset - limit) < 0) {
            previousBtn.toggleAttribute('disabled', true)
          }
          if((offset - limit) > 0 && previousBtn.hasAttribute('disabled')) {
            previousBtn.toggleAttribute('disabled', false)
          }
        },
        async update() {
          const params = getSearchParams()
          const q = params.get('q') || 'kittens'
          const offset = params.get('offset') ?? 0
          const limit = limitSelector.value
          const { data, pagination }: GifsResult = await useFetch(getFetchURL({ 
            q,
            limit,
            offset: Number(offset),
            API_KEY,
          }))
          if(searchField.value !== '') {
            searchField.attr('value', q)
          }
          setSearchParams(params => {
            params.set('q', q)
            params.set('limit', limit)
            params.set('offset', `${offset}`)
            params.set('total', `${pagination.total_count}`)
          })
          setData(formatData(data))
          getData().size && gridContainer.render(<GifGrid thumbs={getData()} />)
          trigger({ type: 'results-updated' })
        },
        share(evt: MouseEvent) {
          const id = (evt.currentTarget as HTMLButtonElement).value
          const link = `https://media.giphy.com/media/${id}/giphy.gif`
          navigator.share({
            title: 'Check out this GIF!',
            text: 'Here is a cool GIF from Giphy.',
            url: link,
          })
        },
        close() {
          modalContainer.classList.remove(cls.modalOpen)
        },
        open(evt: MouseEvent){
          const id = (evt.currentTarget as HTMLButtonElement).value
          const { title, large } = getData().get(id)
          modalContainer.render(<GifModal
            id={ id}
            title={ title}
            src={ large }
            share={ { click: 'share' }}
            close={{ click: 'close' }}
          /> )
          modalContainer.classList.add(cls.modalOpen)
        },
        search(evt: FormDataEvent) {
          evt.preventDefault()
          const q = (evt.currentTarget as HTMLFormElement).elements['search'].value
          setSearchParams(params => {
            params.set('q', q)
          })
        },
        prev(){
          setSearchParams(params => {
            const cur = Number(params.get('offset'))
            const limit = Number(limitSelector.value)
            params.set('offset', `${cur - limit}`)
          })
        },
        next(){
          setSearchParams(params => {
            const cur = Number(params.get('offset'))
            const limit = Number(limitSelector.value)
            params.set('offset', `${cur + limit}`)
          })
        },
      })
      trigger({ type: 'update' })
    }
  }
)

/** app template */
export const AppTemplate: PlaitedElement = () => (
  <App.template { ...stylesheet}>
    <header className={cls.header}>
      <label htmlFor='search'>Search Giphy:</label>
      <div className={cls.inputAddOn}>
        <form 
          className={cls.inputAddOn}
          data-trigger={{ submit: 'search' }}
        >
          <GiphyIcon className={cls.icon} />
          <input
            type='search'
            data-target='search'
            id='search'
            value='kittens'
          />
        </form>
        <select 
          data-target='limit'
          aria-label='Select results count to show per page'
          data-trigger={ { change: 'limit' }}
        >
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='75'>75</option>
        </select>
      </div>
      <ButtonRow className={cls.pagination}>
        <Button 
          data-target='prev'
          data-trigger={{ click: 'prev' }}
          disabled
        >Prev</Button>
        <Button 
          data-target='next'
          data-trigger={{ click: 'next' }}
          disabled
        >Next</Button>
      </ButtonRow>
    </header>
    <main className={cls.main}>
      <div
        data-target='grid-container'
        className={cls.grid}
      >
        <GiphyIcon className={cls.largeIcon} />
        <ScreenReaderOnly>No results yet</ScreenReaderOnly>
      </div>
      <div
        data-target='modal-container'
        className={cls.modal}
      >

      </div>
    </main>
  </App.template>
)
