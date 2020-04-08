/**@jsx jsx*/
import {css, jsx} from "@emotion/core"
import DropdownItem from "../DropdownItem"
import {DropdownContext} from "../../ContextProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from '@fortawesome/free-solid-svg-icons'
import {useContext, useMemo} from "react";
import {clickOnSelectAll} from "../../actions";

const SelectAllBox = (props) => {
    const {accessor, bdColor, state: {selectAll, filterValue}, dispatch, openSettingsMenu} = useContext(DropdownContext)
    // const checkedCount = useMemo(() => data.reduce((acc, item) => item.checked ? ++acc : acc, 0), [data])
    // const checked = checkedCount === data.length
    // const partlyChecked = checkedCount > 0 && checkedCount < data.length
    // const partlyChecked = checkedItems > 0 && checkedItems < data.length
    // const nextCheckStatus = () => checkedCount === 0
    const selectAllHandler = () => {
        dispatch(clickOnSelectAll())
    }
    //() => dispatch(checkAll(nextCheckStatus()))
    return (
        <div className="d-flex justify-content-between align-items-center" css={css`
        border-bottom: 1px solid ${bdColor};
        padding-right: 0.5rem;
    `}>
            <DropdownItem checked={selectAll} partlyChecked={filterValue.length > 0} onClick={selectAllHandler} label="Выделить все" value="" index=""/>
            <div css={css`padding: 2px;
              border-radius: 3px;
              border: 1px solid ${bdColor}
            `} onClick={openSettingsMenu}><FontAwesomeIcon icon={faCog} css={css`font-size: 1rem; color: dimgrey`} /></div>
        </div>
    )
}

export default SelectAllBox