/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import {useContext} from 'react'
import {Spinner as BsSpinner} from 'reactstrap'
import TableContext from "../../TableContext";

const Spinner = props => {
    const {state: {dimensions}} = useContext(TableContext)
    return (
                <div css={css`width: ${dimensions.tWidth}px; height: 100%; position: absolute; top: 0; left: 0; opacity: 0.4`} className="bg-dark">
                    <div css={css`width: 100%; height: 100%; opacity: 1`} className="d-flex justify-content-center align-items-center bg-dark">
                        <BsSpinner type="grow" color="primary" />
                        <BsSpinner type="grow" color="secondary" />
                        <BsSpinner type="grow" color="success" />
                        <BsSpinner type="grow" color="danger" />
                        <BsSpinner type="grow" color="warning" />
                        <BsSpinner type="grow" color="info" />
                        <BsSpinner type="grow" color="dark" />
                    </div>
                    {/*<div css={css`width: 100%; height: 100%; opacity: 0.7; position: absolute; top: 0; left: 0;`} className="bg-dark" />*/}
                </div>
    )
}
export default Spinner