import { PlaitedElement, css } from 'plaited'
import { Data } from '../types.js'
const [ cls, stylesheet ] = css`
.grid {

}
.thumb {

},
.image {

}
.screenReaderOnly {

}
.title {

}
`
export const GifGrid: PlaitedElement<{
  thumbs: Data
}> = ({ thumbs, 'data-trigger': dataTrigger }) =>(
  <div
    className={cls.grid}
    { ...stylesheet}
  >
    {[ ...thumbs ].map(([ id, { src, title } ]) =>(
      <button
        key={`${id}`}
        value={id}
        className={cls.thumb}
        data-trigger={dataTrigger}
      >
        <span className={cls.screenReaderOnly}>Click to view</span>
        <image
          src={src}
          className={cls.image}
        />
        <span className={cls.title}>{title}</span>
      </button>
    ))}
  </div>
)
