/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {useTheme} from "emotion-theming";
import React from "react"

const DefaultHeaderRow = ({style, children}) => {
    return <tr css={style}>{children()}</tr>
}
export default DefaultHeaderRow