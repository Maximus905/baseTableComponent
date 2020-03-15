import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import Table from '../../src'
import config from "./config/tableConfig"
// import style from './style.module.css'
// import './style2.css'

const Demo = () => {
  return (
      <div className="d-flex flex-column"  style={{height: '100vh'}}>
        <div className="container-fluid flex-grow-1">
          <Table {...config} />
        </div>
      </div>
      )

}

render(<Demo/>, document.querySelector('#app'))
