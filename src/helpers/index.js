import {
    tableSettingsTemplate,
    oneColumnSettingsTemplate,
    oneFilterSettingsTemplate,
    emptyTextFilterTemplate,
    initialState,
    emptyListFilterTemplate,
    paginationSettingsTemplate
} from "../constatnts/initial"
import filterTypes from "../constatnts/filterTypes";
export * from './sortingHandler'
export * from './filterHandlers'
export * from './pagination'
/**
 * @param props
 */
export const tableSettingsFromProps = ({table}) => {
    const {renderRow, renderHeaderRow, ...restTabSettings} = table || {}
    return table ? {...tableSettingsTemplate, ...restTabSettings} : {...tableSettingsTemplate}
}
/**
 * @param props
 */
export const columnsSettingsFromProps = ({columns}) => (columns ?
    columns.reduce((acc, settings) => {
        const {renderCell, renderHeaderCell, filter, ...restSettings} = settings
        acc[restSettings.accessor] = {...oneColumnSettingsTemplate, ...restSettings, width: restSettings.minWidth ? restSettings.minWidth : oneColumnSettingsTemplate.minWidth}
        return acc
    }, {})
    : {})
export const renderCellFunctionsFromProps = ({columns}) => (columns ?
    columns.reduce((acc, settings) => {
        const {renderCell, accessor} = settings
        acc[accessor] = renderCell
        return acc
    }, {})
    : {})
export const renderHeaderCellFunctionsFromProps = ({columns}) => (columns ?
    columns.reduce((acc, settings) => {
        const {renderHeaderCell, accessor} = settings
        acc[accessor] = renderHeaderCell
        return acc
    }, {})
    : {})
/**
 *
 * @param props
 * @return {Array}
 */
export const visibleColumnsOrderFromProps = ({columns}) => (columns ? columns.reduce((acc, settings) => {
        if ({...oneColumnSettingsTemplate, ...settings}.isVisible) acc.push(settings.accessor)
        return acc
    }, []) : []
)

/**
 * filtersSettings is built for all columns (not for only visible)
 * @param props
 * @return {{}} object of settings for filterable columns
 */
export const filtersSettingsFromProps = ({columns}) => (columns ?
        columns.reduce((acc, settings) => {
        const {accessor, filterable, filter} = settings
        if (filterable) acc[accessor] = {...oneFilterSettingsTemplate, filterBy: accessor, ...filter}
        return acc
    }, {})
    : {}
)
/**
 * @param props
 * @return {*}
 */
export const initialEmptyFiltersFromProps = ({columns}) => (
    columns.reduce((acc, colSettings) => {
        const {accessor, filterable, filter} = colSettings
        const filterSettings = {...oneFilterSettingsTemplate, filterBy: accessor, ...filter}
        if (!filterable) return acc
        // console.log('fs', filterSettings)
        if (filterSettings.type === filterTypes.LIST.value) {
            acc[accessor] = {
                ...emptyListFilterTemplate,
                filterBy: filterSettings.filterBy,
                type: filterSettings.type,
                didInvalidate:  !!filterTypes[filterSettings.type].loadFromServer
            }
        } else {
            acc[accessor] = {
                ...emptyTextFilterTemplate,
                filterBy: filterSettings.filterBy,
                type: filterSettings.type,
                didInvalidate:  !!filterTypes[filterSettings.type].loadFromServer
            }
        }
        // console.log('acc', acc)
        return acc
    }, {})
)
export const initialPaginationSettings = () => ({
    ...paginationSettingsTemplate
})
export const iniReducerState = props => {
    return {
        ...initialState,
        showRecordsCounter: props.showRecordsCounter,
        showGlobalSearch: props.showGlobalSearch,
        showTableFooter: props.showTableFooter,
        filters: initialEmptyFiltersFromProps(props),
        tableSettings: tableSettingsFromProps(props),
        columnsSettings: columnsSettingsFromProps(props),
        visibleColumnsOrder: visibleColumnsOrderFromProps(props),
        filtersSettings: filtersSettingsFromProps(props),
        pagination: initialPaginationSettings(),
        custom: props.custom ? props.custom : {}
    }
}
/**
 * @param {{tBoxWidth: number, vScroll: number, columnsSettings: Object}}
 * @return {Object} an object with calculated width values like {accessor: value}
 */
export const calculateColumnsDim = ({tBoxWidth, vScroll, columnsSettings}) => {
    const columns = Object.values(columnsSettings).map(col => ({...col, width: col.minWidth}))
    const getFreeSpace = () => {
        const res = tBoxWidth - vScroll - columns.reduce((sum, column) => sum + column.width, 0)
        return  res > 0 ? res : 0
    }
    const getSpacePerColumn = () => {
        const freeSpace = getFreeSpace()
        const columnsForResizing = columns.reduce((count, column) =>  column.isVisible && column.width < column.maxWidth ? count + 1 : count, 0)
        return columnsForResizing === 0 || freeSpace === 0 ? 0 : freeSpace/columnsForResizing
    }
    let spaceForOne = getSpacePerColumn()

    while (spaceForOne > 0) {
        for (const col of columns) {
            col.width = col.width + spaceForOne <= col.maxWidth ? col.width + spaceForOne : col.maxWidth
        }
        spaceForOne = getSpacePerColumn()
    }
    columns[0].width = columns[0].width - 1
    return columns.reduce((res, col) => {
        res[col.accessor] = {width: col.width}
        return res
    }, {})
}
/**
 * sum all width for visible columns. Scroll size is not considered
 * @param {Object} state
 * @return {*}
 */
export const tableWidth = ({columnsSettings}) => Object.values(columnsSettings).reduce((acc, column) => column.isVisible ? acc + column.width : acc, 0)
