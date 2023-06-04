import { PlaitedElement, css, classNames } from 'plaited'

const [ cls, stylesheet ] = css`
.button {
  --button-shadow: var(--gf-action-shadow);
  color: var(--color-blue);
  border: 2px solid var(--color-blue);
  font-size: var(--font-size);
  line-height: var(--line-height);
  outline: none;
  background: var(--color-black);
  box-shadow: var(--gf-ring-offset-shadow,0 0 #0000),var(--gf-ring-shadow,0 0 #0000),var(--button-shadow);
  padding: 12px 22px 14px 22px;
}
.button:hover {
  --button-shadow: var(--gf-action-shadow-hover);
}
.button:disabled {
  --button-shadow: var(--gf-action-shadow-hover);
  filter: grayscale(100%) brightness(70%);
}
`

export const Button: PlaitedElement = ({ className, ...props }) => (  <button
  className={classNames(cls.button, className)}
  {...props}
  {...stylesheet} 
/>)
