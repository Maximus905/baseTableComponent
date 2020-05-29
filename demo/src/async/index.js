const tableData = () => Array.from(Array(10), () => 0).map((value, index) => (
    {
        id: index,
        column1: `col 1 - data ${index} verylongstringverylongstringverylongstringverylongstringverylongstring`,
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
export async function fetchTableData({url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}) {
    const data = tableData()
    console.log('fetchTableData: ', {url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName, data})
    return new Promise(resolve => {
        setTimeout(() => resolve(data), 2000)
    })
}
//the same function without delay
export async function fetchTableData_noDelay({url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}) {
    const data = tableData()
    console.log('fetchTableData: ', {url, filters, sorting, pagination, dataFieldName, dataCounterFieldName})
    return new Promise(resolve => resolve(data))
}

//demo function of fetching filter data with delay
export async function fetchFilterList({url, filters, extFilters, accessor, dataFieldName}) {
    const list = filterList(accessor)
    console.log('fetchFilterList: ', {url, filters, extFilters, accessor, dataFieldName, list})
    return new Promise(resolve => {
        setTimeout(() => resolve(list), 2000)
    })
}
//the same function without delay
export async function fetchFilterList_noDelay({url, filters, accessor, dataFieldName}) {
    const list = filterList(accessor)
    console.log('fetchFilterList: ', {url, filters, accessor, dataFieldName, list})
    return new Promise(resolve => resolve(list))
}