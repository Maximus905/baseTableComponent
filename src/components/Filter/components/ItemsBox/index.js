/** @jsx jsx */

import {createRef, useEffect, useContext, useMemo} from 'react'
import {css, jsx} from "@emotion/core";
import {FixedSizeList as List} from "react-window"
import st from './style.module.css'
import {DropdownContext} from "../../ContextProvider";
import DropdownItem from "../DropdownItem"
import {setItemSizes, clickOnItem} from "../../actions";
import Fuse from "fuse.js";
import EmptyList from "../EmptyList";

const DropdownItemFunc = (props) => (listProps) => {
    const {style, index} = listProps
    const {data, onClick} = props
    const handler = () => onClick(data[index].value)
    const item = data[index]
    return (
        <div style={style}>
            <DropdownItem {...{value: item.value, label: item.label, checked: item.checked, onClick: handler}} />
        </div>
    )
}

// calculate the widest row in list
const longestRowIndex = ({data, fieldName}) => {
    return data.reduce((acc, item, index) => {
        const length = item[fieldName].length
        return length > data[acc][fieldName].length ? index : acc
    }, 0)
}


const ItemsBox = (props) => {
    const {loadingState, loadingWildcard, emptyListWildcard, state: {maxHeight, maxWidth, data, itemWidth, itemHeight, inputValue}, dispatch} = useContext(DropdownContext)
    const itemRef = createRef()
    const fuseOption = {
        shouldSort: true,
        threshold: 0.15,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            'label'
        ]
    }
    const fuse = useMemo(() => new Fuse(data, fuseOption), [data, fuseOption])
    useEffect(() => {
        if (!itemWidth && !itemHeight && itemRef.current && itemRef.current.offsetWidth && itemRef.current.offsetHeight) {
            setTimeout(() => {
                const width = maxWidth && itemRef.current.offsetWidth > maxWidth ? maxWidth : itemRef.current.offsetWidth + 1
                dispatch(setItemSizes({width, height: itemRef.current.offsetHeight}))
            }, 0)

        }
    }, [itemRef])

    const onClickHandler = (value) => {
        dispatch(clickOnItem(value))
    }

    const fuseFilter = (template) => {
        if (!template) return data
        const res =  fuse.search(template)
        return  res
    }

    // const filteredData = dataFilter(inputValue)
    const fuseFiltered = fuseFilter(inputValue)
    // calculate height of listBox depend on amount of items
    const listBoxHeight = () => {
        return !itemHeight ? maxHeight : (fuseFiltered.length * itemHeight > maxHeight ? maxHeight : fuseFiltered.length * itemHeight)
    }
    //if haven't set sizes of item for List component mount the longest item and get its sizes
    if (loadingState) {
        return (
            (
                <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                    <div css={css`overflow-y: auto`} ><EmptyList label={loadingWildcard} /></div>
                </div>
            )
        )
    } else if (data.length === 0) {
        return (
            (
                <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                    <div css={css`overflow-y: auto`} ><EmptyList label={emptyListWildcard} /></div>
                </div>
            )
        )
    } else if (!itemWidth && ! itemHeight) {
        const longestItem = data[longestRowIndex({data, fieldName: 'label'})]
        return (
            <div css={css`
            max-height: ${maxHeight}px;
            overflow-y: auto;
        `}>
                <div css={css`overflow-y: scroll; max-width: ${maxWidth}px`} ref={itemRef}><DropdownItem {...{value: longestItem.value, label: longestItem.label, checked: longestItem.checked }} /></div>
            </div>
        )
    }  else {
        return (
            <List
                className={st.List}
                height={listBoxHeight()}
                itemCount={fuseFiltered.length}
                itemSize={itemHeight}
                width={itemWidth}
            >
                {DropdownItemFunc({data: fuseFiltered, onClick: onClickHandler})}
            </List>
        )
    }
}
export default ItemsBox


