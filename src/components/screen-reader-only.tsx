import { PlaitedElement, css } from 'plaited'

const [ cls, stylesheet ] = css`
.screenReaderOnly {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
`

export const ScreenReaderOnly: PlaitedElement = props => (
  <span {...props}
    {...stylesheet}
    className={cls.screenReaderOnly}
  />
)
