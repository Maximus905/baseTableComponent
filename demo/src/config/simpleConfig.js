import ft from "../constants/filterTypes"
import {fetchTableData, fetchFilterList} from "../async";

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
            }
        },
        {
            accessor: 'column2',
            title: 'column 2',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            // filterable: true
        }
    ]
}
export default config