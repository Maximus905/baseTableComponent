/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import {useReducer, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import myCss from './style.module.css'
//actions
import {setScrollSizes, pageResizing, tableResizing, invalidateData, resetInvalidateDelay, requestFilterList} from "./actions";
//components
import HeaderRow from "./components/HeaderRow"
import HeaderCell from "./components/HeaderCell";
import ScrollCell from "./components/ScrollCell"
import Spinner from "./components/Spiner";
import Row from "./components/Row";
import TableFooter from "./components/TableFooter";

import ft from "./constatnts/filterTypes";
import {useEvent} from "./hooks"
import {rootReducer, dispatchMiddleware} from "./reducer"
import {
    app_convertFilters, app_convertPagination,
    iniReducerState, renderCellFunctionsFromProps, renderHeaderCellFunctionsFromProps
} from './helpers'
import TableContext from "./TableContext"
import {requestData, ctrlDown, ctrlUp} from "./actions";
import classNames from "classnames";
import ScrollbarSize from "react-scrollbar-size";
import Cell from "./components/Cell";
import SimpleHeaderCell from "./components/SimpleHeaderCell";
import Pagination from "./components/Pagination";
import GlobalSearch from "./components/GlobalSearch";
import RecordsCounter from "./components/RecordsCounter";

const Table = props => {
    const {getTableData, table, columns, getFilterList, filterLabelName, filterValueName, emptyWildcard, dataFieldName, dataCounterFieldName } = props
    const {renderHeaderRow, renderRow} = table || {}
    const renderCellFunctions = renderCellFunctionsFromProps(props)
    const renderHeaderCellFunctions = renderHeaderCellFunctionsFromProps(props)
    const [state, dispatch] = useReducer(rootReducer, props, iniReducerState)
    const asyncDispatch = dispatchMiddleware(dispatch)
    const {isLoading, didInvalidate,
        showPagination, showRecordsCounter, showGlobalSearch,
        invalidateWithDelay, sorting, filters, pagination, isCtrlPressed,
        tableSettings: {tableSmall, tableStriped, tableDark, tableBordered, tableBorderless, tableHover},
        columnsSettings,
        dimensions: {tWidth, vScroll, tBoxWidth},
        visibleColumnsOrder,
    } = state
    useEvent('resize', onResizeHandler)
    const refTableBox = useRef(null)
    const refTableBodyBox = useRef(null)
    useEffect(() => onResizeHandler(), [])
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
                fetchFunction: getTableData,
                filters: app_convertFilters({filters, emptyWildcard}),
                sorting,
                pagination: app_convertPagination({pagination}),
                dataFieldName,
                dataCounterFieldName
            })
            asyncDispatch(action)
        }
    }, [isLoading, didInvalidate, isCtrlPressed])

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
    // filters list handle
    const updateFilterList = ({accessor}) => {
        const filter = filters[accessor]
        if (filter.type === ft.LIST.value && filter.didInvalidate) {
            asyncDispatch(requestFilterList({fetchFunction: getFilterList, filters: app_convertFilters({filters, emptyWildcard}), accessor}))
        }
    }

    const context = {
        state,
        dispatch: asyncDispatch,
        invalidateDataWithTimeout,
        getTableData,
        getFilterList,
        renderHeaderRow,
        renderHeaderCellFunctions,
        renderRow,
        renderCellFunctions,
        filterLabelName,
        filterValueName,
        // filterCheckedName,
        emptyWildcard,
        updateFilterList
    }
    // const sorter = (accessor) => (<Sorter accessor={accessor} />)
    return (
        <TableContext.Provider value={context}>
            <div className={classNames(myCss.tBox, "d-flex", "flex-column", "bg-light")} ref={refTableBox} onKeyDown={ctrlDownHandler} onKeyUp={ctrlUpHandler} tabIndex="-1">
                <div className={classNames(myCss.tHdBdBox, isLoading ? myCss.noScroll : '', "d-flex", "flex-column", "flex-grow-1", "position-relative")}>
                    <div className={classNames(myCss.tHdBox, "bg-light")} css={css`width: ${tWidth + vScroll}px`}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless}, myCss.fixTableSizes)} css={css`width: ${tWidth}px`}>
                            <thead>
                                <HeaderRow renderHeaderRow={renderHeaderRow} >
                                    {visibleColumnsOrder.map((accessor, index) => <HeaderCell accessor={accessor} key={index} />)}
                                    <ScrollCell vScroll={vScroll} />
                                </HeaderRow>
                            </thead>
                        </table>
                    </div>
                    <div className={classNames(myCss.tBdBox, isLoading ? myCss.noScroll : '', "bg-light", "flex-grow-1")} css={css`width: ${tWidth + vScroll}px;`} ref={refTableBodyBox}>
                        <table className={classNames("table", {"table-sm": tableSmall, "table-striped": tableStriped, "table-dark": tableDark, "table-bordered": tableBordered, "table-borderless": tableBorderless, "table-hover": tableHover }, myCss.fixTableSizes)} css={css`width: ${tWidth}px`}>
                            <thead className={myCss.hiddenHeader}>
                            <HeaderRow>
                                {visibleColumnsOrder.map((accessor, index) => <SimpleHeaderCell accessor={accessor} key={index} />)}
                            </HeaderRow>
                            </thead>
                            <tbody>
                            {state.data.map((rowData, index) => (
                                <Row key={index} rowData={rowData} index={index}>
                                    {visibleColumnsOrder.map((accessor, index) => <Cell accessor={accessor} rowData={rowData} width={columnsSettings[accessor].width} key={index} />)}
                                </Row>
                            ))}
                            </tbody>
                        </table>
                        {isLoading ? <Spinner/> : null}
                    </div>
                </div>
                <TableFooter darkTheme={tableDark} >
                    {showGlobalSearch ? <GlobalSearch darkTheme={tableDark} /> : <div/>}
                    {showRecordsCounter && <RecordsCounter/>}
                    {showPagination ? <Pagination darkTheme={tableDark} /> : <div/>}
                </TableFooter>
            </div>
            <ScrollbarSize onLoad={(measurements) => dispatch(setScrollSizes({vScroll: measurements.scrollbarWidth, hScroll: measurements.scrollbarHeight}))}/>
        </TableContext.Provider>
    )
}
Table.propTypes = {
    table: PropTypes.shape({
        width: PropTypes.number, //width of table (% from tBox)
        //bs styles for table
        tableSmall: PropTypes.bool,
        tableStriped: PropTypes.bool,
        tableDark: PropTypes.bool,
        tableBordered: PropTypes.bool,
        tableBorderless: PropTypes.bool,
        tableHover: PropTypes.bool,
        //
        globalFilter: PropTypes.bool,
        renderRow: PropTypes.func, // function for rendering row in Body of table
        renderHeaderRow: PropTypes.func, // function for rendering row in a visible Header of table
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
        renderCell: PropTypes.func, // ({accessor, rowData}) => (<td>Your code here</td>)
        renderHeaderCell: PropTypes.func, // ({accessor, columnsSettings}) => (<th>Your code here</th>)
    })),
    globalFilter: PropTypes.shape({
        filterBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        type: PropTypes.oneOf(Object.keys(ft)),
        allowedTypes: PropTypes.arrayOf(PropTypes.string), // array of available operators [keys of ft object]
    }),
    getTableData: PropTypes.func, // async function should return array of objects like {'accessor: 'value'}
    custom: PropTypes.objectOf(PropTypes.any),
    getFilterList: PropTypes.func, //async function to get list for filter. async ({accessor, filters}) => ({})
    filterValueName: PropTypes.string, // is used in filter list object
    filterLabelName: PropTypes.string, // is used in filter list object
    filterCheckedName: PropTypes.string, // is used in filter list object
    emptyWildcard: PropTypes.string,
    dataFieldName: PropTypes.string,
    dataCounterFieldName: PropTypes.string,
    //
    showRecordsCounter: PropTypes.bool,
    showGlobalSearch: PropTypes.bool,
    showTableFooter: PropTypes.bool,
}
Table.defaultProps = {
    filterValueName: 'val',
    filterLabelName: 'lab',
    filterCheckedName: 'checked',
    emptyWildcard: '<пусто>',
    // format for fetching data from server: {[dataFieldName]: data, [dataCounterFieldName]: totalCountOfData}
    //totalCountOfData is used for pagination
    //if data is fetched as array (bare data) - pagination will be turned off
    dataFieldName: 'data',
    dataCounterFieldName: 'counter',
    //
    showRecordsCounter: true,
    showGlobalSearch: false,
    showTableFooter: true,
}
export default Table