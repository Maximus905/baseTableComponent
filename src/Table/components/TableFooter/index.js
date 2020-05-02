/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useTheme} from "emotion-theming"
import {useContext} from "react";
import TableContext from "../../TableContext";

const TableFooter = (props) => {
    const {state: {dimensions: {tWidth, tBoxWidth, vScroll}}} = useContext(TableContext)
    const footerWidth = tWidth >= tBoxWidth ? tBoxWidth : tWidth + vScroll
    const thm = useTheme()
    const style = css`
      width: ${footerWidth}px;
      background-color: ${thm.ft.bgColor};
      color: ${thm.ft.color};
      border-top-width: ${thm.ft.border.width}px;
      border-top-color: ${thm.ft.border.color};
    `
    return <div className="d-flex justify-content-between align-items-center p-1" css={style} >{props.children}</div>
}

export default TableFooter