import check from "check-types";

export const reopenFilterSetter = ({reopen, isOpened}) => {
    if (!reopen && isOpened) {
        return {reopen: true, isOpened: false}
    } else if (reopen && !isOpened){
        return {reopen: false, isOpened: true}
    }
}

// function for convert input data of filter list into format {value, label, checked}
function createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue}) {
    let value
    let label
    const resMap = data.reduce((acc, item) => {
        //check value
        if (item[valueFieldName] === '' || item[valueFieldName] === null || item[valueFieldName] === undefined) {
            value = emptyValueWildcard
        } else {
            value = item[valueFieldName]
        }
        //check label
        if (item[labelFieldName] === '' || item[labelFieldName] === null || item[labelFieldName] === undefined) {
            label = emptyWildcard
        } else if (item[labelFieldName] === true) {
            label = trueWildcard
        } else if (item[labelFieldName] === false) {
            label = falseWildcard
        } else {
            label = item[labelFieldName]
        }
        //create record in Map
        return acc.set(value, {value, label, checked: filterValue.includes(value) ? !selectAllState : selectAllState})
    }, new Map())
    return Array.from(resMap.values())
    // return data.map(item => {
    //     return  item[labelFieldName]
    //         ? {value: item[valueFieldName], label: item[labelFieldName], checked: filterValue.includes(item[valueFieldName]) ? !selectAllState : selectAllState}
    //         : {value: item[valueFieldName], label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAllState : selectAllState}
    // })
}
// function src_createListFromArray({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems = []}) {
//     const resMap = data.reduce((acc, item) => {
//         if (item === true) {
//             return acc.set(item, {value: item, label: trueWildcard, checked: checkedItems.includes(item)})
//         } else if (item === false) {
//             return acc.set(item, {value: item, label: falseWildcard, checked: checkedItems.includes(item)})
//         } else if (item === '' || item === null || item === undefined) {
//             return acc.set(emptyValueWildcard, {value: emptyValueWildcard, label: emptyWildcard, checked: checkedItems.includes(emptyValueWildcard)})
//         } else {
//             return acc.set(item, {value: item, label: item, checked: checkedItems.includes(item)})
//         }
//     }, new Map())
//     console.log('helpers', Array.from(resMap.values()))
//     return Array.from(resMap.values())
// }
function createListFromArray({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue}) {
    const resMap = data.reduce((acc, item) => {
        if (item === true) {
            return acc.set(item, {value: item, label: trueWildcard, checked: filterValue.includes(item) ? !selectAllState : selectAllState})
        } else if (item === false) {
            return acc.set(item, {value: item, label: falseWildcard, checked: filterValue.includes(item) ? !selectAllState : selectAllState})
        } else if (item === '' || item === null || item === undefined) {
            return acc.set(emptyValueWildcard, {value: emptyValueWildcard, label: emptyWildcard, checked: filterValue.includes(emptyValueWildcard) ? !selectAllState : selectAllState})
        } else {
            return acc.set(item, {value: item, label: item, checked: filterValue.includes(item) ? !selectAllState : selectAllState})
        }
    }, new Map())
    return Array.from(resMap.values())
    // return data.map(item => (
    //     item === null || item === undefined || item === ''
    //         ? {value: emptyWildcard, label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAllState : selectAllState}
    //         : {value: item, label: item, checked: filterValue.includes(item) ? !selectAllState : selectAllState}
    // ))
}

export function convertFilterList ({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard,  selectAllState = true, filterValue = []}) {
    if (data.length === 0) return data
    const testItem = data[0]
    if (check.object(testItem)) {
        return createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard,  selectAllState, filterValue})
    } else {
        return createListFromArray({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard,  selectAllState, filterValue})
    }
}