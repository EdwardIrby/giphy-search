import { PlaitedElement, css, classNames } from 'plaited'

const [ cls, stylesheet ] = css`
.buttonRow {
  
}
`

export const ButtonRow: PlaitedElement = ({ className, ...props }) => (  <button
  className={classNames(cls.buttonRow, className)}
  {...props} 
  {...stylesheet}
/>)
