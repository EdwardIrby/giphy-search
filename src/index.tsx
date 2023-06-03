import { useSugar } from 'plaited'
import { App, AppTemplate } from './app.js'
const root = useSugar(document.querySelector('#root'))
App()
root.render(<AppTemplate />)
