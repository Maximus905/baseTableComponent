/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {DropdownContext} from "../../ContextProvider";

const SettingsIcon = () => {
    const {bdColor, openSettingsMenu} = useContext(DropdownContext)
    return (
        <div css={css`padding: 2px;
              border-radius: 3px;
              border: 1px solid ${bdColor}
            `} onClick={openSettingsMenu}><FontAwesomeIcon icon={faCog} css={css`font-size: 1rem; color: dimgrey`} /></div>
    )
}
export default SettingsIcon