/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import PropTypes from 'prop-types'

const ScrollCell = ({vScroll}) => <th css={css`width: ${vScroll}px; padding: 0; border-right: 0`} />

ScrollCell.propTypes = {
    vScroll: PropTypes.number
}
export default ScrollCell
