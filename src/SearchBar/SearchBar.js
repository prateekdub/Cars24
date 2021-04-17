import React, { useState, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce';
const SearchBar = (prop) => {
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState(0)
    const searchValue = useRef(null);
    const onChangeEvent = debounce(() => {
        setShowOptions(true)
        prop.fetchNameFromAPI(searchValue.current.value)
    }, 500)

    const search = () => {
        prop.setResult(searchValue.current.value)
        if (localStorage['previousSearch']) {
            const arr = localStorage['previousSearch'].split(',')
            if (arr.length == 10) {
                arr.splice(0, 1);
            }
            if (!arr.includes(searchValue.current.value)) { arr.push(searchValue.current.value) }
            localStorage['previousSearch'] = arr.join(',')
        } else {
            localStorage['previousSearch'] = searchValue.current.value;
        }

    }

    const searchOnList = (e) => {
        prop.setResult(e.target.value)
        setShowOptions(false)
    }
    const focusEvent = () => {
        if (!searchValue.current.value) {
            setShowOptions(true)
            prop.focusEvent()
        }
    }
    const blurEvent = () => {
        setShowOptions(false)
    }
    const option = <ul className="options" onClick={(e) => searchOnList(e)}>
        {showOptions && prop.optionList && prop.optionList.map((x, index) => {
            let className;
            if (index === activeOption) {
                className = 'option-active';
            }
            return (
                <li className={className}>{x}</li>
            )
        })} </ul>
    return (
        <React.Fragment>
            <input className="searchBar" type="text"
                placeholder="Search.." onChange={onChangeEvent} ref={searchValue} onFocus={focusEvent}
                onBlur={blurEvent} />
            {option}

            <button onClick={search}>
                Search
            </button>
        </React.Fragment>
    );
}
export default SearchBar;