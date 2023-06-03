import { isle, PlaitProps, PlaitedElement, css } from 'plaited'
import { GiphyFetch } from '@giphy/js-fetch-api'

/**
 * I'm importing the giphy fetch library here and exposing
 * my API key. Normally I wouldn't do this but I'm trying to timebox
 * the work on this 1-2 hours.
 */
const gf = new GiphyFetch('0LRue8eVT7QMC87k7mT8FkCDNAtJN1kC')

export const App = isle(
  { tag: 'giphy-app' },
  base => class extends base {
    async plait(props: PlaitProps) {

    }
  }
)

export const AppTemplate: PlaitedElement = () => <App.template>Giphy App</App.template>