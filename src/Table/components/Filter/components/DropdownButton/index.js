/**@jsx jsx */
import {DropdownToggle} from "reactstrap";
import {css, jsx} from "@emotion/core";
import {useTheme} from "emotion-theming";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const DropdownButton = (props) => {
    const {active, disabled} = props
    const thm = useTheme()
    return <DropdownToggle css={css`
            padding: 5px !important;
            opacity: ${active ? 1 : 0.4};
            cursor: ${disabled ? 'not-allowed' : 'default'};
            color: ${thm.hd.iconColor};
        `} tag={'span'} disabled={disabled} >
        <FontAwesomeIcon icon={faBars} size={'sm'} />
    </DropdownToggle>
}
export default DropdownButton
