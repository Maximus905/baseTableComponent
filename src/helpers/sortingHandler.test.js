import {changeSorting} from "./sortingHandler"

describe('change sort part of state', () => {
    test('appendMode -> no appendMode', () => {
        const sorting = [{col0: 'asc'}]
        const res = changeSorting({sorting, accessor: 'col1'})
        expect(res === sorting).toBeFalsy()
        expect(res).toEqual([
            {col1: 'asc'}
        ])
    })
    test('empty -> asc', () => {
        const sorting = []
        expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
            {col1: 'asc'}
        ])
        sorting[sorting.length] = [{col0: 'asc'}]
        expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
            {col1: 'asc'}
        ])
    })
    test('empty -> asc', () => {
        const sorting = []
        expect(changeSorting({sorting, accessor: 'col1'})).toEqual([
            {col1: 'asc'}
        ])
    })
    test('asc -> desc', () => {
        const sorting = [{col1: 'asc'}]
        const res = changeSorting({sorting, accessor: 'col1'})
        expect(res === sorting).toBeFalsy()
        expect(res).toEqual([
            {col1: 'desc'}
        ])
    })
    test("desc -> ''", () => {
        const sorting = [{col1: 'desc'}]
        expect(changeSorting({sorting, accessor: 'col1'})).toEqual([])
    })

// test width append mode
    test('empty -> asc, appendMode', () => {
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
    test('asc -> desc, appendMode', () => {
        const sorting = [{col1: 'asc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
            {col1: 'desc'}
        ])
    })
    test('asc -> desc 2, appendMode', () => {
        const sorting = [{col0: 'asc'}, {col1: 'asc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
            {col0: 'asc'},
            {col1: 'desc'}
        ])
    })
    test('asc -> desc 3, appendMode', () => {
        const sorting = [{col1: 'asc'}, {col0: 'asc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
            {col1: 'desc'},
            {col0: 'asc'}
        ])
    })
    test('desc -> "", appendMode', () => {
        const sorting = [{col1: 'desc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([])
    })
    test('desc -> "" 2, appendMode', () => {
        const sorting = [{col0: 'asc'}, {col1: 'desc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
            {col0: 'asc'}
        ])
    })
    test('desc -> "" 3, appendMode', () => {
        const sorting = [{col1: 'desc'}, {col0: 'asc'}]
        expect(changeSorting({sorting, accessor: 'col1', appendMode: true})).toEqual([
            {col0: 'asc'}
        ])
    })
})