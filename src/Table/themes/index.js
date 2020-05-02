const tableColor = '#212529'
const tableBorderColor = 'rgb(137,137,137)'

const headerColor = 'white'
const headerIconColor = headerColor
const headerBgColor = 'rgb(62,148,224)'

const bodyEvenRowBgColor = 'rgb(239,239,239)'
const bodyOddRowBgColor = 'rgb(250,250,250)'
const bodyColor = tableColor
const bodyHoverRowColor = '#005cbf'
const bodyHoverRowBgColor = 'rgba(0, 0, 0, 0.2)'

const footerColor = headerColor
const footerOnFocusColor = tableColor
const footerBgColor = headerBgColor
const footerOnFocusBgColor = 'rgb(200,224,255)'
const footerBorderColor = 'rgb(222, 226, 230)'

const pgColor = footerColor
const pgBgColor = footerBgColor
const pgBorderColor = footerBorderColor
const pgIconColor = footerColor
const pgIconBgColor = 'rgb(98,163,226)'
const pgHoverIconColor = footerColor
const pgHoverIconBgColor = 'rgb(23,112,205)'
const pgDropdownColor = pgColor
const pgDropdownBgColor = pgBgColor
const pgDropdownOnFocusColor = footerOnFocusColor
const pgDropdownOnFocusBgColor = footerOnFocusBgColor

const gSearchColor = pgColor
const gSearchBgColor = pgIconBgColor
const gSearchOnFocusColor = footerOnFocusColor
const gSearchOnFocusBgColor = footerOnFocusBgColor
const gSearchBorderColor = footerBorderColor

const editorBgColor = 'rgb(108, 117, 125)'
const editorColor = 'rgb(2555, 255, 255)'

export const lightTheme = {
    tb: {
        color: tableColor,
        border: {
            width: 1,
            color: tableBorderColor
        }
    },
    hd: {
        bgColor: headerBgColor,
        color: headerColor,
        iconColor: headerIconColor
    },
    bd: {
        row: {
            even: {
                bgColor: bodyEvenRowBgColor
            },
            odd: {
                bgColor: bodyOddRowBgColor
            },
            hover: {
                color: bodyHoverRowColor,
                bgColor: bodyHoverRowBgColor
            }
        },
        cell: {
            color: bodyColor,
        }
    },
    ft: {
        bgColor: headerBgColor,
        color: headerColor,
        iconColor: headerIconColor,
        border: {
            width: 1,
            color: tableBorderColor
        }
    },
    pg: {
        bgColor: pgBgColor,
        color: pgColor,
        icon: {
            color: pgIconColor,
            bgColor: pgIconBgColor,
            hover: {
                color: pgHoverIconColor,
                bgColor: pgHoverIconBgColor
            }
        },
        border: {
            width: 1,
            color: pgBorderColor
        },
        dropdown: {
            color: pgDropdownColor,
            bgColor: pgDropdownBgColor,
            onFocus: {
                color: pgDropdownOnFocusColor,
                bgColor: pgDropdownOnFocusBgColor,
            }
        }
    },
    globalSearch: {
        color: gSearchColor,
        bgColor: gSearchBgColor,
        border: {
            width: 1,
            color: gSearchBorderColor
        },
        onFocus: {
            color: gSearchOnFocusColor,
            bgColor: gSearchOnFocusBgColor,
        }
    },
    editor: {
        color: editorColor,
        bgColor: editorBgColor
    }
}