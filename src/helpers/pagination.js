export const app_convertPagination = ({pagination}) => {
    const {currentPage, rowsOnPage} = pagination
    return {
        limit: rowsOnPage,
        offset: (currentPage - 1) * rowsOnPage
    }
}
export const app_updatePagination = ({pagination: pg, recordsCounter, rowsOnPage}) => {
    const totalPages = recordsCounter !== null && recordsCounter >= 0
        ? Math.ceil(recordsCounter/(rowsOnPage || pg.rowsOnPage))
        : null
    return {
        ...pg,
        currentPage: (recordsCounter === null || pg.recordsCounter !== recordsCounter || (rowsOnPage && (rowsOnPage !== pg.rowsOnPage)))
            ? 1
            : pg.currentPage,
        recordsCounter,
        rowsOnPage: rowsOnPage || pg.rowsOnPage,
        totalPages: totalPages === 0 ? 1 : totalPages
    }
}
