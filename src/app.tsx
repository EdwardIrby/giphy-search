import {
  isle,
  PlaitProps,
  PlaitedElement,
  css,
  useStore,
  classNames,
} from 'plaited'
import { useFetch, useSearchParams, getFetchURL, formatData } from './utils/index.js'
import { Data, GifsResult } from './types.js'
import {
  GiphyIcon,
  Button,
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
    row-gap: 24px;
    align-items: center;
    padding: 12px 12px 0;
    box-sizing: border-box;
  }
  .header {
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    font-size: var(--font-size);
   line-height: var(--line-height);
   align-items: center;
  }
  .label {
    font-size: 24px;
  }
  .main {
    flex: 1;
    overflow:hidden;
    padding: 12px 0;
    border: 2px solid var(--color-yellow);
    --gf-ring-offset-shadow: 0 0 10px rgba(255, 236, 25, 0.3);
    --gf-ring-shadow: 0 0 5px rgba(255, 236, 25, 0.5);
    --gf-action-shadow: 0 0 15px rgba(255, 236, 25, 0.7);
    box-shadow: inset var(--gf-ring-offset-shadow), inset var(--gf-ring-shadow);
  }
  .mainEmpty {
    border: none;
  }
  .inner {
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .inner::-webkit-scrollbar {
    display: none;
  }
  .inputAddOn{
    display: inline-flex;
    column-gap: 6px;
  }
  .icon {
    height: 54px;
  }
  .searchForm {
    flex:1;
    border: 2px solid var(--color-blue);
    padding: 12px 22px 14px 22px;
    box-shadow: var(--gf-ring-offset-shadow,0 0 #0000),var(--gf-ring-shadow,0 0 #0000),var(--gf-action-shadow);
  }
  .searchInput {
    all: unset;
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: var(--font-size);
    line-height: var(--line-height);
    background: var(--color-black);
  }
  .selectWrapper {
    position: relative;
    display: inline-block;
    box-shadow: var(--gf-ring-offset-shadow,0 0 #0000),var(--gf-ring-shadow,0 0 #0000),var(--gf-action-shadow);
  }
  .select {
    all: unset;
    position: relative;
    color: var(--color-yellow);
    font-size: var(--font-size);
    line-height: var(--line-height);
    background: var(--color-black);
    border: 2px solid var(--color-blue);
    padding: 12px 22px 14px 8px;
  }
  .selectWrapper::after {
    content: "▼";
    /* Adjust these values to move the arrow */
    right: 5px;
    top: 14px;
    position: absolute;
    pointer-events: none;
  }
  .pagination {
    display: flex;
    column-gap: 20px;
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
      const main = $<HTMLElement>('main')
      const inner = $<HTMLDivElement>('inner')
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
          if((limit + offset) <= total && nextBtn.hasAttribute('disabled')) {
            nextBtn.toggleAttribute('disabled', false)
          }
          if((offset - limit) <= -1) {
            previousBtn.toggleAttribute('disabled', true)
          }
          if((offset - limit) >= 0 && previousBtn.hasAttribute('disabled')) {
            previousBtn.toggleAttribute('disabled', false)
          }
        },
        async update() {
          const params = getSearchParams()
          const q = params.get('q') || ''
          const offset = params.get('offset') ?? 0
          const limit = limitSelector.value
          const { data, pagination }: GifsResult = await useFetch(getFetchURL({ 
            q,
            limit,
            offset: Number(offset),
            API_KEY,
          }))

          if(searchField.value === '') {
            inner.replaceChildren()
            main.classList.add(cls.mainEmpty)
            setSearchParams(params => {
              params.clear()
            })
            return
          }
          main.classList.remove(cls.mainEmpty)
          searchField.attr('value', q)
          setSearchParams(params => {
            params.set('q', q)
            params.set('limit', limit)
            params.set('offset', `${offset}`)
            params.set('total', `${pagination.total_count}`)
          })
          setData(formatData(data))
          getData().size && inner.render(<GifGrid
            thumbs={getData()}
            data-trigger={{ click: 'share' }}
          />)
          trigger({ type: 'results-updated' })
        },
        share(evt: MouseEvent) {
          const id = (evt.target as HTMLButtonElement).value
          const link = `https://media.giphy.com/media/${id}/giphy.gif`
          navigator.share({
            title: 'Check out this GIF!',
            text: 'Here is a cool GIF from Giphy.',
            url: link,
          })
        },
        search(evt: FormDataEvent) {
          evt.preventDefault()
          const q = (evt.currentTarget as HTMLFormElement).elements['search'].value
          setSearchParams(params => {
            params.clear()
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
      const params = getSearchParams()
      if(params.has('q')) {
        trigger({ type: 'update' })
      } 
      window.addEventListener('popstate', _  =>{
        trigger({ type: 'update' })
      })
    }
  }
)

/** app template */
export const AppTemplate: PlaitedElement = () => (
  <App.template { ...stylesheet}>
    <header className={cls.header}>
      <label
        htmlFor='search'
        className={cls.label}
      >Search Giphy:</label>
      <div className={cls.inputAddOn}>
        <GiphyIcon className={cls.icon} />
        <form 
          className={cls.searchForm}
          data-trigger={{ submit: 'search' }}
        >
          <input
            type='text'
            data-target='search'
            id='search'
            className={cls.searchInput}
          />
        </form>
      </div>
      <span className={cls.selectWrapper}>
        <select 
          data-target='limit'
          aria-label='Select results count to show per page'
          data-trigger={ { change: 'limit' }}
          className={cls.select}
        >
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='75'>75</option>
        </select>
      </span>  
      <div 
        className={cls.pagination}
      >
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
      </div>
    </header>
    <main
      data-target='main'
      className={classNames(cls.main, cls.mainEmpty)}
    >
      <div 
        data-target='inner'
        aria-live='polite'
        className={cls.inner}
      ></div>
    </main>
  </App.template>
)
