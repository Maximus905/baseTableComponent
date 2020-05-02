/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useTheme} from "emotion-theming"
import {Input} from "reactstrap"
import PropTypes from 'prop-types'

const GlobalSearch = (props) => {
    const thm = useTheme()
    const style = css`
      height: calc(1em + 0.75rem + 2px);
      color: ${thm.globalSearch.color};
      background-color: ${thm.globalSearch.bgColor};
      border-width: ${thm.globalSearch.border.width}px;
      border-color: ${thm.globalSearch.border.color};
      &:focus {
        color: ${thm.globalSearch.onFocus.color};
        background-color: ${thm.globalSearch.onFocus.bgColor};
      }
    `
    return <div ><Input css={style} /></div>
}
export default GlobalSearch
