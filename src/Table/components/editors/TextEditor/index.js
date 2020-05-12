/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import {useTheme} from "emotion-theming"
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'



export const TextEditor = ({accessor, rowData, rowId, width, refCellEditor, subscribeOnOutsideClick, unsubscribeFromOutsideClick, setIsSaving, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl, errorFieldName}) => {
    const url = saveChangesUrl || tableDataUrl
    const [value, setValue] = useState(rowData[accessor])
    const [saving, setSaving] = useState(false)
    const mutableState = useRef(value)
    const thm = useTheme()

    const style = css`
      background-color: ${thm.editor.bgColor};
      color: ${thm.editor.color};
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


    useEffect(() => {
        subscribeOnOutsideClick(saveResult)
        return function () {
            unsubscribeFromOutsideClick(saveResult)
        }
    }, [])
// save changes on server
    const saveResult = async () => {
        if (mutableState.current === rowData[accessor]) {
            stopEdit({rowId, accessor})
            return
        }
        try {
            setSaving(true)
            setIsSaving(true)
            const serverResponse = await axios.post(url, {
                rowId, rowData, accessor, cellData: mutableState.current
            })
            if (serverResponse.status === 200) {
                saveChangesLocally({rowId, rowData, accessor, cellData: mutableState.current})
            } else {
                throw new Error(serverResponse.data[errorFieldName] && serverResponse.data[errorFieldName].toString())
            }
        } catch (e) {
            if (e.message) {
                console.log(e.message)
                alert(e.message)
            }
        }
        setSaving(false)
        setIsSaving(false)
        stopEdit({rowId, accessor})
    }
    // handler for input
    const onChangeHandler = (e) => {
        mutableState.current = e.target.value
        setValue(e.target.value)
    }
    return (
        <td css={style} ref={refCellEditor}>
            {saving ? <input type="text"  value={'Saving...'} readOnly /> : <input type="text"  value={value} onChange={onChangeHandler} autoFocus />}
        </td>
    )
}
