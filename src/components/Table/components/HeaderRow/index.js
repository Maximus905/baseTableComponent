import React, {useContext} from 'react'
import DefaultHeaderRow from "../default/DefaultHeaderRow";
import TableContext from "../../TableContext";

/**
 *
 * @param props
 * @return {*}
 */
const HeaderRow = ({children}) => {
    const {renderHeaderRow} = useContext(TableContext)
    return renderHeaderRow ? renderHeaderRow({children}) : <DefaultHeaderRow children={children} />
}
export default HeaderRow