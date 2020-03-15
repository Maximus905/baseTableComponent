import check from 'check-types'
import {
    CTRL_DOWN, CTRL_UP,
    PAGE_RESIZING,
    SET_SCROLL_SIZES,
    TABLE_RESIZING,
    SET_SORTING,
    ADD_SORTING,
    INVALIDATE_DATA,
    RESET_INVALIDATE_DELAY,
    LOADING_DATA, REQUEST_DATA, RECEIVE_DATA,
    CHANGE_FILTER,
    LOADING_FILTER_LIST, REQUEST_FILTER_LIST, RECEIVE_FILTER_LIST,
    FIRST_PAGE, LAST_PAGE, NEXT_PAGE, PREV_PAGE,
    CHANGE_ROWS_ON_PAGE
} from "../constatnts/actions";
import {
    calculateColumnsDim,
    tableWidth,
    changeSorting,
    app_changeFilter, app_filters_setFilterInLoadingState, app_filters_receiveFilterList, app_updatePagination
} from "../helpers";

// import {changeSorting} from "../helpers/sortingHandler";
import {loadingData, receiveData, loadingFilterList, receiveFilterList} from "../actions";
import {
    TIMEOUT_CHANGE_PAGE_IN_PAGINATION,
    TIMEOUT_CHANGE_ROWS_ON_PAGE,
    TIMEOUT_CHANGE_SORTING
} from "../constatnts/timeouts";

/**
 * using for dispatching async actions like request data from server
 * @param dispatch
 * @return {Function}
 */
export function dispatchMiddleware(dispatch) {
    async function getData({dispatch, fetchFunction, filters, sorting, pagination, dataFieldName, dataCounterFieldName}) {
        dispatch(loadingData())
        try {
            const data = await fetchFunction({filters, sorting, pagination})
            if (check.array(data)) {
                dispatch(receiveData({data: data, recordsCounter: data.length, showPagination: false}))
            } else if (check.object(data) && check.array(data[dataFieldName])) {
                dispatch(receiveData({
                    data: data[dataFieldName],
                    recordsCounter: check.number(data[dataCounterFieldName]) ? data[dataCounterFieldName] : null,
                    showPagination: check.number(data[dataCounterFieldName])
                }))
            } else {
                console.log('Table: Invalid format of fetched data: ', data, dataFieldName, dataCounterFieldName, data[dataCounterFieldName] )
                throw  new Error('Table: Invalid format of fetched data from server!')
            }

        } catch (e) {
            alert(e.toString())
            dispatch(receiveData({data: [], recordsCounter: null, showPagination: false}))
        }
    }
    async function getFilterList({dispatch, fetchFunction, filters, accessor}) {
        dispatch(loadingFilterList(accessor))
        const tmp = Object.keys(filters).reduce((acc, key) => {
            if (key !==accessor) acc[key] = filters[key]
            return acc
        }, {})
        try {
            const data = await fetchFunction({accessor,filters: tmp})
            if (check.not.array(data)) {
                console.log('Table: Error fetching filter data: ', data)
                throw  new Error('Table: Error fetching filter data from server!')
            }
            dispatch(receiveFilterList({accessor, data}))
        } catch (e) {
            alert(e.toString())
            dispatch(receiveFilterList({accessor, data:[]}))
        }
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, filters, sorting, pagination, accessor, dataFieldName, dataCounterFieldName} = payload || {}
        switch (type) {
            case REQUEST_DATA:
                return getData({dispatch, fetchFunction, filters, sorting, pagination, dataFieldName, dataCounterFieldName})
            case REQUEST_FILTER_LIST:
                return getFilterList({dispatch, fetchFunction, filters, accessor})
            default:
                return dispatch(action)
        }
    }
}
export const rootReducer = (state, action) => {
    const {payload, type} = action
    const {dimensions, columnsSettings, sorting, filters, pagination, filtersSettings, didInvalidate} = state
    const newState = {}
    switch (type) {
        case CTRL_DOWN:
            return {...state, isCtrlPressed: true}
        case CTRL_UP:
            return {...state, isCtrlPressed: false}
        case SET_SCROLL_SIZES:
            const {vScroll, hScroll} = payload
            return {...state, dimensions: {...dimensions, vScroll, hScroll}}
        case PAGE_RESIZING:
            const {tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight} = payload
            return {...state, dimensions: {...dimensions, tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight}}
        case TABLE_RESIZING:
            const newDimensions = calculateColumnsDim({tBoxWidth: dimensions.tBoxWidth, vScroll: dimensions.vScroll, columnsSettings})
            const keys = Object.keys(newDimensions)
            const newColumnsSettings = {}
            Object.entries(columnsSettings).forEach(([accessor, settings]) => {
                newColumnsSettings[accessor] = keys.includes(accessor) ? {...settings, width: newDimensions[accessor].width} : settings
            })
            const newTableWidth = tableWidth({columnsSettings: newColumnsSettings})
            return {...state, dimensions: {...dimensions, tWidth: newTableWidth}, columnsSettings: newColumnsSettings}
        case SET_SORTING:
            return {...state, sorting: changeSorting({sorting, accessor: payload}), invalidateWithDelay: TIMEOUT_CHANGE_SORTING}
        case ADD_SORTING:
            return {...state, sorting: changeSorting({sorting, accessor: payload, appendMode: true}), invalidateWithDelay: TIMEOUT_CHANGE_SORTING}
// data handling
        case INVALIDATE_DATA:
            return {...state, didInvalidate: true, invalidateWithDelay: null}
        case RESET_INVALIDATE_DELAY:
            return {...state, invalidateWithDelay: false}
        case LOADING_DATA:
            return {...state, isLoading: true, didInvalidate: false}
        case RECEIVE_DATA:
            return {...state, isLoading: false, didInvalidate: false, data: payload.data, pagination: app_updatePagination({pagination, recordsCounter: payload.recordsCounter})}
        case CHANGE_FILTER:
            const result = {...state,
                ...app_changeFilter({state, accessor: payload.accessor, type: payload.type, value: payload.value, selectAllState: payload.selectAllState})
            }
            return result
        case LOADING_FILTER_LIST:
            return {...state, filters: app_filters_setFilterInLoadingState({filters: state.filters, accessor: payload})}
        case RECEIVE_FILTER_LIST:
            return {...state, filters: app_filters_receiveFilterList({filters: state.filters, accessor: payload.accessor, data: payload.data})}
        // pagination's actions
        case FIRST_PAGE:
            return {...state, pagination: {...pagination, currentPage: 1}, invalidateWithDelay: TIMEOUT_CHANGE_PAGE_IN_PAGINATION}
        case LAST_PAGE:
            return {...state, pagination: {...pagination, currentPage: pagination.totalPages}, invalidateWithDelay: TIMEOUT_CHANGE_PAGE_IN_PAGINATION}
        case NEXT_PAGE:
            return {...state, pagination: {...pagination, currentPage: pagination.currentPage + 1}, invalidateWithDelay: TIMEOUT_CHANGE_PAGE_IN_PAGINATION}
        case PREV_PAGE:
            return {...state, pagination: {...pagination, currentPage: pagination.currentPage - 1}, invalidateWithDelay: TIMEOUT_CHANGE_PAGE_IN_PAGINATION}
        case CHANGE_ROWS_ON_PAGE:
            return {...state, pagination:app_updatePagination({pagination, recordsCounter: pagination.recordsCounter, rowsOnPage: payload}), invalidateWithDelay: TIMEOUT_CHANGE_ROWS_ON_PAGE}
        default:
            return state
    }
}
