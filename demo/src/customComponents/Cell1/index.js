/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useRef} from 'react'


export const Cell1 = ({accessor, rowData, rowIdx, width}) => {
    const tdRef = useRef()
    return <td className="d-flex justify-content-between" ref={tdRef}>
        <div>{rowData[accessor]}</div>
        <div>{rowIdx}</div>
    </td>
}
