import check from "check-types";

export const reopenFilterSetter = ({reopen, isOpened}) => {
    if (!reopen && isOpened) {
        return {reopen: true, isOpened: false}
    } else if (reopen && !isOpened){
        return {reopen: false, isOpened: true}
    }
}

// function for convert input data of filter list into format {value, label, checked}
function createListFromArrayOfObjects(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState = true, filterValue = []) {
    return data.map(item => {
        return  item[labelFieldName]
            ? {value: item[valueFieldName], label: item[labelFieldName], checked: filterValue.includes(item[valueFieldName]) ? !selectAllState : selectAllState}
            : {value: item[valueFieldName], label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAllState : selectAllState}
    })
}

function createListFromArray(data, emptyWildcard, selectAllState = true, filterValue = []) {
    return data.map(item => (
        item === null || item === undefined || item === ''
            ? {value: emptyWildcard, label: emptyWildcard, checked: filterValue.includes(emptyWildcard) ? !selectAllState : selectAllState}
            : {value: item, label: item, checked: filterValue.includes(item) ? !selectAllState : selectAllState}
    ))
}

export function convertFilterList (data, labelFieldName, valueFieldName, emptyWildcard,  selectAllState, filterValue) {
    if (data.length === 0) return data
    const testItem = data[0]
    if (check.object(testItem)) {
        return createListFromArrayOfObjects(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)
    } else {
        return createListFromArray(data, emptyWildcard, selectAllState, filterValue)
    }
}