/**
 * Allowed filter types
 */
const filterTypes = {
    EQ: {value: 'EQ', label: '=', filterName: 'равно'},
    NE: {value: 'NE', label: '!=', filterName: 'не равно'},
    LT: {value: 'LT', label: '<', filterName: 'меньше'},
    LE: {value: 'LE', label: '<=', filterName: 'меньше или равно'},
    GT: {value: 'GT', label: '>', filterName: 'больше'},
    GE: {value: 'GE', label: '>=', filterName: 'больше или равно'},
    STARTING: {value: 'STARTING', label: 'начинается с'},
    ENDING: {value: 'ENDING', label: 'заканчивается на'},
    INCLUDING: {value: 'INCLUDING', label: 'содержит'},
    LIST: {value: 'LIST', label: 'список', loadFromServer: true, }
}
export default filterTypes