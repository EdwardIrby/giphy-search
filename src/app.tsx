import { isle, PlaitProps, PlaitedElement, css } from 'plaited'

export const App = isle(
  { tag: 'giphy-app' },
  base => class extends base {
    async plait(props: PlaitProps): void | Promise<void> {

    }
  }
)

export const AppTemplate: PlaitedElement = () => <App.template></App.template>