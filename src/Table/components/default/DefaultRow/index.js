import React from "react";

const DefaultRow = ({children, rowData, rowId, columnsSettings, selectedCellsInRow, onClickCellsHandler}) => <tr>{children({rowData, rowId, columnsSettings, selectedCellsInRow, onClickCellsHandler})}</tr>
export default DefaultRow