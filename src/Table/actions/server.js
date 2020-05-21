import {
    LOADING_DATA,
    REQUEST_DATA,
    RECEIVE_DATA,
    INVALIDATE_DATA,
    LOADING_FILTER_LIST,
    REQUEST_FILTER_LIST,
    RECEIVE_FILTER_LIST,
    INVALIDATE_FILTER_LIST
} from '../constatnts/actions'

export const loadingData = () => ({type: LOADING_DATA})
/**
 *
 * @param url
 * @param {any} fetchFunction
 * @param {Object} filters - from reducer state
 * @param {Object} extFilters - from props
 * @param {Object} sorting - from reducer state
 * @param pagination
 * @param dataFieldName
 * @param dataCounterFieldName
 */
export const requestData = ({url, fetchFunction, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName, isTableMountedRef}) => ({type: REQUEST_DATA, payload: {url, fetchFunction, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName, isTableMountedRef}})
/**
 *
 * @param {Object}
 * @return {{type: string, payload: Object}}
 */
export const receiveData = ({data, recordsCounter, showPagination, showRecordsCounter, isTableMountedRef}) => ({type: RECEIVE_DATA, payload: {data, recordsCounter, showPagination, showRecordsCounter, isTableMountedRef}})
// export const invalidateData = () => ({type: INVALIDATE_DATA})

export const loadingFilterList = (accessor) => ({type: LOADING_FILTER_LIST, payload: accessor})
export const requestFilterList = ({url, fetchFunction, filters, extFilters, accessor, dataFieldName, isTableMountedRef}) => ({type: REQUEST_FILTER_LIST, payload: {url, fetchFunction, filters, extFilters, accessor, dataFieldName, isTableMountedRef}})
export const receiveFilterList = ({accessor, data, isTableMountedRef}) => ({type: RECEIVE_FILTER_LIST, payload: {accessor, data, isTableMountedRef}})
export const invalidateFilterList = (accessor) => ({type: INVALIDATE_FILTER_LIST, payload: accessor})