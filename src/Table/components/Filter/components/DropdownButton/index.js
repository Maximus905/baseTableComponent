/**@jsx jsx */
import {DropdownToggle} from "reactstrap";
import {css, jsx} from "@emotion/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const DropdownButton = (props) => {
    const {active, disabled} = props
    return <DropdownToggle css={css`
            padding: 5px !important;
            opacity: ${active ? 1 : 0.4};
            cursor: ${disabled ? 'not-allowed' : 'default'};
        `} tag={'span'} disabled={disabled} >
        <FontAwesomeIcon icon={faBars} size={'sm'} />
    </DropdownToggle>
}
export default DropdownButton
