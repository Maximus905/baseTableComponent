import ft from "../constants/filterTypes"
import {fetchTableData, fetchFilterList} from "../async";

const config = {
    tableDataLoader: fetchTableData,
    filterDataLoader: fetchFilterList,
    saveChangesUrl: 'http://netcmdb-loc.rs.ru:8082/test/errorCode.json',
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
            title: 'column 2 not filterable',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            // filterable: true
        }
    ]
}
export default config