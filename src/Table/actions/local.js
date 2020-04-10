import {
    INVALIDATE_DATA,
    RESET_INVALIDATE_DELAY,
    //sorting
    ADD_SORTING,
    SET_SORTING,
    CTRL_DOWN,
    CTRL_UP,
    //change type of filter in filters settings
    FILTER_SETTINGS_SET_TYPE,
    //change value and type of current filters
    // ADD_FILTER_VALUE,
    // REMOVE_FILTER_VALUE,
    // SET_FILTER_VALUE,
    SET_FILTER_TYPE,
    CHANGE_FILTER,
    //current table settings
    SET_TABLE_WIDTH, SET_ALL_COLUMNS_SETTINGS, SET_ONE_COLUMN_SETTINGS,
    //scroll
    SET_SCROLL_SIZES,
    //resizing
    PAGE_RESIZING,
    TABLE_RESIZING, FIRST_PAGE, LAST_PAGE, NEXT_PAGE, PREV_PAGE, CHANGE_ROWS_ON_PAGE
} from '../constatnts/actions'
//invalidate data
export const invalidateData = () => ({type: INVALIDATE_DATA})
export const resetInvalidateDelay = () => ({type: RESET_INVALIDATE_DELAY})
//scroll
export const setScrollSizes = ({vScroll, hScroll}) => ({type: SET_SCROLL_SIZES, payload: {vScroll, hScroll}})
//resizing
export const pageResizing = ({tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight}) => ({type: PAGE_RESIZING, payload: {tBoxWidth, tBoxHeight, tBodyBoxWidth, tBodyBoxHeight}})
export const tableResizing = () => ({type: TABLE_RESIZING})
//sorting
export const addSorting = (accessor) => ({type: ADD_SORTING, payload: accessor})
export const setSorting = (accessor) => ({type: SET_SORTING, payload: accessor})
//ctrl key state
export const ctrlDown = () => ({type: CTRL_DOWN})
export const ctrlUp = () => ({type: CTRL_UP})
//filters settings
export const filterSettingsSetType = ({accessor, type}) => ({type: FILTER_SETTINGS_SET_TYPE, payload: {accessor, type}})
//current filter
export const setFilterType = ({accessor, type}) => ({type: SET_FILTER_TYPE, payload: {accessor, type}})
// export const addFilterValue = ({accessor, value}) => ({type: ADD_FILTER_VALUE, payload: {accessor, value}})
// export const removeFilterValue = ({accessor, value}) => ({type: REMOVE_FILTER_VALUE, payload: {accessor, value}})
// export const setFilterValue = ({accessor, value}) => ({type: SET_FILTER_VALUE, payload: {accessor, value}})
export const changeFilter = ({accessor, filterBy, type, value, selectAllState}) => ({type: CHANGE_FILTER, payload: {accessor, filterBy, type, value, selectAllState}})
//current table settings
export const setTableWidth = (width) => ({type: SET_TABLE_WIDTH, payload: width})
/**
 * @param {Object} columnsSettings object with settings for all columns
 */
export const setAllColumnsSettings = columnsSettings => ({type: SET_ALL_COLUMNS_SETTINGS, payload: columnsSettings})
/**
 * @param {string} accessor
 * @param {Object} columnSettings object that consists settings for only one column
 */
export const setOneColumnSettings = ({accessor, columnSettings}) => ({type: SET_ONE_COLUMN_SETTINGS, payload: {accessor, columnSettings}})
//pagination
export const firstPage = () => ({type: FIRST_PAGE})
export const lastPage = () => ({type: LAST_PAGE})
export const nextPage = () => ({type: NEXT_PAGE})
export const prevPage = () => ({type: PREV_PAGE})
export const changeRowsOnPage = (rowsOnPage) => ({type: CHANGE_ROWS_ON_PAGE, payload: rowsOnPage})
