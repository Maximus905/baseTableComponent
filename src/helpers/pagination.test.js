import {app_updatePagination} from "./pagination";

const getPaginationState = (recordsCounter = 300, currentPage = 2, rowsOnPage = 100, totalPages = 3, rowsOnPageList = [100, 300, 500, 1000]) => ({
    recordsCounter, currentPage, rowsOnPage, rowsOnPageList, totalPages,
})

test('update pagination, change rowsOnPage', () => {
    const inputPagination = getPaginationState(300, 2, 100, 3)
    const result = getPaginationState(300, 1, 300, 1)
    const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 300, recordsCounter: 300})
    expect(realResult).toEqual(result)
})
test('update pagination, change recordsCounter', () => {
    const inputPagination = getPaginationState(300, 2, 100, 3)
    const result = getPaginationState(400, 1, 100, 4)
    const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: 400})
    expect(realResult).toEqual(result)
})
test('update pagination, recordsCounter is null', () => {
    const inputPagination = getPaginationState(300, 2, 100, 3)
    const result = getPaginationState(null, 1, 100, null)
    const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: null})
    expect(realResult).toEqual(result)
})
test('update pagination, recordsCounter = 0', () => {
    const inputPagination = getPaginationState(300, 2, 100, 3)
    const result = getPaginationState(0, 1, 100, 1)
    const realResult = app_updatePagination({pagination: inputPagination, rowsOnPage: 100, recordsCounter: 0})
    expect(realResult).toEqual(result)
})
