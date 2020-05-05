import {jsx, css} from '@emotion/core'
export default {
    hiddenHeader: css`
      & th {
          height: 0 !important;
          font-size: 0 !important;
          padding: 0 !important;
          border: none !important;
      }`,
    tBox: css`
      height: 100%;
      min-width: 500px; /* set a minimum width for table */
      border: none; /* for example */
      &:focus {
        outline: none;
      }
    `,
    tHdBdBox: css`
      min-height: 0;
      overflow-x: auto;
    `,
    tHdBox:  css`
    & > table {
      margin-bottom: 0 !important;
    }`,
    tBdBox: css`
        min-height: 0;
        overflow: initial;
        overflow-y: scroll;
        overflow-x: hidden;
        & > table {
          margin-bottom: 0 !important;
        }
    `,
    noScroll: css`overflow: hidden !important;`
}