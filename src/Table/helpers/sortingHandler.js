// change sorting object in state
const sortingValues = ['asc', 'desc', '']

const currentSortValue = (sorting, accessor) => {
    return sorting.reduce((acc, col) => {
        acc = Object.keys(col)[0] === accessor ? col[accessor] : acc
        return acc
    }, '')
}
const currentSortIndex = (sorting, accessor) => {
    return sorting.reduce((acc, item, index) => {
        acc = Object.keys(item)[0] === accessor ? index : acc
        return acc
    }, -1)
}
const getNextSortValue = (sorting, accessor) => sortingValues[(sortingValues.indexOf(currentSortValue(sorting, accessor)) + 1) % 3]

export const changeSorting = ({sorting, accessor, appendMode = false}) => {
    const clone = [...sorting]
    const currentIdx = currentSortIndex(clone, accessor)
    const nextValue = getNextSortValue(clone, accessor)
    if (!appendMode) {
        return nextValue === '' ? [] : [{[accessor]: nextValue}]
    } else {
        if (currentIdx < 0) {
            clone[clone.length] = { [accessor]: nextValue }
        } else {
            if (nextValue === '') {
                clone.splice(currentIdx, 1)
            } else {
                clone.splice(currentIdx, 1, { [accessor]: nextValue })
            }
        }
    }

    return clone
}
