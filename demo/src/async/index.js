const tableData = () => Array.from(Array(10), () => 0).map((value, index) => (
    {
        id: index,
        column1: `col 1 - data ${index}`,
        column2: `col 2 - data ${index}`,
        column3: `col 3 - data ${index}`,
        column4: `col 4 - data ${index}`,
    }))
const filterList = (accessor) => {
    switch (accessor) {
        case 'column1':
            const array = tableData().map(item => item.column1)
            array.push(true)
            array.push(false)
            array.push(null)
            array.push('')
            return array
        case 'column2':
            return tableData().map(item => item.column2)
    }
}
//demo function of fetching table data with delay
export async function fetchTableData({filters, sorting, pagination}) {
    const data = tableData()
    console.log('table data', filters, sorting, pagination)
    return new Promise(resolve => {
        setTimeout(() => resolve(data), 500)
    })
}
//the same function without delay
export async function fetchTableData_noDelay({filters, sorting, pagination}) {
    const data = tableData()
    console.log('fetchTableData', filters, sorting, pagination)
    return new Promise(resolve => resolve(data))
}

//demo function of fetching filter data with delay
export async function fetchFilterList({accessor, filters}) {
    const list = filterList(accessor)
    console.log('fetchFilterList: ', list)
    return new Promise(resolve => {
        setTimeout(() => resolve(list), 500)
    })
}
//the same function without delay
export async function fetchFilterList_noDelay({accessor, filters}) {
    const list = filterList(accessor)
    console.log('filter list: ', list)
    return new Promise(resolve => resolve(list))
}