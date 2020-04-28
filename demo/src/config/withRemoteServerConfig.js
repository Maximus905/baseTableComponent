import ft from "../constants/filterTypes"
import {fetchTableData, fetchFilterList} from "../async";
import {TextEditor, DropdownEditor} from "../../../src/Table";

const config = {
    // tableDataLoader: fetchTableData,
    // filterDataLoader: fetchFilterList,
    tableDataUrl: 'http://netcmdb-loc.rs.ru:8082/api/tableData.json',
    filterDataUrl: 'http://netcmdb-loc.rs.ru:8082/api/tableFilterList.json',
    saveChangesUrl: 'http://netcmdb-loc.rs.ru:8082/test/mockingSaveChanges.json',
    columns: [
        {
            accessor: 'office',
            title: 'office name',
            minWidth: 300,
            maxWidth: 450,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'office',
                type: 'LIST',
                allowedTypes: [ft.EQ.value, ft.LIST.value]
            },
            editable: true,
            editor: TextEditor
        },
        {
            accessor: 'city',
            title: 'city not filterable',
            minWidth: 400,
            maxWidth: 500,
            sortable: true,
            // filterable: true,
            editable: true,
            editor: DropdownEditor
        }
    ]
}
export default config