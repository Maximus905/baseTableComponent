## 1.0.11
* added changelog file
* removed unused property of Table
## 1.0.12
* added extFilters property. It's passed to server in data and filters loaders and can be used as additional table filter. If extFilter is changed table data will be reloaded.
##1.0.13
* fixed error when pagination and records counter appeared even if [counterFieldName]  is not presented in a server's response.
##1.0.14
* fixed unexpected behavior of cell with overflow