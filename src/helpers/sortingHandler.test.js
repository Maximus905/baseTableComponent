import {changeSorting} from "./sortingHandler"

test('sorting handler appendMode -> no appendMode', () => {
    const sorting = [{col0: 'asc'}]
    const res = changeSorting({sorting, accessor: 'col1'})
    expect(res === sorting).toBeFalsy()
    expect(res).toEqual([
        {col1: 'asc'}
    ])
})
test('sorting handler empty -> asc', () => {
    const sorting = []
    expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
        {col1: 'asc'}
    ])
    sorting[sorting.length] = [{col0: 'asc'}]
    expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
        {col1: 'asc'}
    ])
})
test('sorting handler empty -> asc', () => {
    const sorting = []
    expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
        {col1: 'asc'}
    ])
})
test('sorting handler, asc -> desc', () => {
    const sorting = [{col1: 'asc'}]
    const res = changeSorting({sorting, accessor: 'col1'})
    expect(res === sorting).toBeFalsy()
    expect(res).toEqual([
        {col1: 'desc'}
    ])
})
test("sorting handler, desc -> ''", () => {
    const sorting = [{col1: 'desc'}]
    expect(changeSorting({sorting, accessor: 'col1'})).toEqual([])
})

// test width append mode
test('sorting handler empty -> asc, appendMode', () => {
    const sorting = []
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col1: 'asc'}
    ])
    sorting[sorting.length] = {col0: 'asc'}
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col0: 'asc'},
        {col1: 'asc'}
    ])
})
test('sorting handler asc -> desc, appendMode', () => {
    const sorting = [{col1: 'asc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col1: 'desc'}
    ])
})
test('sorting handler asc -> desc 2, appendMode', () => {
    const sorting = [{col0: 'asc'}, {col1: 'asc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col0: 'asc'},
        {col1: 'desc'}
    ])
})
test('sorting handler asc -> desc 3, appendMode', () => {
    const sorting = [{col1: 'asc'}, {col0: 'asc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col1: 'desc'},
        {col0: 'asc'}
    ])
})
test('sorting handler desc -> "", appendMode', () => {
    const sorting = [{col1: 'desc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([])
})
test('sorting handler desc -> "" 2, appendMode', () => {
    const sorting = [{col0: 'asc'}, {col1: 'desc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col0: 'asc'}
    ])
})
test('sorting handler desc -> "" 3, appendMode', () => {
    const sorting = [{col1: 'desc'}, {col0: 'asc'}]
    expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
        {col0: 'asc'}
    ])
})