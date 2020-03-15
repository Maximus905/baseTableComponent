/**@jsx jsx */
import {useContext} from 'react'
import {DropdownItem as DropdownItemBs} from "reactstrap";
import {css, jsx} from "@emotion/core";
import PropTypes from "prop-types";
import CheckIcon from "../CheckIcon";
import cssStyle from './style.module.css'
import {DropdownContext} from "../../ContextProvider";



const DropdownItem = ({value, label, checked, partlyChecked, onClick, showCheckIcon, ...rest}) => {
    const {emptyWildcard} = useContext(DropdownContext)
    const resLabel = label === emptyWildcard ? <span className={cssStyle.emptyItem}>{label}</span> : label
    return (
        <DropdownItemBs tag={'div'} toggle={false} css={css`
            outline: none;
            padding-left: 30px;
            position: relative;
            &:active {
                background-color: #dcdcdc;
                color: #999
            }
        `} className="text-truncate" onClick={() => onClick(value)} title={label} {...rest}  >
            { showCheckIcon && <CheckIcon checked={checked} partlyChecked={partlyChecked} /> }
            {resLabel}
        </DropdownItemBs>
    )
}
DropdownItem.propTypes = {
    ...DropdownItemBs.propTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    partlyChecked: PropTypes.bool,
    onClick: PropTypes.func,
    showCheckIcon: PropTypes.bool
}
DropdownItem.defaultProps = {
    partlyChecked: false,
    showCheckIcon: true,
    onClick: () => {}
}
export default DropdownItem