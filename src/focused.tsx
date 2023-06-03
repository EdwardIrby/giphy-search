import { PlaitedElement, css, classNames } from 'plaited'

const [ cls, stylesheet ] = css`
.focused {

}
.image {

}
.button {

}
.row {

}
.close {

}
.share {

}
`

export const Focused: PlaitedElement<{
  src: string,
  close: { click: string} 
  share: { click: string}
  id: string
}> = ({
  src,
  share,
  close,
  id,
}) => (
  <div {...stylesheet}
    class={cls.focused}
  >
    <img src={src}
      class={cls.image}
    />
    <div class={cls.row}>
      <button
        class={classNames(cls.button, cls.close)}
        data-trigger={close}
        value={id}
      >close</button>
      <button
        class={classNames(cls.button, cls.share)}
        data-trigger={share}
        value={id}
      >
      share
      </button>
    </div>
  </div>
)
