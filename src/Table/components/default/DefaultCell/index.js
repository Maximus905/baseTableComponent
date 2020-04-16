/**@jsx jsx*/
import React from 'react'
import {jsx, css} from "@emotion/core";

const selectedCss = css`
  border: 2px solid skyblue !important;
`

const DefaultCell = ({accessor, rowData, rowId, width, selected, onClickHandler}) => (
    <td onClick={onClickHandler} css={selected ? selectedCss : null}>{rowData[accessor]}{selected ? ' s': ''}</td>
)
export default DefaultCell