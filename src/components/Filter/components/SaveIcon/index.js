/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import {DropdownContext} from "../../ContextProvider";
import {useContext} from "react";

// const bdColor = 'rgb(206,212,218)'
const SaveIcon = ({onClick}) => {
    const {bdColor} = useContext(DropdownContext)
    return (
        <div css={css`padding: 2px;
              border-radius: 3px;
              border: 1px solid ${bdColor}
            `} onClick={onClick}><FontAwesomeIcon icon={faSave} css={css`font-size: 1rem; color: dimgrey`} /></div>
    )
}

SaveIcon.propTypes = {
    onClick: PropTypes.func
}
SaveIcon.defaultProps = {
    onClick: () => {}
}

export default SaveIcon