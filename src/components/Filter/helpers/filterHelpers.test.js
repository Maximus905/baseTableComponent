import {convertFilterList} from "./index";

const labelFieldName = 'lab'
const valueFieldName = 'val'
const emptyWildcard = '<empty>'

// create list from array
test('convertFilterList, from array, empty data, empty filter value, selectAll is true', () => {
    const data = []
    const list = []
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array, empty filter value, selectAll is true', () => {
    const data = ['v1', 'v2']
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}]
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test("convertFilterList, from array, empty filter value, selectAll is true, presented empty value as '' ", () => {
    const data = ['v1', 'v2', '']
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyWildcard, label: emptyWildcard, checked: true}]
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test("convertFilterList, from array, empty filter value, selectAll is true, presented empty value as null ", () => {
    const data = ['v1', 'v2', null]
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyWildcard, label: emptyWildcard, checked: true}]
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test("convertFilterList, from array, empty filter value, selectAll is true, presented empty value as undefined ", () => {
    const data = ['v1', 'v2', undefined]
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: true}, {value: emptyWildcard, label: emptyWildcard, checked: true}]
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array, empty filter value, selectAll is false', () => {
    const data = ['v1', 'v2']
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}]
    const selectAllState = false
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array, not empty filter value, selectAll is true', () => {
    const data = ['v1', 'v2']
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: true}]
    const selectAllState = true
    const filterValue = ['v1']
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with empty value, not empty filter value with emptyWildCard, selectAll is true', () => {
    const data = ['v1', 'v2', null]
    const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: true}, {value: emptyWildcard, label: emptyWildcard, checked: false}]
    const selectAllState = true
    const filterValue = ['v1', emptyWildcard]
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array, not empty filter value, selectAll is false', () => {
    const data = ['v1', 'v2']
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}]
    const selectAllState = false
    const filterValue = ['v1']
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with empty value, not empty filter value with emptyWildCard, selectAll is false', () => {
    const data = ['v1', 'v2', undefined]
    const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}, {value: emptyWildcard, label: emptyWildcard, checked: true}]
    const selectAllState = false
    const filterValue = ['v1', emptyWildcard]
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
//create list from object
test('convertFilterList, from array with object items, empty filter value, selectAll is true', () => {
    const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}]
    const list = [{value: 'v1', label: 'l1', checked: true}, {value: 'v2', label: 'l2', checked: true}]
    const selectAllState = true
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with object items, empty filter value, selectAll is false', () => {
    const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}]
    const list = [{value: 'v1', label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: false}]
    const selectAllState = false
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with object items and empty label as empty string, empty filter value, selectAll is false', () => {
    const data = [{val:'v1', lab: ''}, {val:'v2', lab: 'l2'}]
    const list = [{value: 'v1', label: emptyWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
    const selectAllState = false
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with object items and empty label as null, empty filter value, selectAll is false', () => {
    const data = [{val:'v1', lab: null}, {val:'v2', lab: 'l2'}]
    const list = [{value: 'v1', label: emptyWildcard, checked: false}, {value: 'v2', label: 'l2', checked: false}]
    const selectAllState = false
    const filterValue = []
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})
test('convertFilterList, from array with object items, not empty filter value, selectAll is true', () => {
    const data = [{val:'v1', lab: 'l1'}, {val:'v2', lab: 'l2'}]
    const list = [{value: 'v1', label: 'l1', checked: false}, {value: 'v2', label: 'l2', checked: true}]
    const selectAllState = true
    const filterValue = ['v1']
    expect(convertFilterList(data, labelFieldName, valueFieldName, emptyWildcard, selectAllState, filterValue)).toEqual(list)
})


