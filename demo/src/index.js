import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import Table from '../../src'
import simpleConfig from "./config/simpleConfig"
import config_customCell_1 from "./config/config_customCell_1"
// import style from './style.module.css'
// import './style2.css'

const Demo = () => {
  return (
      <div style={{height: '100vh'}}>
          <h5 className="text-center"> Default Table</h5>
          <div className="d-flex flex-column"  style={{height: '30%'}}>
              <div className="container-fluid flex-grow-1">
                  <Table {...simpleConfig} />
              </div>
          </div>
          <h5 className="text-center"> Custom Cell 1</h5>
          <div className="d-flex flex-column"  style={{height: '30%'}}>
              <div className="container-fluid flex-grow-1">
                  <Table {...config_customCell_1} />
              </div>
          </div>
      </div>

      )

}

render(<Demo/>, document.querySelector('#app'))
