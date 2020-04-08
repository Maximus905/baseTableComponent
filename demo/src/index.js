import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import Table from '../../src'
import simpleConfig from "./config/simpleConfig"
import config_customCell_1 from "./config/config_customCell_1"
// import style from './style.module.css'
// import './style2.css'

// minHeight style is very important for the deepest container!!!
const Demo = () => {
  return (
      <div style={{height: '100vh'}}>
          <div style={{height: '40vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 1</h5>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px'}}>
                <Table {...simpleConfig} />
              </div>
          </div>
          <div style={{height: '40vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 2</h5>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px'}}>
                  <Table {...config_customCell_1} />
              </div>
          </div>
      </div>
  )
}

render(<Demo/>, document.querySelector('#app'))
