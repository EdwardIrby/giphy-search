import { useSugar } from 'plaited'
import { App, AppTemplate } from './app.js'

const root = useSugar(document.querySelector('body'))
App()
root.render(<AppTemplate />,  'beforeend')
