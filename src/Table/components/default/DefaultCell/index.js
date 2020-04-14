import React from 'react'

const DefaultCell = ({accessor, rowData, rowIdx, width}) => (<td>{rowData[accessor]}</td>)
export default DefaultCell