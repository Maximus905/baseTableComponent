import React, {Fragment, useContext} from "react";
import SettingsHeader from "../SettingsHeader";
import SettingsBox from "../SettingsBox";
import {DropdownContext} from "../../ContextProvider";

const SettingsMenu = () => {
    const {settingList, onClickSettingItem, state: {isOpened}} = useContext(DropdownContext)
    if (!isOpened) return null
    return (
        <Fragment>
            <SettingsHeader/>
            <SettingsBox settingList={settingList} onClick={onClickSettingItem} />
        </Fragment>
    )
}
export default SettingsMenu