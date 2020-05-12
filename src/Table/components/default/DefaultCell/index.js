/**@jsx jsx*/
import React, {useEffect} from 'react'
import {jsx, css} from "@emotion/core";
// import TextEditor from "../../editors/TextEditor";

const selectedCss = css`
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
        <td onClick={onClickHandler} onDoubleClick={onDoubleClickHandler} css={selected ? selectedCss : null}>
            {rowData[accessor]}
        </td>
)
export default DefaultCell