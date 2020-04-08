/**
 * @type {DropDownStateShape} initialState
 */
export const initialState = {
    isOpened: false,
    reopen: false,
    data: [],
    isLoading: true,
    selectAll: true,
    maxHeight: 0,
    maxWidth: 0,
    inputValue: '',
    itemWidth: null,
    itemHeight: null,
    settingItemWidth: null,
    settingItemHeight: null,
    settingsOn: false,
    lastClicked: {value: null, checked: false}, // for saving last clicked item from list
    lastChosenSetting: {value: null}, // for saving last clicked settings item from list
    checkedItems: [],
    filterValue: [],
    checkedItemsCounter: 0,
    lastClickSelectAll: 0,
    settingList: []
}