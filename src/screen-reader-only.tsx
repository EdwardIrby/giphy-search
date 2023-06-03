import { PlaitedElement, css } from 'plaited'

const [ cls, stylesheet ] = css`
.screenReaderOnly {

}
`

export const ScreenReaderOnly: PlaitedElement = props => (
  <span {...props}
    {...stylesheet}
    class={cls.screenReaderOnly}
  />
)
