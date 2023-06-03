import { PlaitedElement, css, classNames } from 'plaited'

const [ cls, stylesheet ] = css`
.button {

}
`

export const Button: PlaitedElement = ({ className, ...props }) => (  <button
  className={classNames(cls.button, className)}
  {...props}
  {...stylesheet} 
/>)
