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
      
      display: flex;
      flex-shrink: 0;
      justify-content: space-between;
      align-items: center;
      
      background-color: ${thm.ft.bgColor};
      color: ${thm.ft.color};
      border-top-width: ${thm.ft.border.width}px;
      border-top-color: ${thm.ft.border.color};
    `
    return <div className="tFooterBox p-1" css={style} >{props.children}</div>
}

export default TableFooter