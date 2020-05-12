/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import {ThemeProvider} from "emotion-theming";
import {useReducer, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {lightTheme as thm} from "./themes";
import statCss from "./staticStyles"
//actions
import {
    setScrollSizes,
    pageResizing,
    tableResizing,
    invalidateData,
    resetInvalidateDelay,
    requestFilterList,
    editCell,
    finishEditCell,
    changeDataInLocalStorage, savingInProcess
} from "./actions";
//components
import DefaultHeaderRow from "./components/default/DefaultHeaderRow"
import DefaultRow from "./components/default/DefaultRow";
import ScrollCell from "./components/ScrollCell"
import Spinner from "./components/Spiner";
import TableFooter from "./components/TableFooter";

import ft from "./constatnts/filterTypes";
import {useEvent} from "./hooks"
import {rootReducer, dispatchMiddleware} from "./reducer"
import {
    app_convertFilters,
    app_convertPagination,
    iniReducerState,
    headerCellsCollection,
    bodyCellsCollection,
} from './helpers'
import TableContext from "./TableContext"
import {requestData, ctrlDown, ctrlUp} from "./actions";
import classNames from "classnames";
import ScrollbarSize from "react-scrollbar-size";
import SimpleHeaderCell from "./components/SimpleHeaderCell";
import Pagination from "./components/Pagination";
import GlobalSearch from "./components/GlobalSearch";
import RecordsCounter from "./components/RecordsCounter";
import {selectCell} from "./actions"
import {defaultTableDataLoader, defaultFilterDataLoader} from "./loaders";

const Table = props => {
    const {tableDataUrl, saveChangesUrl, filterDataUrl, tableDataLoader, filterDataLoader, table, columns, filterDataFieldName, filterLabelName, filterValueName, emptyValueWildcard, emptyWildcard, dataFieldName, dataCounterFieldName, errorFieldName } = props
    const {customHeaderRow, customRow} = table || {}
    const HeaderRow = customHeaderRow || DefaultHeaderRow
    const BodyRow = customRow || DefaultRow
    const headerCells = headerCellsCollection(props)
    const bodyCells = bodyCellsCollection(props)
    const [state, dispatch] = useReducer(rootReducer, props, iniReducerState)
    const asyncDispatch = dispatchMiddleware(dispatch)
    const {isSaving, isLoading, didInvalidate,
        showPagination, showRecordsCounter, showGlobalSearch,
        invalidateWithDelay, sorting, filters, pagination, isCtrlPressed,
        tableSettings: {tableSmall, tableBordered, tableBorderless},
        columnsSettings,
        dimensions: {tWidth, vScroll, tBoxWidth, tBodyBoxHeight},
        visibleColumnsOrder,
        selectedCells, cellsInEditMode
    } = state
    useEvent('resize', onResizeHandler)
    const refTableBox = useRef(null)
    const refTableHeaderBox = useRef(null)
    const refTableBodyBox = useRef(null)
    const refCellEditor = useRef(null)
    const outsideClickHandlers = useRef(new Set())
    const isTableMountedRef = useRef(false)
    const subscribeOnOutsideClick = (handler) => {
        outsideClickHandlers.current.add(handler)
    }
    const unsubscribeFromOutsideClick = (handler) => {
        outsideClickHandlers.current.delete(handler)
    }
    const handlerClickOutside  = (e) => {
        if (refCellEditor.current) {
            const clickOutside = !refCellEditor.current.contains(e.target)
            if (clickOutside && outsideClickHandlers.current.size > 0) {
                for (let handler of outsideClickHandlers.current) handler()
            }
        }

    }
    useEffect(() => {
        document.addEventListener('click', handlerClickOutside)
        return function () {
            document.removeEventListener('click', handlerClickOutside)
        }
    })
    useEffect(() => {
        isTableMountedRef.current = true
        return () => isTableMountedRef.current = false
    }, []);


    useEffect(() => {
        if (isLoading === false) onResizeHandler()
    }, [isLoading])
    useEffect(() => {
        dispatch(tableResizing())
    }, [tBoxWidth, vScroll, props.columns])
    function onResizeHandler() {
        dispatch(pageResizing({
            tBoxWidth: refTableBox.current.clientWidth,
            tBoxHeight: refTableBox.current.clientHeight,
            tBodyBoxWidth: refTableBodyBox.current.clientWidth,
            tBodyBoxHeight: refTableBodyBox.current.clientHeight,
        }))
    }
    // reload data table according to isLoading and didInvalidate
    useEffect(() => {
        if (!isLoading && didInvalidate && !isCtrlPressed) {
            const action = requestData({
                url: tableDataUrl,
                fetchFunction: tableDataLoader,
                filters: app_convertFilters({filters, emptyValueWildcard}),
                sorting,
                pagination: app_convertPagination({pagination}),
                dataFieldName,
                dataCounterFieldName,
                errorFieldName,
                isTableMountedRef
            })
            asyncDispatch(action)
        }
    }, [isLoading, didInvalidate, isCtrlPressed])

    // filters list handle
    const updateFilterList = ({accessor}) => {
        const filter = filters[accessor]
        if (filter.type === ft.LIST.value && filter.didInvalidate) {
            asyncDispatch(requestFilterList({url: filterDataUrl, fetchFunction: filterDataLoader, filters: app_convertFilters({filters, emptyValueWildcard}), accessor, dataFieldName: filterDataFieldName, errorFieldName, isTableMountedRef}))
        }
    }

    useEffect(() => {
    }, [filters]);

    useEffect(() => {
        if (Number.isInteger(invalidateWithDelay)) {
            invalidateDataWithTimeout(invalidateWithDelay)
        }
    }, [invalidateWithDelay])

    // invalidate data with timeout
    const timeIdRef = useRef(null)
    const invalidateDataWithTimeout = (delay) => {
        if (timeIdRef.current) {
            clearTimeout(timeIdRef.current)
        }
        timeIdRef.current = setTimeout(() => dispatch(invalidateData()), delay)
    }
    // Ctrl key handlers
    function ctrlDownHandler(e) {
        if (!isCtrlPressed && e.ctrlKey) {
            return dispatch(ctrlDown())
        }

    }
    function ctrlUpHandler(e) {
        if (isCtrlPressed && !e.ctrlKey) {
            return dispatch(ctrlUp())
        }
    }
    // click handlers
    function onClickCellsHandler({rowId, accessor}) {
        return (e) => {
            dispatch(selectCell({rowId, accessor}))
        }
    }
    function onDoubleClickCellHandler({rowId, accessor}) {
        if (!columnsSettings[accessor].editable) {
            return () =>{}
        } else if (!columnsSettings[accessor].editor) {
            return () =>{ console.log("Editor isn't assigned for column ", accessor)}
        }
        return (e) => {

            dispatch(editCell({rowId, accessor}))
        }
    }
    function saveChangesLocally({rowId, rowData, accessor, cellData}) {
        dispatch(changeDataInLocalStorage({rowId, rowData, accessor, cellData}))
    }
    function stopEdit({rowId, accessor}) {
        dispatch(finishEditCell({rowId, accessor}))
    }
    function setIsSaving(status) {
        dispatch(savingInProcess(status))
    }

    const context = {
        state,
        dispatch: asyncDispatch,
        invalidateDataWithTimeout,
        tableDataUrl,
        filterDataUrl,
        tableDataLoader,
        filterDataLoader,
        filterLabelName,
        filterValueName,
        emptyValueWildcard,
        emptyWildcard,
        updateFilterList,
        isTableMountedRef
    }
    const hdRowCss = css`
      th {
        background-color: ${thm.hd.bgColor};
        color: ${thm.hd.color}
      }
    `
    const bdHdRowCss = css`
      border: none !important;
    `
    const bdRowCss = css`
      tr:nth-of-type(odd) {
        background-color: ${thm.bd.row.odd.bgColor};
      }
      tr:nth-of-type(even) {
        background-color: ${thm.bd.row.even.bgColor};
      }
      tr:hover {
        color: ${thm.bd.row.hover.color};
        background-color: ${thm.bd.row.hover.bgColor} !important;
      }
    `
    const tHdBoxCss = css`
      ${statCss.tHdBox};
      width: ${tWidth + vScroll}px;
    `
    const tBdBoxCss = css`
      ${statCss.tBdBox};
      width: ${tWidth + vScroll}px;
      & > table {
        width: ${tWidth}px; table-layout: fixed !important;
      }
    `
    return (
        <ThemeProvider theme={thm}>
        <TableContext.Provider value={context}>
            <div css={statCss.tBox} className="tBox" ref={refTableBox} onKeyDown={ctrlDownHandler} onKeyUp={ctrlUpHandler} tabIndex="-1">
                <div css={statCss.tHdBdBox} className="tHdBdBox">
                    <div className="tHdBox" css={tHdBoxCss} ref={refTableHeaderBox}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-bordered": tableBordered, "table-borderless": tableBorderless})} css={css`width: ${tWidth}px; table-layout: fixed !important;`}>
                            <thead>
                                <HeaderRow style={hdRowCss}>
                                    {() => {
                                        const cells = visibleColumnsOrder.map((accessor, idx) => {
                                            const HeaderCell = headerCells[accessor]
                                            return <HeaderCell accessor={accessor} key={idx}/>
                                        })
                                        cells.push(<ScrollCell vScroll={vScroll} key={'sc'} />)
                                        return cells
                                    }}
                                </HeaderRow>
                            </thead>
                        </table>
                    </div>
                    <div className="tBdBox bg-light " css={tBdBoxCss} ref={refTableBodyBox}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-bordered": tableBordered, "table-borderless": tableBorderless})} >
                            <thead css={statCss.hiddenHeader}>
                                <HeaderRow style={bdHdRowCss}>
                                    {() => visibleColumnsOrder.map((accessor, idx) => <SimpleHeaderCell accessor={accessor} key={idx}/>)}
                                </HeaderRow>
                            </thead>
                            <tbody css={bdRowCss}>
                            {state.data.map((rowData, index) => {
                                const selectedCellsInRow = selectedCells.get(index)
                                return (
                                    <BodyRow {...{key: index, rowData, rowId: index, columnsSettings, selectedCellsInRow, onClickCellsHandler}}>
                                        {({rowData, rowId, columnsSettings, selectedCellsInRow, onClickCellsHandler}) => visibleColumnsOrder.map((accessor, index) => {
                                            const Cell = bodyCells[accessor]
                                            const cellProps = {
                                                accessor, rowData, rowId,
                                                width: columnsSettings[accessor].width,
                                                tBodyHeight: tBodyBoxHeight,
                                                selected: selectedCellsInRow && selectedCellsInRow.has(accessor),
                                                editMode: cellsInEditMode.has(rowId) && cellsInEditMode.get(rowId).has(accessor),
                                                editor: columnsSettings[accessor].editable && columnsSettings[accessor].editor,
                                                onClickHandler: onClickCellsHandler({rowId, accessor}),
                                                onDoubleClickHandler: onDoubleClickCellHandler({rowId, accessor}),
                                                refCellEditor,
                                                subscribeOnOutsideClick, unsubscribeFromOutsideClick,
                                                setIsSaving, stopEdit, saveChangesLocally,
                                                saveChangesUrl, tableDataUrl, filterDataUrl,
                                                errorFieldName}
                                            return <Cell {...cellProps} key={index} />
                                        })}
                                    </BodyRow>
                                )
                            })}
                            </tbody>
                        </table>
                        {isLoading ? <Spinner/> : null}
                    </div>
                </div>
                <TableFooter>
                    {showGlobalSearch ? <GlobalSearch /> : <div/>}
                    {showRecordsCounter && <RecordsCounter/>}
                    {showPagination ? <div><Pagination /></div> : <div/>}
                </TableFooter>
            </div>
            <ScrollbarSize onLoad={(measurements) => dispatch(setScrollSizes({vScroll: measurements.scrollbarWidth, hScroll: measurements.scrollbarHeight}))}/>
        </TableContext.Provider>
        </ThemeProvider>
    )
}
Table.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        //bs styles for table
        tableSmall: PropTypes.bool,
        tableBordered: PropTypes.bool,
        tableBorderless: PropTypes.bool,
        //
        globalFilter: PropTypes.bool,
        customRow: PropTypes.func, // customers row React component (i.e. CustomRow)
        customHeaderRow: PropTypes.func, // customers row React component (i.e. CustomHeaderRow)
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        accessor: PropTypes.string,
        minWidth: PropTypes.number, // min width in px
        maxWidth: PropTypes.number, //max width in px
        isVisible: PropTypes.bool,
        sortable: PropTypes.bool,
        filterable: PropTypes.bool,
        filter: PropTypes.shape({
            filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
            type: PropTypes.oneOf(Object.keys(ft)),
            allowedTypes: PropTypes.arrayOf(PropTypes.string), // array of available operators [keys of ft object]
        }),
        editable: PropTypes.bool,
        editor: PropTypes.elementType,
        customCell: PropTypes.func, // customers cell React component (i.e. CustomCell)
        customHeaderCell: PropTypes.func, // customers cell React component (i.e. CustomHeaderCell) (TODO)
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        type: PropTypes.oneOf(Object.keys(ft)),
        allowedTypes: PropTypes.arrayOf(PropTypes.string), // array of available operators [keys of ft object]
    }),
    tableDataLoader: PropTypes.func, // async function ({url, filters, sorting, pagination}) => {} should return array of objects like {'accessor: 'value'}
    custom: PropTypes.objectOf(PropTypes.any),
    //urls
    tableDataUrl: PropTypes.string,
    saveChangesUrl: PropTypes.string, //if it doesn't set tableDataUrl will be used
    filterDataUrl: PropTypes.string,
    // getting filters data
    filterDataLoader: PropTypes.func, //async function to get list for filter. async ({accessor, filters}) => ({})
    filterDataFieldName: PropTypes.string,
    filterValueName: PropTypes.string, // is used in filter list object
    filterLabelName: PropTypes.string, // is used in filter list object
    // filterCheckedName: PropTypes.string, // is used in filter list object
    emptyValueWildcard: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    emptyWildcard: PropTypes.string,
    // getting table data
    dataFieldName: PropTypes.string,
    dataCounterFieldName: PropTypes.string,
    errorFieldName: PropTypes.string,
    //
    showRecordsCounter: PropTypes.bool,
    showGlobalSearch: PropTypes.bool,
    showTableFooter: PropTypes.bool,
}
Table.defaultProps = {
    tableDataLoader: defaultTableDataLoader,
    filterDataLoader: defaultFilterDataLoader,
    filterDataFieldName: 'data',
    filterValueName: 'val',
    filterLabelName: 'lab',
    // filterCheckedName: 'checked',
    emptyValueWildcard: '',
    emptyWildcard: '<пусто>',
    // format for fetching data from server: {[dataFieldName]: data, [dataCounterFieldName]: totalCountOfData}
    //totalCountOfData is used for pagination
    //if data is fetched as array (bare data) - pagination will be turned off
    dataFieldName: 'data',
    dataCounterFieldName: 'counter',
    errorFieldName: 'error',
    //
    showRecordsCounter: true,
    showGlobalSearch: true,
    showTableFooter: true,
}
export default Table
export {TextEditor} from './components/editors/TextEditor'
export {DropdownEditor} from './components/editors/DropdownEditor'