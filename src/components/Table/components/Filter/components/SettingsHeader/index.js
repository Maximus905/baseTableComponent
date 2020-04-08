/**@jsx jsx*/
import {css, jsx} from "@emotion/core";
import {useContext} from "react";
import {DropdownContext} from "../../ContextProvider";
import SaveIcon from "../SaveIcon";

const SettingsHeader = () => {
    const {bdColor, onClickSaveSettings} = useContext(DropdownContext)
    return (
        <div className="d-flex justify-content-between align-content-center"  css={css`
            padding-right: 0.5rem;
            border-bottom: 1px solid ${bdColor};
        `}>
            <div className="dropdown-item" css={css`padding-left: 30px`}>Тип фильтра</div>
            <SaveIcon onClick={onClickSaveSettings} />
        </div>
    )
}
export default SettingsHeader