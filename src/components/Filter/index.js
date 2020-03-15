import React, {useState} from "react"
import './typeDefs'
import PropTypes, {oneOfType} from 'prop-types'
import {ContextProvider} from "./ContextProvider"
import Dropdown from "./components/Dropdown";
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import SettingsMenu from "./components/SettingsMenu";
import {Dropdown as DropdownBs} from "reactstrap";
import FilterBody from "./components/FilterBody";


const Filter = (props) => {
    const {
        accessor,
        data, //filter list for LIST type
        loadingState, //if list for LIST filter is not ready yet
        active, // if filter value for this filter isn't empty
        maxHeight, maxWidth,
        valueFieldName,
        labelFieldName,
        checkedFieldName,
        emptyWildcard,
        emptyListWildcard,
        loadingWildcard,
        onChangeFilter: onChangeFilterExt,
        onSaveSettings: onSaveSettingsExt,
        onOpen,
        fontRatio,
        opened,
        openSettings,
        filterSettings,
        ...bsProps} = props
    const bdColor = 'rgb(206,212,218)'
    const offset = {
        enabled: true,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    top: -5,
                    left: 5,
                },
            }
        }
    }
    // const [isOpen, setIsOpen] = useState(opened)
    const [showSettings, setShowSettings] = useState(openSettings)
    const closeSettingsMenu = () => {
        setShowSettings(false)
    }
    const openSettingsMenu = () => {
        setShowSettings(true)
    }

    const filterContext = {
        ...props,
        bdColor,
        openSettingsMenu,
        closeSettingsMenu,
    }

    return (
        <ContextProvider {...filterContext} >
            <Dropdown {...bsProps} onClick={(e) => {
                e.stopPropagation()
            }}>
                <DropdownButton active={active} />
                <DropdownMenu modifiers={{offset}} right >
                    {/*{ !showSettings && filter()}*/}
                    { !showSettings && <FilterBody />}
                    { showSettings && <SettingsMenu />}
                </DropdownMenu>
            </Dropdown>
        </ContextProvider>
    )
}
Filter.propTypes = {
    ...DropdownBs.propTypes,
    accessor: PropTypes.string,
    data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]) ),
    loadingState: PropTypes.bool,
    active: PropTypes.bool,
    maxHeight: PropTypes.number, // maxHeight of filterList in px
    maxWidth: PropTypes.number, // maxWidth of filterList in px
    //handlers
    onChangeFilter: PropTypes.func, // every time when filter changes
    onSaveSettings: PropTypes.func, //ext handler for saving filter setting. (accessor, newType) => {}
    onOpen: PropTypes.func,
    //
    fontRatio: PropTypes.number,
    emptyWildcard: PropTypes.string,
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
    checkedFieldName: PropTypes.string,
    emptyListWildcard: PropTypes.string,
    loadingWildcard: PropTypes.string,
    opened: PropTypes.bool, //initial state of filter
    openSettings: PropTypes.bool, //initial state of filter's settings menu
    filterSettings: PropTypes.shape({
        filterBy: PropTypes.string,
        allowedTypes: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.string
    }),
}
Filter.defaultProps = {
    active: false,
    fontRatio: 0.8,
    maxWidth: 200,
    emptyWildcard: '<пусто>',
    valueFieldName: 'val',
    labelFieldName: 'lab',
    checkedFieldName: 'checked',
    emptyListWildcard: 'нет элементов',
    loadingWildcard: 'loading...',
    opened: false,
    openSettings: false,
    onSaveSettings: ({accessor, newType}) => {},
    onOpen: ({accessor}) => {}
}

export default Filter