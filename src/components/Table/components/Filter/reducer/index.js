import {
    SWITCH_OPEN_STATE,
    REOPEN_FILTER,
    CLICK_ON_ITEM,
    CLICK_ON_SETTINGS_ITEM,
    CLICK_ON_SELECT_ALL,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    SET_SETTINGS_ITEM_SIZES,
    CHANGE_MENU_MAX_HEIGHT,
    CHANGE_SIMPLE_SEARCH_INPUT, INITIALIZE_FILTER_LIST, CLEAR_FILTER_VALUE, CHANGE_FILTER_TYPE,
    UPDATE_FILTER_LIST
} from "../constants/actions"
import {reopenFilterSetter} from "../helpers";

const rootReducer = (state, action) => {
    const {type, payload} = action
    const newState = {}
    switch (type) {
        case SWITCH_OPEN_STATE:
            return {...state, isOpened: !state.isOpened}
        case REOPEN_FILTER:
            return {...state, ...reopenFilterSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case CLICK_ON_ITEM:
            //add/remove clicked item into checkedItems array
            const itemIndex = state.filterValue.indexOf(payload)
            if (itemIndex < 0) {
                newState.filterValue = [...state.filterValue, payload]
            } else {
                newState.filterValue = state.filterValue.filter(item => item !== payload)
            }
            //set checked status in data[]
            newState.checkedItemsCounter = 0
            const data = state.data.map(item => {
                if (item.value === payload) {
                    newState.checkedItemsCounter = !item.checked ? ++newState.checkedItemsCounter : newState.checkedItemsCounter
                    // lastClicked.checked = !item.checked
                    return  {...item, checked: !item.checked}
                }
                newState.checkedItemsCounter = item.checked ? ++newState.checkedItemsCounter : newState.checkedItemsCounter
                return  item
            })
            return {...state, data, ...newState}
        case CLICK_ON_SETTINGS_ITEM:
            return {...state, settingList: state.settingList.map(item => ({...item, checked: item.value === payload}))}
        case CHANGE_FILTER_TYPE:
            return {...state, ...payload}
        case CLICK_ON_SELECT_ALL:
            return {...state,
                selectAll: !state.selectAll,
                data: state.data.map(item => ({...item, checked: !state.selectAll})),
                filterValue: [],
                checkedItemsCounter: !state.selectAll ? state.data.length : 0,
                // lastClickSelectAll: Date.now()
            }
        case INITIALIZE_FILTER_LIST:
            return {...state, filterValue: [], data: payload.data, selectAll: payload.selectAll, checkedItemsCounter: payload.checkedItemsCounter}
        case CLEAR_FILTER_VALUE:
            return {...state, filterValue: []}
        case UPDATE_FILTER_LIST:
            // return {...state, data: payload}
            return {...state,
                data: payload,
                checkedItemsCounter: payload.reduce((acc, item) => item.checked ? ++acc : acc, 0),
                ...reopenFilterSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case CHANGE_INPUT:
            // handle changing input value for dropdown filter search field
            return {...state, inputValue: payload}
        case CHANGE_SIMPLE_SEARCH_INPUT:
            //handle changing input value for simple search filter
            return {...state, filterValue: payload ? [payload] : []}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        case SET_SETTINGS_ITEM_SIZES:
            return {...state, settingItemWidth: payload.width, settingItemHeight: payload.height}

        case CHANGE_MENU_MAX_HEIGHT:
            return  {...state, maxHeight: payload}
        default:
            return state
    }
}
export default rootReducer