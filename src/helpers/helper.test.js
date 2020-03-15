import ft from "../constatnts/filterTypes"
import {
    tableSettingsFromProps,
    columnsSettingsFromProps,
    filtersSettingsFromProps,
    initialEmptyFiltersFromProps,
    iniReducerState,
    calculateColumnsDim,
    tableWidth,
    visibleColumnsOrderFromProps,
    // filtersSettings_changeFilterType,
    // filters_changeFilterType, filters_changeValue
} from "./index"

const getConfig = () => ({
    getTableData: () => {},
    getFilterList: ({accessor, filters}) => {},
    table: {
        tableDark: true,
        tableSmall: true,
        tableBordered: true,
        renderRow: () => 'render row',
        renderHeaderRow: () => 'render header row'
    },
    columns: [
        {
            title: 'title 1',
            accessor: 'title_1',
            minWidth: 150,
            maxWidth: 200,
        },
        {
            title: 'title 2',
            accessor: 'title_2',
            minWidth: 200,
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
    ]
})
const getConfigWithListFilter = () => ({
    getTableData: () => {},
    getFilterList: ({accessor, filters}) => {},
    table: {
        tableDark: true,
        tableSmall: true,
        tableBordered: true,
        renderRow: () => 'render row',
        renderHeaderRow: () => 'render header row'
    },
    columns: [
        {
            title: 'title 1',
            accessor: 'title_1',
            minWidth: 150,
            maxWidth: 200,
        },
        {
            title: 'title 2',
            accessor: 'title_2',
            minWidth: 200,
            maxWidth: 300,
            filterable: true,
            filter: {
                filterBy: 'title_f_2',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            },
            renderCell: () => 'render cell',
            renderHeaderCell: () => 'render header cell'
        },
    ]
})


test('tableSettingsFromProps', () => {
    const config = getConfig()
    expect(tableSettingsFromProps(config)).toEqual(
        {
            width: 100,
            globalFilter: false,
            tableSmall: true,
            tableStriped: true,
            tableDark: true,
            tableBordered: true,
            tableBorderless: false,
            tableHover: true
        }
    )
    config.table.tableSmall = false
    expect(tableSettingsFromProps(config).tableSmall).toBeFalsy()
})
test('tableSettingsFromProps 2', () => {
    const {table, columns} = getConfig()
    const config = {columns}
    expect(tableSettingsFromProps(config)).toEqual(
        {
            width: 100,
            globalFilter: false,
            tableSmall: true,
            tableStriped: true,
            tableDark: true,
            tableBordered: true,
            tableBorderless: false,
            tableHover: true
        }
    )
})
test('columnsSettingsFromProps', () => {
    const config = getConfig()
    expect(columnsSettingsFromProps(config)).toEqual(
        {
            title_1: {
                title: 'title 1',
                accessor: 'title_1',
                width: 150,
                minWidth: 150,
                maxWidth: 200,
                isVisible: true,
                filterable: false,
                sortable: false,
            },
            title_2: {
                title: 'title 2',
                accessor: 'title_2',
                width: 200,
                minWidth: 200,
                maxWidth: 300,
                filterable: true,
                isVisible: true,
                sortable: false,
            },
        }
    )
})
test('visibleColumnsOrderFromProps', () => {
    const config = getConfig()
    expect(visibleColumnsOrderFromProps(config)).toEqual(['title_1', 'title_2'])
    config.columns[1].isVisible = false
    expect(visibleColumnsOrderFromProps(config)).toEqual(['title_1'])
})

test('filtersSettingsFromProps', () => {
    const config = getConfig()
    expect(filtersSettingsFromProps(config)).toEqual({
        title_2: {
            filterBy: 'title_f_2',
            type: 'EQ',
            allowedTypes: [ft.EQ.value, ft.LIST.value]
        }
    })
    config.columns[0].filterable = true
    config.columns[1].filterable = false
    expect(filtersSettingsFromProps(config)).toEqual({
        title_1: {
            filterBy: 'title_1',
            type: ft.EQ.value,
            allowedTypes: Object.values(ft).map(item => item.value)
        }
    })
})
test('initialEmptyFiltersFromProps - EQ filter', () => {
    const config = getConfig()
    expect(initialEmptyFiltersFromProps(config)).toEqual({
        title_2: {
            filterBy: 'title_f_2',
            value: [],
            type: ft.EQ.value,
            didInvalidate: false
        }
    })
})
test('initialEmptyFiltersFromProps - LIST filter', () => {
    const config = getConfigWithListFilter()

    expect(initialEmptyFiltersFromProps(config)).toEqual({
        title_2: {
            filterBy: 'title_f_2',
            value: [],
            selectAllState: true,
            type: ft.LIST.value,
            list: [],
            isLoading: false,
            didInvalidate: true
        }
    })
})
test('calculateColumnsDim min sizes', () => {
    const props = getConfig()
    const {columnsSettings} = iniReducerState(props)
    let dimensions = calculateColumnsDim({tBoxWidth: 350, vScroll: 0, columnsSettings})
    expect(Object.keys(dimensions).length).toBe(2)
    expect(dimensions).toEqual({
        title_1: {
            width: 149,
        },
        title_2: {
            width: 200,
        },
    })
})
test('calculateColumnsDim max sizes', () => {
    // const props = getConfig()
    // const state = iniReducerState(props)
    // state.dimensions.tBoxWidth = 500
    // let dimensions = calculateColumnsDim(state)

    const props = getConfig()
    const {columnsSettings} = iniReducerState(props)
    let dimensions = calculateColumnsDim({tBoxWidth: 500, vScroll: 0, columnsSettings})
    expect(Object.keys(dimensions).length).toBe(2)
    expect(dimensions).toEqual({
        title_1: {
            width: 199,
        },
        title_2: {
            width: 300,
        },
    })
})
test('calculateColumnsDim middle sizes', () => {
    const props = getConfig()
    const {columnsSettings} = iniReducerState(props)
    let dimensions = calculateColumnsDim({tBoxWidth: 400, vScroll: 0, columnsSettings})
    expect(Object.keys(dimensions).length).toBe(2)
    expect(dimensions).toEqual({
        title_1: {
            width: 174,
        },
        title_2: {
            width: 225,
        },
    })
})
test('tableWidth', () => {
    const state = iniReducerState(getConfig())
    expect(tableWidth(state)).toBe(350)
})
