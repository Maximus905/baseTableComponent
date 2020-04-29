import filterTypes from "./filterTypes";
import {Map} from "immutable"

export const initialState = {
    data: [],
    sorting: [],
    filters: {},
    selectedCells: Map(), // like [rowId]: [accessors array] via immutable
    lastSelectedCell: {}, // like[rowId]: accessor
    cellsInEditMode: Map(), // like [rowId]: accessor
    isCtrlPressed: false,
    isLoading: false,
    isSaving: false, //should be set to true to prevent reload table data while changes is saving
    invalidateWithDelay: 200,
    didInvalidate: false,
    showPagination: true,
    showRecordsCounter: true,
    showGlobalSearch: false,
    showTableFooter: true,

    dimensions: {
        tWidth: 0,
        tBoxWidth: 0,
        tBoxHeight: 0,
        tBodyBoxWidth: 0,
        tBodyBoxHeight: 0,
        vScroll: 0,
        hScroll: 0
    },
    tableSettings: {},
    columnsSettings: {},
    visibleColumnsOrder: [],
    filtersSettings: {},
    custom: {}
}
export const tableSettingsTemplate = {
    width: 100,
    globalFilter: false,
    tableSmall: true,
    tableStriped: true,
    tableDark: false,
    tableBordered: true,
    tableBorderless: false,
    tableHover: true
}
export const oneColumnSettingsTemplate = {
    title: '',
    accessor: '',
    minWidth: 100,
    maxWidth: 900,
    isVisible: true,
    filterable: false,
    sortable: false,
    editable: false
}
export const oneFilterSettingsTemplate = {
    filterBy: '',
    type: filterTypes.EQ.value,
    allowedTypes: Object.values(filterTypes).map(item => item.value)
}
export const emptyTextFilterTemplate = {
    filterBy: '',
    value: [],
    type: '',
    // didInvalidate: false //calculated from filterType
}
export const emptyListFilterTemplate = {
    filterBy: '',
    value: [],
    selectAllState: true,
    list: [],
    type: '',
    isLoading: false,
    // didInvalidate: true //calculated from filterType
}
export const paginationSettingsTemplate = {
    recordsCounter: null,
    currentPage: 1,
    rowsOnPage: 100,
    rowsOnPageList: [100, 300, 500, 1000],
    totalPages: null,
}
