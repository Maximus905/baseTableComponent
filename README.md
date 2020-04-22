# table component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Simple  Table component

Some of props definition:
* __getTableData__ - async function
 ```javascript
({url, filters, sorting, pagination}) => {}
```
 __url__ argument is got from props.tableDataUrl (see below)
 It should return object structure like this:
```javascript
{
    dataFieldName: [
        {accessor1: 'value 1'}, {accessor2: 'value 2'},
        {accessor1: 'value n'}, {accessor2: 'value n'}
    ],
    dataCounterFieldName: 'numberOfRecords'
}
```
if the field **dataCounterFieldName** isn't presented in response, counter ow records and pagination won't be shown in the footer
* __dataFieldName__ - field name for data in the structure above
* __dataCounterFieldName__ - field name of record counter in the structure above. This number will be shonw in the footer as a records counter. And this number is also used for calculating pagination parameters. 
* __getFilterList__ - async function 
```javascript
async ({url, accessor, filters}) => {}
```
 __url__ argument is got from props.filterDataUrl (see below).
 It should return array of ordered values or array of objects, where each object should look like
```javascript
{filterValueName: 'value', filterLabelName: 'label'}
```
. If the function returns simple array, each value is used as value and as label
 * __filterValueName__ - field name of value. This prop is used only if __getFilterList__ function returns array of objects 
* __filterLabelName__ - field name of label. This prop is used only if __getFilterList__ function returns array of objects 
* __tableDataUrl__ - URL for fetching table data. Will be passed to fetch function
* __filterDataUrl__

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
