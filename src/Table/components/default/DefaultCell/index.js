/**@jsx jsx*/
import React, {useEffect} from 'react'
import {jsx, css} from "@emotion/core";
// import TextEditor from "../../editors/TextEditor";

const baseCss = css`
  word-wrap: break-word;
`
const selectedCss = css`
  ${baseCss};
  border: 2px solid skyblue !important;
`

const DefaultCell = (
    {
        accessor,rowData, rowId, width, tBodyHeight, selected,
        editMode,
        editor: Editor,
        onClickHandler,
        onDoubleClickHandler,
        refCellEditor,
        subscribeOnOutsideClick, unsubscribeFromOutsideClick,
        setIsSaving, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl,
        errorFieldName
    }
) => (
    editMode && Editor ?
        <Editor {...{accessor, rowData, rowId, width, refCellEditor, subscribeOnOutsideClick, unsubscribeFromOutsideClick, setIsSaving, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, errorFieldName, filterDataUrl, tBodyHeight}} /> :
        <td onClick={onClickHandler} onDoubleClick={onDoubleClickHandler} css={selected ? selectedCss : baseCss}>
            {rowData[accessor]}
        </td>
)
export default DefaultCell