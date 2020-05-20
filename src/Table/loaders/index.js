import axios from 'axios'

export const defaultTableDataLoader = async ({url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}) => {
    try {
        const res = await axios.get(url, {
            params: {filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}
        })
        if (res.status !== 200 || !Array.isArray(res.data[dataFieldName])) {
            console.log('Error fetching data from server: ', res)
            throw new Error('Error fetching data from server')
        }
        return res.data
    } catch (e) {
        alert(e.toString())
        return []
    }
}
export const defaultFilterDataLoader = async ({url, filters, extFilters, accessor, dataFieldName}) => {
    try {
        const res = await axios.get(url, {
            params: {accessor, filters, extFilters, dataFieldName}
        })
        if (res.status !== 200 || !Array.isArray(res.data[dataFieldName])) {
            console.log('invalid data from server: ', res)
            throw new Error('Error fetching filter list from server')
        }
        return res.data[dataFieldName]
    } catch (e) {
        alert(e.toString())
        return []
    }
}