import React, {useContext} from "react";
import TableContext from "../../TableContext";
import DefaultRow from "../default/DefaultRow";
import PropTypes from 'prop-types'
/**
 *
 * @param props
 * @return {*}
 */
const Row = ({rowData, index, children}) => {
    const {renderRow} = useContext(TableContext)
    return renderRow ? renderRow({rowData, index, children}) : <DefaultRow children={children} />
}
Row.propTypes = {
    rowData: PropTypes.object, //like {<accessor>: <value>}
    index: PropTypes.number, //index of row in data array
}

export default Row