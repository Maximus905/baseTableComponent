import React from 'react'
import ft from "../constants/filterTypes"
import {fetchTableData, fetchFilterList} from "../async"
import {Cell1} from "../customComponents/Cell1"

const config = {
    getTableData: fetchTableData,
    getFilterList: fetchFilterList,
    columns: [
        {
            accessor: 'column1',
            title: 'column 1',
            minWidth: 300,
            maxWidth: 450,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'column1',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            },
            renderCell: ({accessor, rowData, width, invalidateDataWithTimeout}) => <Cell1 {...{accessor, rowData, width, invalidateDataWithTimeout}} />
        },
        {
            accessor: 'column2',
            title: 'column 2',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            filterable: true
        }
    ]
}
export default config