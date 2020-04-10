/**
 * @typedef DropDownStateShape
 * @type {Object}
 * @property {array.<DropDownDataItemShape>} data
 * @property {boolean} isOpened
 * @property {boolean} selectAll
 * @property {number} maxHeight
 * @property {number} maxWidth
 * @property {string} inputValue
 * @property {number} itemWidth
 * @property {number} itemHeight
 * @property {boolean} settingsOn // if true - render settings menu instead list od data
 * @property {Object.<DropDownLastClickedItemShape>} lastClicked
 * @property {number} checkedItems // counter of checked items
 * @property {number} lastClickSelectAll // timestamp of SelectAll click event
 */
/**
 * @typedef DropDownLastClickedItemShape
 * @type {Object}
 * @property {string|number} value
 * @property {boolean} checked
 */
/**
 * @typedef DropDownDataItemShape
 * @type {Object}
 * @property {string|number} value
 * @property {string} label
 */