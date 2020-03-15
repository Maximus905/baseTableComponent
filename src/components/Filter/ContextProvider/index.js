import React, {createContext, useEffect, useMemo, useReducer} from "react"
import PropTypes, {oneOfType} from 'prop-types'
import {convertFilterList} from "../helpers";
import rootReducer from "../reducer"
import {initialState} from "../constants/initialState"
import {
    changeFilterType,
    changeMenuMaxHeight, switchOpenState, updateFilterList,
    reopenFilter
} from "../actions";
import ft from "../../../constatnts/filterTypes";
export const DropdownContext = createContext()

export const ContextProvider = (props) => {
    const {accessor, children, data, loadingState, filterSettings, filterSettings: {filterBy},
        maxHeight, maxWidth, fontRatio, bdColor,
        emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
        emptyListWildcard, loadingWildcard,
        openSettingsMenu, closeSettingsMenu,
        onChangeFilter: onChangeFilterExt, onSaveSettings: onSaveSettingsExt,
        onOpen: onOpenExt} = props
    /// settings filter
    const initialSettingList = useMemo(() => (
        filterSettings && filterSettings.allowedTypes.map(key => {
            return ({
                value: ft[key].value,
                label: ft[key].label,
                checked: ft[key].value === filterSettings.type,
            })
        })
    ), [filterSettings])

    let checkedItemsCounter = data.length

    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        data: convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, initialState.selectAll, initialState.filterValue),
        maxHeight, maxWidth,
        checkedItemsCounter,
        settingList: initialSettingList
    })
    const {selectAll: selectAllState, filterValue, settingList, isOpened, reopen} = state

    const onClickSaveSettings = ((accessor) => () => {
        const newType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        closeSettingsMenu()
        onSaveSettingsExt({accessor, newType})
    })(accessor)
    // auto close settings menu
    useEffect(() => {
        onClickSaveSettings()
    }, [settingList])

    const onClickSettingItem = (value) => {
        const currentType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        const newState = {}
        if (currentType !== value) {
            const updatedFilterValue = filterValue.length > 0 ? [] : filterValue
            const updatedFilterList = (value === ft.LIST.value) ? convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, true, updatedFilterValue) : state.data
            const updatedCheckedItemsCounter = updatedFilterList.reduce((acc, item) => item.checked ? ++acc : acc, 0)
            newState.settingList = settingList.map(item => ({...item, checked: item.value === value}))
            newState.filterValue = updatedFilterValue
            newState.inputValue = ''
            newState.data = updatedFilterList
            newState.selectAll = (value === ft.LIST.value) ? true : selectAllState
            newState.checkedItemsCounter = updatedCheckedItemsCounter
            dispatch(changeFilterType(newState))
        } else {
            closeSettingsMenu()
        }
    }
    const toggleOpenState = () => dispatch(switchOpenState())

    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for every changing of filter selectAllState or filterValue
    useEffect(() => {
        const currentType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
        // console.log('change filter value', accessor, filterBy, currentType, selectAllState, filterValue)
        onChangeFilterExt({accessor, filterBy, type: currentType, value: filterValue, selectAllState})
    }, [settingList, selectAllState, filterValue])

    // for lazy updating filter list when is filter opened or we change type of filter in open state
    useEffect(() => {
        if (isOpened) {
            onOpenExt({accessor})
        }
    }, [isOpened])
    useEffect(() => {
        if (isOpened) {
            onOpenExt({accessor})
        }
        // if (isOpened) onOpenExt({accessor})
    }, [filterSettings])
    //update list of filter
    useEffect(() => {
        dispatch(updateFilterList(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)))
    }, [data])

    //watch reopen signal (reopen === true), reset them and open filter
    useEffect(() => {
        if (reopen) {
            dispatch(reopenFilter())
        }
    }, [reopen])

    return (
        <DropdownContext.Provider value={{accessor, state, loadingState, dispatch,
            fontRatio, bdColor,
            emptyWildcard, valueFieldName, labelFieldName, checkedFieldName,
            emptyListWildcard, loadingWildcard,
            openSettingsMenu, closeSettingsMenu,
            settingList, onClickSettingItem, onClickSaveSettings, toggleOpenState
        }}>
            {children}
        </DropdownContext.Provider>
    )
}
ContextProvider.propTypes = {
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])),
    filterListLoading: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onClickItem: PropTypes.func,
    onClickSaveSettings: PropTypes.func,
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    bdColor: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
    openSettingsMenu: PropTypes.func,
    closeSettingsMenu: PropTypes.func,
}
