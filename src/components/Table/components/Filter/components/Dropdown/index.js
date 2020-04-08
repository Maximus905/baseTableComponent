/**@jsx jsx */
import {Dropdown as DropdownBs} from "reactstrap";
import {css, jsx} from "@emotion/core";
import {DropdownContext} from "../../ContextProvider";
import {useContext} from "react";

const Dropdown = (props) => {
    const {fontRatio, state: {isOpened}, toggleOpenState} = useContext(DropdownContext)
    return (
        <DropdownBs css={css`
            font-size: ${fontRatio}rem;
        `} {...props} isOpen={isOpened} toggle={toggleOpenState} >
            {props.children}
        </DropdownBs>
    )
}

Dropdown.propTypes = {...DropdownBs.propTypes}

export default Dropdown