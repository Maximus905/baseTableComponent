/** @jsx jsx */
import {css, jsx} from "@emotion/core"
import {useContext} from 'react'
import PropTypes from 'prop-types'
import {DropdownContext} from "../../ContextProvider"
import {changeInput} from "../../actions"
import {Badge} from 'reactstrap'

const SearchInput = (props) => {
    const {state: {inputValue, checkedItemsCounter}, dispatch, fontRatio, bdColor} = useContext(DropdownContext)
    const onChangeHandler = (e) => {
        dispatch(changeInput(e.target.value))
    }
    return (
        <div css={css`
            padding: 5px;
            position: relative;
        `} className="d-flex justify-content-between align-items-center" >
            <input type="text" className="form-control shadow-none" css={css`
                font-size: ${fontRatio}rem;
                padding: 0.2rem;
                padding-right: 2rem;
                height: calc(1.5em + 2px);
                &:focus {
                  border-color: ${bdColor};
                }
            `} value={inputValue} onChange={onChangeHandler} autoFocus={true} />
            <Badge pill css={css`position: absolute; top: auto; right: 10px`}>{checkedItemsCounter}</Badge>
        </div>
    )
}

SearchInput.propTypes = {
    onChangeInput: PropTypes.func
}
SearchInput.defaultProps = {
    onChangeInput: (inputValue) => {}
}
export default SearchInput