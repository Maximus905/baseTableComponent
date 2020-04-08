import {convertFilterList} from "./index";

const labelFieldName = 'lab'
const valueFieldName = 'val'
const emptyWildcard = '<empty>'
const emptyValueWildcard = ''
const trueWildcard = 'true'
const falseWildcard = 'false'

// create list from array
describe('create filter list from array', () => {
    test('empty data, empty filter value, selectAll is true', () => {
        const data = []
        const list = []
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('empty filter value, selectAll is true', () => {
        const data = ['v1', 'v2']
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented empty value: '', null, undefined ", () => {
        const data = ['v1', 'v2', '', null, undefined]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented empty value: ''", () => {
        const data = ['v1', 'v2', '']
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented empty value as null ", () => {
        const data = ['v1', 'v2', null]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented empty value as undefined ", () => {
        const data = ['v1', 'v2', undefined]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented value = true ", () => {
        const data = ['v1', 'v2', true]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: true, label: trueWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented value = false ", () => {
        const data = ['v1', 'v2', false]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: false, label: falseWildcard, checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('empty filter value, selectAll is false', () => {
        const data = ['v1', 'v2']
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('not empty filter value, selectAll is true', () => {
        const data = ['v1', 'v2']
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: true}]
        const selectAllState = true
        const filterValue = ['v1']
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('empty value in data, not empty filter value with emptyValueWildcard, selectAll is true', () => {
        const data = ['v1', 'v2', null]
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: false}]
        const selectAllState = true
        const filterValue = ['v1', emptyValueWildcard]
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('not empty filter value, selectAll is false', () => {
        const data = ['v1', 'v2', null]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const selectAllState = false
        const filterValue = ['v1', emptyValueWildcard]
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
})

describe('create filter list from array of objects', () => {
    test('empty filter value, selectAll is true', () => {
        const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: 'l1', checked: true}, {value: 'v2', label: 'l2', checked: true}]
        const selectAllState = true
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('empty filter value, selectAll is false', () => {
        const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('empty label as empty string, empty filter value, selectAll is false', () => {
        const data = [{val:'v1', lab: ''}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: emptyWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('label = null, empty filter value, selectAll is false', () => {
        const data = [{val:'v1', lab: null}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: emptyWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('label = true, empty filter value, selectAll is false', () => {
        const data = [{val:'v1', lab: true}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: trueWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('label = false, empty filter value, selectAll is false', () => {
        const data = [{val:'v1', lab: false}, {val:'v2', lab: 'l2'}]
        const list = [{value: 'v1', label: falseWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('value = empty string, empty filter value, selectAll is false', () => {
        const data = [{val:'', lab: 'l1'}, {val:'v2', lab: 'l2'}]
        const list = [{value: emptyValueWildcard, label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('value =  null, empty filter value, selectAll is false', () => {
        const data = [{val: null, lab: 'l1'}, {val:'v2', lab: 'l2'}]
        const list = [{value: emptyValueWildcard, label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: false}]
        const selectAllState = false
        const filterValue = []
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
    test('not empty filter value, selectAll is true', () => {
        const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}, {val: null, lab: ''}]
        const list = [{value: 'v1', label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: true}, {value: emptyValueWildcard, label: emptyWildcard, checked: false}]
        const selectAllState = true
        const filterValue = ['v1', emptyValueWildcard]
        expect(convertFilterList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, selectAllState, filterValue})).toEqual(list)
    })
})



