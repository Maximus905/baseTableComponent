import ft from "../constatnts/filterTypes"
import {tableSettingsFromProps, columnsSettingsFromProps, sortingFromProps, filtersSettingsFromProps, initialEmptyFiltersFromProps, iniReducerState} from "./index"

const getConfig = () => ({
    getTableData: () => {},
    getFilterList: ({accessor, filters}) => {},
    table: {
        tableDark: false,
        tableSmall: true,
        tableBordered: true,
        renderRow: () => 'render row',
        renderHeaderRow: () => 'render header row'
    },
    columns: [
        {
            title: 'title 1',
            accessor: 'title_1',
            minWidth: 100,
            maxWidth: 200,
        },
        {
            title: 'title 2',
            accessor: 'title_2',
            minWidth: 100,
            maxWidth: 300,
            filterable: true,
            filter: {
                filterBy: 'title_f_2',
                type: 'EQ',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            },
            renderCell: () => 'render cell',
            renderHeaderCell: () => 'render header cell'
        },
    ],
    custom: {
        custom_1: 'value 1',
        custom_2: 'value 2'
    },
    showRecordsCounter: false,
    showGlobalSearch: true,
    showTableFooter: false,
})

const result = {
    data: [],
    sorting: [],
    filters: {
        title_2: {
            filterBy: 'title_f_2',
            type: 'EQ',
            value: [],
            didInvalidate: false
        }
    },
    isCtrlPressed: false,
    isLoading: false,
    invalidateWithDelay: 200,
    didInvalidate: false,

    showPagination: true,
    showRecordsCounter: false,
    showGlobalSearch: true,
    showTableFooter: false,

    dimensions: {
        tWidth: 0,
        tBoxWidth: 0,
        tBoxHeight: 0,
        tBodyBoxWidth: 0,
        tBodyBoxHeight: 0,
        vScroll: 0,
        hScroll: 0
    },

    tableSettings: {
        width: 100,
        globalFilter: false,
        tableSmall: true,
        tableStriped: true,
        tableDark: false,
        tableBordered: true,
        tableBorderless: false,
        tableHover: true
    },
    columnsSettings: {
        title_1: {
            title: 'title 1',
            accessor: 'title_1',
            width: 100,
            minWidth: 100,
            maxWidth: 200,
            isVisible: true,
            filterable: false,
            sortable: false,
        },
        title_2: {
            title: 'title 2',
            accessor: 'title_2',
            width: 100,
            minWidth: 100,
            maxWidth: 300,
            filterable: true,
            isVisible: true,
            sortable: false,
        },
    },
    visibleColumnsOrder: ['title_1', 'title_2'],
    filtersSettings: {
        title_2: {
            filterBy: 'title_f_2',
            type: 'EQ',
            allowedTypes: [ft.EQ.value, ft.LIST.value]
        }
    },
    pagination: {
        recordsCounter: null,
        currentPage: 1,
        rowsOnPage: 100,
        rowsOnPageList: [100, 300, 500, 1000],
        totalPages: null,
    },
    custom: {
        custom_1: 'value 1',
        custom_2: 'value 2'
    }
}

test('initial state for reducer', () => {
    const config = getConfig()
    expect(iniReducerState(config)).toEqual(result)
})