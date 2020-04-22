/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'

const editorStyle = css`
  background-color: #0c5460;
  input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: inherit;
      color: inherit;
    }
    input:focus {
        outline: none;
    }
`


const TextEditor = ({accessor, rowData, rowId, width, refCellEditor, subscribeOnOutsideClick, unsubscribeFromOutsideClick, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl}) => {
    const url = saveChangesUrl || tableDataUrl
    const [value, setValue] = useState(rowData[accessor])
    const [saving, setSaving] = useState(false)
    const mutableState = useRef(value)

    useEffect(() => {
        subscribeOnOutsideClick(saveResult)
        return function () {
            unsubscribeFromOutsideClick(saveResult)
        }
    }, [])
// save changes on server
    const saveResult = async () => {
        try {
            setSaving(true)
            const serverResponse = await axios.post(url, {
                rowId, rowData, accessor, cellData: mutableState.current
            })
            if (serverResponse.status === 200) {
                saveChangesLocally({rowId, rowData, accessor, cellData: mutableState.current})
            } else {
                throw new Error(serverResponse.data.toString())
            }
        } catch (e) {
            console.log(e.toString())
            alert(e.toString())
        }
        setSaving(false)
        stopEdit()
    }
    // handler for input
    const onChangeHandler = (e) => {
        mutableState.current = e.target.value
        setValue(e.target.value)
    }
    return (
        <td css={editorStyle} ref={refCellEditor}>
            {saving ? <input type="text"  value={'Saving...'} readOnly /> : <input type="text"  value={value} onChange={onChangeHandler} autoFocus />}
        </td>
    )
}
export default TextEditor
