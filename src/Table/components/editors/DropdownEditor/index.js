/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {useEffect, useState, useRef, useCallback} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import DropdownList from "@maximus905/dropdown-list";
import {Button} from "reactstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"


export const DropdownEditor = ({accessor, rowData, rowId, width, refCellEditor, subscribeOnOutsideClick, unsubscribeFromOutsideClick, setIsSaving, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl, tBodyHeight, errorFieldName, minWidthOfList}) => {
    const url = saveChangesUrl || tableDataUrl
    const [value, setValue] = useState(rowData[accessor])
    const [saving, setSaving] = useState(false)
    const mutableState = useRef(rowData[accessor])
    const stopEditCell = useCallback(() => stopEdit({rowId, accessor}), [])

// save changes on server\
    const saveResult = useCallback(async () => {
        if (mutableState.current === rowData[accessor]) {
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
        // subscribeOnOutsideClick(stopEditCell)
        stopEditCell()
    }, [])

    useEffect(() => {
        subscribeOnOutsideClick(stopEditCell)
        return function () {
            unsubscribeFromOutsideClick(stopEditCell)
        }
    }, [])

    const onOpenHandler = () => {
        unsubscribeFromOutsideClick(stopEditCell)
    }
    const onCloseHandler = () => {
        if  (mutableState.current !== value) {
            setValue(mutableState.current)
            saveResult()
        } else {
            subscribeOnOutsideClick(stopEditCell)
        }
    }
    const onChangeHandler = ({accessor, value}) => {
        mutableState.current = value[0]
    }
    const buttonTitle = saving ? 'Saving...' : value

    const Icon1 = ({buttonRef}) => {
        return (
            <Button className="d-flex justify-content-between" css={css`width: 100%`} innerRef={buttonRef} size='sm' >
                <div className="flex-grow-0 text-truncate" title={buttonTitle}>{buttonTitle}</div>
                <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
            </Button>
        )
    }
    return (
        <td ref={refCellEditor}>
            <DropdownList onOpen={onOpenHandler} onClose={onCloseHandler} onChangeSelected={onChangeHandler} buttonContainerWidth="100%" buttonIcon={Icon1} dataUrl={filterDataUrl} accessor={accessor} maxHeight={tBodyHeight * 0.8} widthMenuLikeButton={true} selected={[value]} closeAfterSelect multiSelect={false} minWidth={minWidthOfList} />
        </td>
    )
}
DropdownEditor.propTypes = {
    minWidthOfList: PropTypes.number
}
