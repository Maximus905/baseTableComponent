# table component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Simple  Table component

Some of props definition:
* __tableDataLoader__ - async function
  * default loader:
  ```javascript
  const defaultTableDataLoader = async ({url, filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}) => {
      try {
          const res = await axios.get(url, {
              params: {filters, extFilters, sorting, pagination, dataFieldName, dataCounterFieldName}
          })
          if (res.status !== 200 || !Array.isArray(res.data[dataFieldName])) {
              console.log('Error fetching data from server: ', res)
              throw new Error('Error fetching data from server')
          }
          return res.data
      } catch (e) {
          alert(e.toString())
          return []
      }
  }
  ```
* __url__ argument is got from props.tableDataUrl (see below).
 It should return object structure like this:
  ```javascript
  {
      [dataFieldName]: [
          {accessor1: 'value 1'}, {accessor2: 'value 2'},
          {accessor1: 'value n'}, {accessor2: 'value n'}
      ],
      [dataCounterFieldName]: 'numberOfRecords'
  }
  ```
if the field **dataCounterFieldName** isn't presented in response, counter of records and pagination won't be shown in the footer

Default values:
```javascript
    dataFieldName: 'data',
    counterFieldName: 'counter'
```
* __dataFieldName__ - field name for data in the structure above
* __dataCounterFieldName__ - field name of record counter in the structure above. This number will be shown in the footer as a records counter. And this number is also used for calculating pagination parameters. 

Where are used dataFieldName and dataCounterFieldName?

our server should send table data in structure like:
```javascript
{
    [dataFieldName]: [table data],
    [dataCounterFieldName]: number_of_records
}
```
* __getFilterList__ - async function fetched data for filters of LIST type
  * default loader:
  ```javascript
  const defaultFilterDataLoader = async ({url, filters, extFilters, accessor, dataFieldName}) => {
      try {
          const res = await axios.get(url, {
              params: {accessor, filters, extFilters, dataFieldName}
          })
          if (res.status !== 200 || !Array.isArray(res.data[dataFieldName])) {
              console.log('invalid data from server: ', res)
              throw new Error('Error fetching filter list from server')
          }
          return res.data[dataFieldName]
      } catch (e) {
          alert(e.toString())
          return []
      }
  }
  ```
 __url__ argument is got from props.filterDataUrl (see below).
 It should return array of ordered values or array of objects, where each object should look like
```javascript
{filterValueName: 'value', filterLabelName: 'label'}
```
. If the function returns simple array, each value is used as value and as label
 * __filterValueName__ - field name of value. This prop is used only if __getFilterList__ function returns array of objects 
* __filterLabelName__ - field name of label. This prop is used only if __getFilterList__ function returns array of objects 
* __tableDataUrl__ - URL for fetching table data.
* __filterDataUrl__ - URL for fetching filter data (it's used only for LIST type of filters).
* __extFilters__ - external filter that can be passed to table and changed onu of table. If __passThrowExtFilter__=== true, this filter will be sent to server as is, but if __passThrowExtFilter__=== false, this filter will be converted as usual table filter. So, to be able to convert as usual table filter it should have structure like this:
  ```javascript
  {
    filterBy: '', // string
    value: [], // array of values
    type: '', // one of available filter types (see below)
    selectAll: true/false // this field is required only for LIST type
  }
  ``` 
#### Filter types:
* type: EQ, label: '=', filterName: 'равно'},
* type: NE, label: '!=', filterName: 'не равно'},
* type: LT, label: '<', filterName: 'меньше'},
* type: LE, label: '<=', filterName: 'меньше или равно'},
* type: GT, label: '>', filterName: 'больше'},
* type: GE, label: '>=', filterName: 'больше или равно'},
* type: STARTING, label: 'начинается с'},
* type: ENDING, label: 'заканчивается на'},
* type: INCLUDING, label: 'содержит'},
* type: LIST, label: 'список', loadFromServer: true, }

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
