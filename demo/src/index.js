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
    const api = {}
    useEffect(() => console.log('extFilter: ', extFilter), [extFilter])
  return (
      <div style={{height: '100vh'}}>
          <div style={{height: '60vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 1</h5>
              <div className="container-fluid">
                  <button className="btn btn-info w-25" onClick={() => setShowTable(!showTable)}>Show/hide table</button>
              </div>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  {showTable && <Table {...simpleConfig} />}
              </div>
          </div>
          <div style={{height: '40vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 2</h5>
              <div className="container-fluid ">
                  <button onClick={() => setExtFilter(extFilter + '1')} className="btn btn-info w-25">change extFilter</button>
                  <button onClick={() => api.reload()} className="btn btn-info w-25 ml-2">reload data</button>
                  <button onClick={() => api.reload(1000)} className="btn btn-info w-25 ml-2">reload data in 1000ms</button>
              </div>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  <Table {...config_customCell_1} extFilters={extFilter} showGlobalSearch={false} api={api} onBeforeRequestData={() => {console.log('before fetching')}} onAfterSuccessfulRequestData={() => {console.log('after success fetching')}}  onAfterFailedRequestData={() => console.log('after failed fetching')} onAfterRequestData={() => console.log('after fetching')} />
              </div>
          </div>
          <div style={{height: '70vh'}} className="d-flex flex-column">
              <h5 className="align-self-center">Table 2</h5>
              <h6 className="align-self-center">next code works only with available netcmdb server</h6>
              <div className="container-fluid flex-grow-1" style={{minHeight: '0px', height: '100%'}}>
                  <Table {...remoteServer} showPagination={false} extFilters={extFilter} onBeforeRequestData={() => {console.log('before fetching 2')}} onAfterSuccessfulRequestData={() => console.log('after success fetching 2')} />
              </div>
          </div>
      </div>
  )
}

render(<Demo/>, document.querySelector('#app'))
