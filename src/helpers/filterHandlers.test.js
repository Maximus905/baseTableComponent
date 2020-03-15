import ft from "../constatnts/filterTypes"
import {
    filtersSettings_changeFilterType,
    filters_changeFilterType,
    filters_changeValue,
    app_changeFilter,
    app_filters_setFilterInLoadingState, app_filters_receiveFilterList, app_convertFilters
} from './filterHandlers'
import {
    TIMEOUT_CHANGE_FILTER_TYPE,
    TIMEOUT_CHANGE_LIST_FILTER_VALUE,
    TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE
} from "../constatnts/timeouts";

const getFiltersSettings = () => ({
    column1: {
        filterBy: 'column1',
        type: ft.EQ.value,
        allowedTypes: [ft.EQ.value, ft.LIST.value]
    },
    column2: {
        filterBy: 'column2',
        type: ft.LIST.value,
        allowedTypes: [ft.EQ.value, ft.LIST.value]
    },
})
const getFilterSettings = (filterBy, type, allowedTypes) => ({filterBy, type, allowedTypes})
const getTextFilterState = (filterBy, type, value, didInvalidate) => ({filterBy, type, value, didInvalidate})
const getListFilterState = (filterBy, type, selectAllState, value, list, didInvalidate, isLoading = false) => ({filterBy, type, selectAllState, value, list, didInvalidate, isLoading})
const getConvertedFilter = (filterBy, type, value, removeEmpty = undefined, addEmpty = undefined) => {
    const resFilter = {
        filterBy,
        type,
        value
    }
    if (removeEmpty !== undefined) resFilter.removeEmpty = removeEmpty
    if (addEmpty !== undefined) resFilter.addEmpty = addEmpty
    return resFilter
}
const getPaginationState = (recordsCounter = 300, currentPage = 2, rowsOnPage = 100, rowsOnPageList = [100, 300, 500, 1000], totalPages = 3) => ({
    recordsCounter, currentPage, rowsOnPage, rowsOnPageList, totalPages,
})

const getPartialStateWithFilters = (filters, filtersSettings, didInvalidate, pagination, invalidateWithDelay = false, data=[], sorting=[]) => ({
    filters,
    filtersSettings,
    didInvalidate,
    data,
    sorting,
    pagination
})

test('filtersSettings, change filter type  EQ -> NE', () => {
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let res = {
        c1: getFilterSettings('c1', 'NE', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    const accessor = 'c1'
    expect(filtersSettings_changeFilterType({filtersSettings, accessor, type: ft.NE.value})).toEqual(res)
})
test('filtersSettings, change filter type EQ -> LIST', () => {
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    const accessor = 'c1'
    const res = {
        c1: getFilterSettings('c1', 'LIST', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    expect(filtersSettings_changeFilterType({filtersSettings, accessor, type: ft.LIST.value})).toEqual(res)
})
test('filters, change filter type EQ -> NE. Not empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_changeFilterType({filters: filters, accessor: 'c1', type: ft.NE.value})).toEqual(result)
})
test('filters, change filter type EQ -> NE. Empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let realResult = filters_changeFilterType({filters: filters, accessor: 'c1', type: ft.NE.value})
    expect(realResult).toEqual(result)
    expect(realResult['c1'].value === filters['c1'].value).toBeTruthy()
})
test('filters, change filter type EQ -> LIST. Not empty value in EQ', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c1', 'LIST', true,[], [], true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_changeFilterType({filters: filters, accessor: 'c1', type: ft.LIST.value})).toEqual(result)
})
test('filters, change value, EQ type of filter', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getTextFilterState('c1', 'EQ', ['newValue'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_changeValue({filters: filters, accessor: 'c1', value: ['newValue'], selectAllState: false})).toEqual(result)
})
test('filters, change value, LIST type of filter', () => {
    let filters = {
        c1: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let result = {
        c1: getListFilterState('c2', 'LIST', false, ['newValue'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    expect(filters_changeValue({filters: filters, accessor: 'c1', value: ['newValue'], selectAllState: false})).toEqual(result)
})
//app_changeFilter
test('app, change filter, change type EQ -> NE, not empty value', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    let filtersSettingsResult = {
        c1: getFilterSettings('c1', 'NE', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['v1'],
        type: 'NE',
        selectAllState: true,
    })
    expect(realResult.filtersSettings).toEqual(filtersSettingsResult)
    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.invalidateWithDelay).toBe(TIMEOUT_CHANGE_FILTER_TYPE)
})
test('app, change filter, change type EQ -> NE, empty value', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getTextFilterState('c1', 'NE', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettingsResult = {
        c1: getFilterSettings('c1', 'NE', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['v1'],
        type: 'NE',
        selectAllState: true})
    expect(realResult.filtersSettings).toEqual(filtersSettingsResult)
    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.invalidateWithDelay).toBeUndefined()
})
test('app, change filter, change type EQ -> LIST, not empty value', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', ['v1', 'v2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getListFilterState('c1', 'LIST', true, [], [], true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    let filtersSettingsResult = {
        c1: getFilterSettings('c1', 'LIST', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['v1'],
        type: 'LIST',
        selectAllState: true})
    expect(realResult.filtersSettings).toEqual(filtersSettingsResult)
    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.invalidateWithDelay).toBe(TIMEOUT_CHANGE_FILTER_TYPE)
})
test('app, change filter, change type EQ -> LIST, empty value', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getListFilterState('c1', 'LIST', true, [], [], true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettingsResult = {
        c1: getFilterSettings('c1', 'LIST', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }
    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['v1'],
        type: 'LIST',
        selectAllState: true})
    expect(realResult.filtersSettings).toEqual(filtersSettingsResult)
    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.invalidateWithDelay).toBeUndefined()
})
test('app, change filter, EQ filter, change value', () => {
    let filters = {
        c1: getTextFilterState('c1', 'EQ', [], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'EQ', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getTextFilterState('c1', 'EQ', ['newValue'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }

    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['newValue'],
        type: 'EQ',
        selectAllState: true})

    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.didInvalidate).toBeUndefined()
    expect(realResult.filtersSettings).toBeUndefined()
    expect(realResult.invalidateWithDelay).toBe(TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE)
})
test('app, change filter, LIST filter, change value', () => {
    let filters = {
        c1: getListFilterState('c2', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    let filtersSettings = {
        c1: getFilterSettings('c1', 'LIST', ['EQ', 'LIST']),
        c2: getFilterSettings('c2', 'LIST', ['EQ', 'LIST'])
    }

    let filtersResult = {
        c1: getListFilterState('c2', 'LIST', true, ['newValue'], ['l1', 'l2'], false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], true)
    }
    let realResult = app_changeFilter({
        state: getPartialStateWithFilters(filters, filtersSettings, false, getPaginationState()),
        accessor: 'c1',
        value: ['newValue'],
        type: 'LIST',
        selectAllState: true})
    expect(realResult.filters).toEqual(filtersResult)
    expect(realResult.didInvalidate).toBeUndefined()
    expect(realResult.filtersSettings).toBeUndefined()
    expect(realResult.invalidateWithDelay).toBe(TIMEOUT_CHANGE_LIST_FILTER_VALUE)
})
test('app, set LIST filter in loading state', () => {
    const filters = {
        c1: getListFilterState('c2', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], true, false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    const filtersResult = {
        c1: getListFilterState('c2', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false, true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    const realResult = app_filters_setFilterInLoadingState({filters, accessor: 'c1'})
    expect(realResult).toEqual(filtersResult)
})
test('app, receive data for LIST filter', () => {
    const data = ['new l1', 'new l2']
    const filters = {
        c1: getListFilterState('c2', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false, true),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    const filtersResult = {
        c1: getListFilterState('c2', 'LIST', true, ['v1', 'v2'], data, false, false),
        c2: getListFilterState('c2', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false)
    }
    const realResult = app_filters_receiveFilterList({filters, accessor: 'c1', data})
    expect(realResult).toEqual(filtersResult)
})
//app converting filters for request
test('app, convert filters for sending to server. LIST filters, selectAll, no empty value', () => {
    const filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2'], ['l1', 'l2'], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'NOT_IN_LIST', ['v1', 'v2'], false)}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
test('app, convert filters for sending to server. LIST filters, selectAll, empty value', () => {
    const filters = {
        c1: getListFilterState('c1', 'LIST', true, ['v1', 'v2', '<empty>'], ['l1', 'l2'], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'NOT_IN_LIST', ['v1', 'v2'], true)}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
test('app, convert filters for sending to server. LIST filters, no selectAll, no empty value', () => {
    const filters = {
        c1: getListFilterState('c1', 'LIST', false, ['v1', 'v2'], ['l1', 'l2'], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'IN_LIST', ['v1', 'v2'], undefined, false)}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
test('app, convert filters for sending to server. LIST filters, no selectAll, empty value', () => {
    const filters = {
        c1: getListFilterState('c1', 'LIST', false, ['v1', 'v2', '<empty>'], ['l1', 'l2'], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'IN_LIST', ['v1', 'v2'], undefined, true)}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
test('app, convert filters for sending to server. EQ filters', () => {
    const filters = {
        c1: getListFilterState('c1', 'EQ', false, ['v1'], [], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'EQ', ['v1'])}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
test('app, convert filters for sending to server. STARTING filters', () => {
    const filters = {
        c1: getListFilterState('c1', 'STARTING', false, ['v1'], [], false, false)
    }
    const convertedFilters = {c1: getConvertedFilter('c1', 'STARTING', ['v1'])}
    const realResult = app_convertFilters({filters, emptyWildcard: '<empty>'})
    expect(realResult).toEqual(convertedFilters)

})
