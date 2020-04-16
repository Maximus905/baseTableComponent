import {Map, Set} from "immutable";
import {changeSelectedCells, isCellSelected} from "./selectAndEdit";

describe('select cell testing', () => {
    test("undefined rowId and accessor", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = false
        const rowId = undefined
        const accessor = null
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get('r1').toJS()).toEqual(['c1'])
    })
    test("ctrl - isn't pressed, selectedCells - empty, add cell", () => {
        const selectedCells = Map()
        const isCtrlPressed = false
        const rowId = 'r1'
        const accessor = 'c1'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).not.toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c1'])
    })
    test("ctrl - isn't pressed, selectedCells - noEmpty, add another accessor", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = false
        const rowId = 'r1'
        const accessor = 'c2'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).not.toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c2'])
    })
    test("ctrl - isn't pressed, selectedCells - noEmpty, add another row", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = false
        const rowId = 'r2'
        const accessor = 'c2'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).not.toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c2'])
    })
    test("ctrl - isn't pressed, selectedCells - noEmpty, add the same accessor", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = false
        const rowId = 'r1'
        const accessor = 'c1'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c1'])
    })
    test("ctrl - pressed, selectedCells - noEmpty, add different accessor", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = true
        const rowId = 'r1'
        const accessor = 'c2'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).not.toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c1', 'c2'])
    })
    test("ctrl - pressed, selectedCells - noEmpty, add different row", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = true
        const rowId = 'r2'
        const accessor = 'c1'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).not.toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(2)
        expect(res.get('r1').toJS()).toEqual(['c1'])
        expect(res.get('r2').toJS()).toEqual(['c1'])
    })
    test("ctrl - pressed, selectedCells - noEmpty, add the same accessor", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const isCtrlPressed = true
        const rowId = 'r1'
        const accessor = 'c1'
        const res = changeSelectedCells({selectedCells, rowId, accessor, isCtrlPressed})
        expect(res).toBe(selectedCells)
        expect(Map.isMap(res)).toBeTruthy()
        expect(res.size).toBe(1)
        expect(res.get(rowId).toJS()).toEqual(['c1'])
    })
})
describe("isCellSelected testing", () => {
    test("rowId isn't in selectedCells", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const rowId = 'r2'
        const accessor = 'c1'
        const res = isCellSelected({selectedCells, rowId, accessor})
        expect(res).toBeFalsy()
    })
    test("rowId in selectedCells, accessor isn't", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const rowId = 'r1'
        const accessor = 'c2'
        const res = isCellSelected({selectedCells, rowId, accessor})
        expect(res).toBeFalsy()
    })
    test("rowId in selectedCells, accessor too", () => {
        const selectedCells = Map().set('r1', Set.of('c1'))
        const rowId = 'r1'
        const accessor = 'c1'
        const res = isCellSelected({selectedCells, rowId, accessor})
        expect(res).toBeTruthy()
    })
})