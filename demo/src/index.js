import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import Table from "../../src";
import simpleConfig from "./config/simpleConfig"
import config_customCell_1 from "./config/config_customCell_1"
import remoteServer from "./config/withRemoteServerConfig"


// minHeight style is very important for the deepest container because container is flex!!!
const Demo = () => {
    const [showTable, setShowTable] = useState(true)
    const [extFilter, setExtFilter] = useState('ext - 1')
    useEffect(() => console.log('extFilter: ', extFilter), [extFilter])
  return (
      <div style={{height: '100vh'}}>
          <div style={{height: '40vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 1</h5>
              <button onClick={() => setShowTable(!showTable)}>Show/hide table</button>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  {showTable && <Table {...simpleConfig} />}
              </div>
          </div>
          <div style={{height: '40vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 2</h5>
              <button onClick={() => setExtFilter(extFilter + '1')}>change extFilter</button>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  <Table {...config_customCell_1} extFilters={extFilter} />
              </div>
          </div>
          <div style={{height: '70vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 2</h5>
              <h6 className="align-self-center">next code works only with available netcmdb server</h6>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  <Table {...remoteServer} />
              </div>
          </div>
      </div>
  )
}

render(<Demo/>, document.querySelector('#app'))
