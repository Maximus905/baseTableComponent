import React from "react";

const DefaultRow = ({children, rowData, rowIdx, columnsSettings}) => <tr>{children({rowData, rowIdx, columnsSettings})}</tr>
export default DefaultRow