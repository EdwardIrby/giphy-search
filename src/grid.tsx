import { PlaitedElement, css } from 'plaited'
import { Data } from './types.js'
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
export const Grid: PlaitedElement<{
  thumbs: Data
}> = ({ thumbs, 'data-trigger': dataTrigger }) =>(
  <div
    class={cls.grid}
    { ...stylesheet}
  >
    {[ ...thumbs ].map(([ id, { src, title } ]) =>(
      <button
        key={`${id}`}
        value={id}
        class={cls.thumb}
        data-trigger={dataTrigger}
      >
        <span class={cls.screenReaderOnly}>Click to view</span>
        <image
          src={src}
          class={cls.image}
        />
        <span class={cls.title}>{title}</span>
      </button>
    ))}
  </div>
)
