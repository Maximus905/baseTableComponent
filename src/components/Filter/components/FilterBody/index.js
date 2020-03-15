import React, {Fragment, useContext} from "react";
import SelectAllBox from "../SelectAll";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import SimpleSearch from "../../filters/SimpleSearch";
import {DropdownContext} from "../../ContextProvider";

const DropdownFilter = ({isEmpty, loadingState}) => (
    isEmpty || loadingState ? (
        <Fragment>
            <ItemsBox/>
        </Fragment>
    ) : (
        <Fragment>
            <SelectAllBox/>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
)

const FilterBody = () => {
    const {loadingState, state: {settingList, data, isOpened}} = useContext(DropdownContext)
    if (!isOpened) return null
    const filterType = settingList.reduce((acc, item) => item.checked ? item.value : acc, '')
    switch (filterType) {
        case 'EQ':
        case 'NE':
        case 'LT':
        case 'LE':
        case 'GT':
        case 'GE':
        case 'STARTING':
        case 'ENDING':
        case 'INCLUDING':
            return <SimpleSearch filterType={filterType} />
        case 'LIST':
            return <DropdownFilter isEmpty={!data.length} loadingState={loadingState}  />
        default:
            return <SimpleSearch filterType={filterType} />
    }
}
export default FilterBody
