## 1.0.11
* added changelog file
* removed unused property of Table
## 1.0.12
* added extFilters property. It's passed to server in data and filters loaders and can be used as additional table filter. If extFilter is changed table data will be reloaded.
##1.0.13
* fixed error when pagination and records counter appeared even if [counterFieldName]  is not presented in a server's response.
##1.0.14
* fixed unexpected behavior of cell with overflow.
##1.0.15
* added api, onBeforeRequestData and onAfterSuccessfulRequestData properties. See readme for more explanations.
##1.0.16
* added onAfterFailedRequestData and onAfterRequestData properties
##1.0.17
* fixed long distance search (location and distance disabled)
##1.0.18
* fuse.js updated to 6 major version
##1.0.19
* @rsb/dropdown-list updated
##1.0.20
* changed style of header cell