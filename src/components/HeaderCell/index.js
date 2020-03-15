import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import DefaultHeaderCell from "../default/DefaultHeaderCell"
import SortIcon from "../SortIcon";
import TableContext from "../../TableContext";

/**
 *
 * @param {string} accessor
 * @param {function} renderSortIcon
 * @return {*}
 */
const HeaderCell = ({accessor}) => {
    const {renderHeaderCellFunctions, state: {columnsSettings}} = useContext(TableContext)

    return renderHeaderCellFunctions[accessor] ? renderHeaderCellFunctions[accessor]({accessor, columnsSettings}) : <DefaultHeaderCell {...{accessor, renderSortIcon: (accessor) => (<SortIcon accessor={accessor} />)}} />
}

HeaderCell.propTypes = {
    accessor: PropTypes.string,
}
export default HeaderCell

