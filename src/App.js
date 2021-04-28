import React, { useState, useEffect } from 'react';
import './App.css';
import { CSVReader } from 'react-papaparse';

function CSVReader2() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);

  function handleClick() {
    setChecked(true);
  }

  function handleOnDrop(data) {
    console.log(data);
    setData(data);
  }

  function handleOnError(err) {
    console.log(err);
  }

  function handleOnRemoveFile(data) {
    console.log(data);
  }

  function sortTopPlayer(data) {
    data.sort((a, b) =>
      a.data[5] > b.data[5] ? 1 : b.data[5] > a.data[5] ? -1 : 0
    );
    setSortedData(data);
  }

  useEffect(() => {
    let time1 = [];
    let time2 = [];
    let time3 = [];
    sortTopPlayer(data);
    for (let i = 0; i < 24; i++) {
      time1.push(sortedData[i]);
      time2.push(sortedData[i + 1]);
      time3.push(sortedData[i + 2]);
      i = i + 2;
    }
    setTeam1(time1);
    setTeam2(time2);
    setTeam3(time3);
  }, [data, sortedData]);
  console.log(team1, team2, team3);
  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      <div className="App">
        <div className='Meme'>
          {!checked && <p>Vai um Gundanzim ai Fei?</p>}
          <button onClick={handleClick}>Clica Aqui Bonitão</button>
        </div> 
        {checked && (
          <div className="Main-Team">
            <div className="Team">
              <p>Time 1</p>
              {team1.map(({data}, index) => (
                <p className="LoL" key={index}>{data[0]}</p>
              ))}
            </div>
            <div className="Team">
            <p>Time 2</p>
            {team2.map(({data}, index) => (
                <p className="LoL" key={index}>{data[0]}</p>
              ))}
            </div>
            <div className="Team">
            <p>Time 3</p>
            {team3.map(({data}, index) => (
                <p className="LoL" key={index}>{data[0]}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CSVReader2;
