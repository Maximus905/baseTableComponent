/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useRef} from 'react'


export const Cell1 = ({accessor, rowData, rowId, width}) => {
    const tdRef = useRef()
    const css1 = css`
  width: 80%;
  word-wrap: break-word;
  padding-right: 1rem;
`
    const css2 = css`
    width: 10%;
    padding-left: 1rem;
    padding-right: 1rem;
`
    return <td className="d-flex justify-content-between" ref={tdRef}>
            <div css={css1}>{rowData[accessor]}</div>
            <div css={css2}>{rowId}</div>
    </td>
}
