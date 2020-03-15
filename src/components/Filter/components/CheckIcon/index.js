/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faMinus} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import {DropdownContext} from "../../ContextProvider";
import {useContext} from "react";

const bdColor = 'rgb(206,212,218)'
const CheckIcon = ({checked, partlyChecked}) => {
    const {fontRatio} = useContext(DropdownContext)
    return (
        <div css={css`
        width: ${20 * fontRatio}px;
        height: ${20 * fontRatio}px;
        padding: 3px;
        position: absolute;
        left: ${0.25}rem;
        top: ${0.3}rem;
        border: 1px solid ${bdColor};
        border-radius: 5px;
    `} className="d-flex justify-content-center align-items-center">
        {partlyChecked ? <FontAwesomeIcon icon={faMinus} css={css`font-size: ${fontRatio}rem; color: dimgrey`} /> : (checked ? <FontAwesomeIcon icon={faCheck} css={css`font-size: ${fontRatio}rem; color: dimgrey`} /> : false)}
    </div>
    )
}

CheckIcon.propTypes = {
    checked: PropTypes.bool,
    partlyChecked: PropTypes.bool
}

export default CheckIcon