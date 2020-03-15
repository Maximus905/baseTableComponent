/**@jsx jsx*/
import {jsx} from "@emotion/core"
import {useContext} from "react";
import TableContext from "../../TableContext";
import DefaultCell from "../default/DefaultCell";

const Cell = ({accessor, rowData, width}) => {
    const {renderCellFunctions, invalidateDataWithTimeout} = useContext(TableContext)
    return renderCellFunctions[accessor] ? renderCellFunctions[accessor]({accessor, rowData, width, invalidateDataWithTimeout}) : <DefaultCell {...{accessor, rowData, width}} />
}
export default Cell