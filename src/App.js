import logo from './logo.svg';
import './App.css';
import Table from './Table/Table'
import {React, useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';

function App() {
  const [responseArray, setResponseArray] = useState([])
  const [tableData, setTableData] = useState([]);
  const [optionList, setOptionList] = useState([]);
  function fetchNameFromAPI (str) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${str}`)
    .then(res => res.json())
    .then(res => {
      setResponseArray(res.results);
      generateSuggestions(res.results)

    })
  }
  function generateSuggestions(arrResponse) {
    const arr = new Set();
    arrResponse.forEach(({name}) => {
      arr.add(name)
    })
    setOptionList(Array.from(arr))
  }
  function setResult () {
    setTableData([...responseArray])
    // comment1sss
  }

  return (
    <div className="App">
      <SearchBar optionList={optionList} fetchNameFromAPI={fetchNameFromAPI} setResult={setResult}/>
      <Table data={tableData} />
    </div>
  );
}

export default App;
