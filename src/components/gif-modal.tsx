import { PlaitedElement, css } from 'plaited'
import { Button, ButtonRow, GiphyIcon, ScreenReaderOnly } from './index.js'
const [ cls, stylesheet ] = css`
.focused {

}
.image {

}
.row {

}
.icon {

}
.share {

}
`

export const GifModal: PlaitedElement<{
  src: string,
  close: { click: string} 
  share: { click: string}
  id: string
  title: string
}> = ({
  src,
  share,
  close,
  id,
  title,
}) => (
  <div {...stylesheet}
    className={cls.focused}
  >
    <img src={src}
      className={cls.image}
      alt={title}
    />
    <ButtonRow className={cls.row}>
      <Button
        data-trigger={close}
        value={id}
      >
        Close <ScreenReaderOnly>modal for gif of {title}</ScreenReaderOnly>
      </Button>
      <Button
        className={cls.share}
        data-trigger={share}
        value={id}
      >
        <GiphyIcon className={cls.icon} />
        Share <ScreenReaderOnly>gif of {title}</ScreenReaderOnly>
      </Button>
    </ButtonRow>
  </div>
)
