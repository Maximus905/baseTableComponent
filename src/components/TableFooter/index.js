/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useContext} from "react";
import TableContext from "../../TableContext";

const TableFooter = (props) => {
    const {state: {dimensions: {tWidth, tBoxWidth}}} = useContext(TableContext)
    const {darkTheme} = props
    const footerWidth = tWidth >= tBoxWidth ? tBoxWidth : tWidth
    return <div className={classNames("d-flex justify-content-between align-items-center p-1", darkTheme ? "text-white bg-dark" : "bg-light")} css={css`width: ${footerWidth}px`} >{props.children}</div>
}
TableFooter.propTypes = {
    darkTheme: PropTypes.bool
}
export default TableFooter