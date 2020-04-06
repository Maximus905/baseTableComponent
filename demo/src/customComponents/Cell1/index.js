/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useRef, useLayoutEffect} from 'react'


export const Cell1 = ({accessor, rowData, width, invalidateDataWithTimeout}) => {
    const tdRef = useRef()
    return <td className="d-flex justify-content-between" ref={tdRef}>
        <div>{rowData[accessor]}</div>
    </td>
}
