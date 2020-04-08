/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import PropTypes from "prop-types";
import {useContext} from "react";
import TableContext from "../../TableContext";

const SimpleHeaderCell = ({accessor}) => {
    const {state: {columnsSettings}} = useContext(TableContext)
    return (<th css={css`width: ${columnsSettings[accessor].width}px`} />)
}
SimpleHeaderCell.propTypes = {
    accessor: PropTypes.string,
}


export default SimpleHeaderCell