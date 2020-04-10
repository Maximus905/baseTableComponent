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
 * @param {any} fetchFunction
 * @param {Object} filters - from reducer state
 * @param {Object} sorting - from reducer state
 * @param pagination
 * @param dataFieldName
 * @param dataCounterFieldName
 */
export const requestData = ({fetchFunction, filters, sorting, pagination, dataFieldName, dataCounterFieldName}) => ({type: REQUEST_DATA, payload: {fetchFunction, filters, sorting, pagination, dataFieldName, dataCounterFieldName}})
/**
 *
 * @param {Object}
 * @return {{type: string, payload: Object}}
 */
export const receiveData = ({data, recordsCounter, showPagination}) => ({type: RECEIVE_DATA, payload: {data, recordsCounter, showPagination}})
export const invalidateData = () => ({type: INVALIDATE_DATA})

export const loadingFilterList = (accessor) => ({type: LOADING_FILTER_LIST, payload: accessor})
export const requestFilterList = ({fetchFunction, filters, accessor}) => ({type: REQUEST_FILTER_LIST, payload: {fetchFunction, filters, accessor}})
export const receiveFilterList = ({accessor, data}) => ({type: RECEIVE_FILTER_LIST, payload: {accessor, data}})
export const invalidateFilterList = (accessor) => ({type: INVALIDATE_FILTER_LIST, payload: accessor})