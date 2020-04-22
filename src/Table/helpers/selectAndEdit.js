import {Map, Set} from "immutable";
import axios from 'axios'

export const changeSelectedCells = ({selectedCells, rowId, accessor, isCtrlPressed}) => {
    if (rowId === undefined || accessor === undefined) return selectedCells
    let cells = selectedCells.get(rowId) || Set()
    // if (!Set.isSet(cells))
    if (!isCtrlPressed) {
        if (selectedCells.size === 1 && selectedCells.has(rowId) && cells.size === 1 && cells.has(accessor))  return selectedCells
        return selectedCells.clear().set(rowId, cells.clear().add(accessor))
    } else {
        return selectedCells.set(rowId, cells.add(accessor))
    }
}
export const isCellSelected = ({selectedCells,  rowId, accessor}) => {
    const row = selectedCells.get(rowId)
    return row ? row.has(accessor) : false
}
export const changeData = ({data, rowId, rowData, accessor, cellData}) => {
    //if cellData or row the same - return untouched data
    //if accessor is presented - update row in data using accessor
    // else - update entire row in data
    if (accessor !== undefined) {
        if (data[rowId][accessor] === cellData) return data
        const updatedRow = {...data[rowId], [accessor]: cellData}
        return data.map((item, index) => index === rowId ? updatedRow : item)
    } else {
        if (data[rowId] === rowData) return data
        return data.map((item, index) => index === rowId ? {...rowData} : item)
    }
}
