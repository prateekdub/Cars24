import React, { useState, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce';
const SearchBar = (prop) => {
    const [showOptions, setShowOptions] = useState(false)
    const searchValue = useRef(null);
    const onChangeEvent = debounce(() => {
        setShowOptions(true)
            prop.fetchNameFromAPI(searchValue.current.value)
        }, 500)
    
    const search = () => {
        prop.setResult(searchValue.current.value)
    }
    const searchOnList = (e) => {
        prop.setResult(e.target.value)
        setShowOptions(false)
    }
    const option = showOptions && prop.optionList && prop.optionList.map(x => {
        return (<ul onClick={(e) => searchOnList(e)}>
    <li>{x}</li>
</ul>)
    })
    return (
        <React.Fragment>
            <input className="searchBar" type="text"
                placeholder="Search.." onChange={onChangeEvent} ref={searchValue} />
            {option}
            
            <button onClick={search}>
                Search
            </button>
        </React.Fragment>
    );
}
export default SearchBar;