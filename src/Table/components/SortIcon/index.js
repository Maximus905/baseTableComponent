import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltDown, faLongArrowAltUp} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, Fragment} from "react";
import TableContext from "../../TableContext";

const sortIcons = {
    desc: <FontAwesomeIcon icon={faLongArrowAltDown} size={"sm"} />,
    asc: <FontAwesomeIcon icon={faLongArrowAltUp} size={"sm"} />
}

const SortIcon = ({accessor}) => {
    const {state: {sorting,}} = useContext(TableContext)
    const sortObj = sorting.filter((item) => Object.keys(item)[0] === accessor)[0]
    const sortIcon = sortObj ? sortIcons[sortObj[accessor]] : undefined
    const sortIndex = () => {
        const accessorList = sorting.map(item => Object.keys(item)[0])
        if (accessorList.length <= 1) return undefined
        return accessorList.indexOf(accessor) + 1
    }
    return sortIcon ? (<Fragment>{sortIcon}{sortIndex()}</Fragment>) : null
}
export default SortIcon