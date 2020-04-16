import {Map, Set} from "immutable";

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