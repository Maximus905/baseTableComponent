/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import {useContext} from "react";
import TableContext from "../../TableContext";


const RecordsCounter = () => {
    const {state: {pagination: {recordsCounter}}} = useContext(TableContext)
    return <div css={css`white-space: nowrap`}>Кол-во записей: {recordsCounter}</div>
}
export default RecordsCounter