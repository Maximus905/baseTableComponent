/**@jsx jsx*/
import React from "react";
import {storiesOf} from "@storybook/react"
import {actions} from "@storybook/addon-actions"

import DefaultHeaderCell from "./components/DefaultHeaderCell"
import {css, jsx} from "@emotion/core";
import PropTypes from "prop-types";

const Filter = () => <div>F</div>
const Sorter = () => <div>S</div>
const cellProps = {
    title: 'title',
    accessor: 'accessor',
    minWidth: 100,
    maxWidth: 300,
    width: 200,
    isVisible: true,
    filterable: true,
    filter: (<Filter/>),
    sortable: true,
    sorter: (<Sorter/>)
}

// storiesOf('Default Header Cell', module)
//     .addDecorator(story => <div css={css`padding: 3rem; width: 500px;`}>{story()}</div>)
//     .add('default', () => <DefaultHeaderCell {...cellProps}  />)
storiesOf('Default', module)
    .addDecorator(story => <table><tr>{story()}</tr></table>)
    .add('test', () => <DefaultHeaderCell {...cellProps}  />)