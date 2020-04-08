import {app_convertPagination, app_updatePagination} from "./pagination";

const getPaginationState = (recordsCounter = 300, currentPage = 2, rowsOnPage = 100, totalPages = 3, rowsOnPageList = [100, 300, 500, 1000]) => ({
    recordsCounter, currentPage, rowsOnPage, rowsOnPageList, totalPages,
})

describe('update pagination', () => {
    test('change rowsOnPage', () => {
        const inputPagination = getPaginationState(300, 2, 100, 3)
        const result = getPaginationState(300, 1, 300, 1)
        const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 300, recordsCounter: 300})
        expect(realResult).toEqual(result)
    })
    test('change recordsCounter', () => {
        const inputPagination = getPaginationState(300, 2, 100, 3)
        const result = getPaginationState(400, 1, 100, 4)
        const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: 400})
        expect(realResult).toEqual(result)
    })
    test('recordsCounter is null', () => {
        const inputPagination = getPaginationState(300, 2, 100, 3)
        const result = getPaginationState(null, 1, 100, null)
        const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: null})
        expect(realResult).toEqual(result)
    })
    test('recordsCounter = 0', () => {
        const inputPagination = getPaginationState(300, 2, 100, 3)
        const result = getPaginationState(0, 1, 100, 1)
        const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: 0})
        expect(realResult).toEqual(result)
    })
})
describe('convert pagination for server request', () => {
    const rowsOnPage = 100
    const currentPage = 2
    test('convert pagination', () => {
        const inputPagination = getPaginationState(300, currentPage, rowsOnPage, 3)
        const result = {
            limit: rowsOnPage,
            offset: (currentPage - 1) * rowsOnPage
        }
        const realResult = app_convertPagination({pagination: inputPagination})
        expect(realResult).toEqual(result)
    })
})
