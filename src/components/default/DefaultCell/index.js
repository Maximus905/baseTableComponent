import React from 'react'

const DefaultCell = ({accessor, rowData}) => (<td>{rowData[accessor]}</td>)
export default DefaultCell