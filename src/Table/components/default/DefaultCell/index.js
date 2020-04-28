/**@jsx jsx*/
import React, {useEffect} from 'react'
import {jsx, css} from "@emotion/core";
// import TextEditor from "../../editors/TextEditor";

const selectedCss = css`
  border: 2px solid skyblue !important;
`

const DefaultCell = (
    {
        accessor,rowData, rowId, width, selected,
        editMode,
        editor: Editor,
        onClickHandler,
        onDoubleClickHandler,
        refCellEditor,
        subscribeOnOutsideClick, unsubscribeFromOutsideClick,
        stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl}
) => (
    editMode && Editor ?
        <Editor {...{accessor, rowData, rowId, width, refCellEditor, subscribeOnOutsideClick, unsubscribeFromOutsideClick, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl}} /> :
        <td onClick={onClickHandler} onDoubleClick={onDoubleClickHandler} css={selected ? selectedCss : null}>
            {rowData[accessor]}
        </td>
)
export default DefaultCell