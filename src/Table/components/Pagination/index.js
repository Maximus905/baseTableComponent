/**@jsx jsx*/
import {jsx, css} from "@emotion/core"
import {useTheme} from "emotion-theming"
import PropTypes from 'prop-types'
import {Button as ButtonBs, Input as InputBs} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward, faFastForward, faForward, faBackward} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import classNames from 'classnames'
import TableContext from "../../TableContext";
import {changeRowsOnPage, firstPage, lastPage, nextPage, prevPage} from "../../actions";

const IconButton = (props) => {
    const {icon, fontSize, ...rest} = props
    const thm = useTheme()
    const style = css`
      padding: 0.25rem;
      line-height: 1;
      font-size: ${props.fontSize}rem;
      color: ${thm.pg.icon.color};
      background-color: ${thm.pg.icon.bgColor};
      &:hover {
        color: ${thm.pg.icon.hover.color};
        background-color: ${thm.pg.icon.hover.bgColor};
      }
    `
    return <ButtonBs outline size={"sm"} css={style} {...rest}><FontAwesomeIcon icon={icon}/></ButtonBs>
}


IconButton.propTypes = {
    ...ButtonBs.propTypes,
    icon: PropTypes.any, // fa icon
    fontSize: PropTypes.number, // in rem
}
IconButton.defaultProps = {
    fontSize: 0.875
}

const DropdownList = (props) => {
    const {valueList, activeValue, onChange, disabled} = props
    const thm = useTheme()
    const selectStyle = css`
      height: calc(1em + 0.75rem + 2px);
      color: ${thm.pg.dropdown.color};
      background-color: ${thm.pg.dropdown.bgColor};
      &:focus {
        color: ${thm.pg.dropdown.onFocus.color};
        background-color: ${thm.pg.dropdown.onFocus.bgColor};
      }
    `
    return (<InputBs type="select" css={selectStyle} bsSize="sm" onChange={onChange} value={activeValue} disabled={disabled} >
        {valueList.map((item, key) => <option key={key}>{item}</option>)}
    </InputBs>)
}
DropdownList.propTypes = {
    valueList: PropTypes.array,
    activeValue: PropTypes.number,
    darkTheme: PropTypes.bool
}
DropdownList.defaultProps = {
    valueList: [100, 300, 500],
    darkTheme: false
}


const Pagination = (props) => {
    const {darkTheme} = props
    const {dispatch, state: {isLoading, isSaving, showPagination, pagination: {recordsCounter, currentPage, rowsOnPage, rowsOnPageList, totalPages}}} = useContext(TableContext)
    const onFirstPage = () => dispatch(firstPage())
    const onLastPage = () => dispatch(lastPage())
    const onNextPage = () => dispatch(nextPage())
    const onPrevPage = () => dispatch(prevPage())
    const onChangeRowsOnPage = (value) => {
        dispatch(changeRowsOnPage(parseInt(value, 10)))
    }
    const thm = useTheme()
    const style = css`
      width: 300px;
      color: ${thm.pg.color};
      background-color: ${thm.pg.bgColor};
      border-style: solid;
      border-width: ${thm.pg.border.width}px;
      border-color: ${thm.pg.border.color};
    `

    return !showPagination ? <div/>
        : <div className="rounded d-flex align-items-center justify-content-between p-1" css={style}>
            <div>
                <IconButton icon={faFastBackward} className="mr-1" disabled={isSaving || recordsCounter === null || currentPage === 1 || isLoading} onClick={onFirstPage} />
                <IconButton icon={faBackward} disabled={isSaving || recordsCounter === null || currentPage === 1 || isLoading} onClick={onPrevPage} />
            </div>
            <div css={css`white-space: nowrap`}>Page {currentPage} of {totalPages}</div>
            <div>
                <IconButton icon={faForward} className="mr-1" disabled={isSaving || recordsCounter === null || currentPage === totalPages || isLoading} onClick={onNextPage} />
                <IconButton icon={faFastForward} disabled={isSaving || recordsCounter === null || currentPage === totalPages || isLoading} onClick={onLastPage} />
            </div>
            <div>
                <DropdownList disabled={isSaving} darkTheme={darkTheme} valueList={rowsOnPageList} activeValue={rowsOnPage} onChange={(e) => onChangeRowsOnPage(e.target.value)}  />
            </div>
        </div>
}
Pagination.propTypes = {
    startPage: PropTypes.number,
    total: PropTypes.number,
    rowsOnPage: PropTypes.array,
    darkTheme: PropTypes.bool
}
export default Pagination