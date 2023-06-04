import { PlaitedElement, css } from 'plaited'
import { Data } from '../types.js'
import { ScreenReaderOnly } from './screen-reader-only.js'
const [ cls, stylesheet ] = css`
.grid {
  width: calc(600px + 2rem);
  columns: 3 185px;
  column-gap: 2rem;
  padding-left:calc(16px + 2rem);
}
.thumb {
  background: none;
  display: flex;
  flex-direction: column;
  color: var(--color-yellow);
  border: 2px solid var(--color-yellow);
  row-gap: 4px;
  padding: 0;
  width: 148px;
  box-sizing: border-box;
  margin: 0 1rem 1rem 0;
  cursor: pointer;
}
.thumb > * {
  pointer-events: none;
}
.image {
  aspect-ratio: var(--aspect-ratio);
  width: 100%;
}
.screenReaderOnly {

}
.title {
  border-top: 2px solid var(--color-yellow);
  font-size: 14px;
  line-height: 1.2rem;
  display: inline-block;
  word-wrap: break-word; 
  white-space: normal;
  overflow-wrap: break-word; 
  width: 100%;
}
`
export const GifGrid: PlaitedElement<{
  thumbs: Data
}> = ({ thumbs, 'data-trigger': dataTrigger }) =>(
  <div
    className={cls.grid}
    { ...stylesheet}
    data-trigger={dataTrigger}
  >
    {[ ...thumbs ].map(([ id, { src, title, aspectRatio } ]) =>(
      <button
        key={`${id}`}
        value={id}
        className={cls.thumb}
      >
        <ScreenReaderOnly>Click to share</ScreenReaderOnly>
        <image
          src={src}
          className={cls.image}
          style={ { '--aspect-ratio': `${aspectRatio}` }}
        />
        <span className={cls.title}>{title}</span>
      </button>
    ))}
  </div>
)
