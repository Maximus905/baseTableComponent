import filterTypes from "../constatnts/filterTypes";
import {emptyListFilterTemplate, emptyTextFilterTemplate} from "../constatnts/initial";
import {
    TIMEOUT_CHANGE_FILTER_TYPE,
    TIMEOUT_CHANGE_LIST_FILTER_VALUE,
    TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE
} from "../constatnts/timeouts";
import {app_updatePagination} from "./pagination";

export const filtersSettings_changeFilterType = ({filtersSettings, accessor, type}) => ({...filtersSettings, [accessor]: {...filtersSettings[accessor], type}})
const oneFilter_changeFilterType = ({filter, type, value}) => (
    (type === filterTypes.LIST.value) ? ({
        ...emptyListFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value,
        didInvalidate:  !!filterTypes[type].loadFromServer
    }) : ({
        ...emptyTextFilterTemplate,
        filterBy: filter.filterBy,
        type,
        value,
        didInvalidate:  !!filterTypes[type].loadFromServer
    })
)
export const filters_changeFilterType = ({filters, accessor, type}) => {
    const currentValue = filters[accessor].value
    const isCurrentValueEmpty = !currentValue.length
    return Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = key === accessor ?
            oneFilter_changeFilterType({type, filter, value: isCurrentValueEmpty ? currentValue : []}) :
            (filterTypes[filter.type].loadFromServer && !isCurrentValueEmpty ? {...filter, didInvalidate: true} : filter)
        return res
    }, {})
}
export const filters_changeValue = ({filters, accessor, value, selectAllState}) => {

    const filterType = filters[accessor].type
    if (filterType === filterTypes.LIST.value) {
        return Object.entries(filters).reduce((res, [key, filter]) => {
            res[key] = key === accessor ? {
                ...filter,
                value,
                selectAllState
            } : (
                filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
            )
            return res
        }, {})
    } else {
        return Object.entries(filters).reduce((res, [key, filter]) => {
            res[key] = key === accessor ? {
                ...filter,
                value,
            } : (
                filterTypes[filter.type].loadFromServer ? {...filter, didInvalidate: true} : filter
            )
            return res
        }, {})
    }

}
export const app_changeFilter = ({state, accessor, type, value, selectAllState}) => {
    const currentFilter = state.filters[accessor]

    const typeIsChanged = currentFilter.type !== type
    const isCurrentValueEmpty = currentFilter.type === filterTypes.LIST.value ? (!currentFilter.value.length && selectAllState) : !currentFilter.value.length

    const newState = {}
    if (typeIsChanged) {
        newState.filtersSettings = filtersSettings_changeFilterType({filtersSettings: state.filtersSettings, type, accessor})
        newState.filters = filters_changeFilterType({filters: state.filters, accessor, type})
        if (!isCurrentValueEmpty) {
            newState.invalidateWithDelay = TIMEOUT_CHANGE_FILTER_TYPE
            newState.pagination = app_updatePagination({pagination: state.pagination, recordsCounter: null})
        }
    } else {
        newState.filters = filters_changeValue({filters: state.filters, accessor, value, selectAllState})
        newState.pagination = app_updatePagination({pagination: state.pagination, recordsCounter: null})
        newState.invalidateWithDelay = type === filterTypes.LIST.value ? TIMEOUT_CHANGE_LIST_FILTER_VALUE : TIMEOUT_CHANGE_SIMPLE_SEARCH_VALUE
    }
    return newState
}
export const app_filters_setFilterInLoadingState = ({filters, accessor}) => (
    Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = (key === accessor && filter.type === filterTypes.LIST.value) ?
            {...filter, isLoading: true, didInvalidate: false} :
            filter
        return res
    }, {})
)
export const app_filters_receiveFilterList = ({filters, accessor, data}) => (
    Object.entries(filters).reduce((res, [key, filter]) => {
        res[key] = (key === accessor && filter.type === filterTypes.LIST.value) ?
            {...filter, list: data, isLoading: false, didInvalidate: false} :
            filter
        return res
    }, {})
)
export const app_convertFilters = ({filters, emptyWildcard}) => {
    const res = Object.entries(filters).reduce((acc, [key, filter]) => {
        const {filterBy, type, value, selectAllState} = filter

        switch (type) {
            case filterTypes.LIST.value:
                if (!selectAllState || value.length > 0) {
                    acc[key] = {}
                    if (selectAllState) {
                        acc[key].filterBy = filterBy
                        acc[key].type = 'NOT_IN_LIST'
                        acc[key].removeEmpty = value.includes(emptyWildcard)
                        acc[key].value = value.filter(item => item !== emptyWildcard)
                    } else {
                        acc[key].filterBy = filterBy
                        acc[key].type = 'IN_LIST'
                        acc[key].addEmpty = value.includes(emptyWildcard)
                        acc[key].value = value.filter(item => item !== emptyWildcard)
                    }
                }
                break
            case filterTypes.EQ.value:
            case filterTypes.NE.value:
            case filterTypes.LT.value:
            case filterTypes.LE.value:
            case filterTypes.GT.value:
            case filterTypes.GE.value:
            case filterTypes.STARTING.value:
            case filterTypes.ENDING.value:
            case filterTypes.INCLUDING.value:
                if (value[0]) {
                    acc[key] = {}
                    acc[key].filterBy = filterBy
                    acc[key].type = type
                    // acc[key].addEmpty = false
                    acc[key].value = value
                }
                break
            default:
                acc[key].filterBy = filterBy
                acc[key].type = type
                // acc[key].addEmpty = false
                acc[key].value = value
        }
        return acc
    }, {})
    return res
}
