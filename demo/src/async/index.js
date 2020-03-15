const tableData = () => Array.from(Array(2), () => 0).map((value, index) => ({id: index, column1: `col 1 - data ${index}`, column2: `col 2 - data ${index}`}))
const filterList = (accessor) => {
    switch (accessor) {
        case 'column1':
            return tableData().map(item => item.column1)
        case 'column2':
            return tableData().map(item => item.column2)
    }
}
export async function fetchTableData() {
    const data = tableData()
    console.log('table data', data)
    return new Promise(resolve => {
        setTimeout(() => resolve(data), 500)
    })
}
export async function fetchFilterList({accessor, filters}) {
    const list = filterList(accessor)
    console.log('filter list: ', list)
    return new Promise(resolve => {
        setTimeout(() => resolve(list), 500)
    })
}