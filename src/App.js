import React, { useState, useEffect } from 'react';
import './App.css';
import { CSVReader } from 'react-papaparse';
import logo from './images/logo.jpeg';
import { readRemoteFile } from 'react-papaparse';

function CSVReader2() {
  const [overall] = useState(5)
  const [name] = useState(0)
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);

  function handleClickWeb() {
    readRemoteFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vRoADoJc-w_dAjQ_GNlSX99KpDsdzYJ6Kau3OI50_f2CamLySulbEStphsrrvtiYns0Mk8aVlLyNSXl/pub?gid=238086313&single=true&output=csv', {
      complete: (results) => {
        console.log('Results:', results);
        let teste = results.data.map((element) => ({...element}))
        setData(teste)
      },
    });
  };

  function handleClick() {
    setChecked(true);
  }

  function handleOnDrop(data) {
    console.log(data);
    setData(data.map((element) => element.data));
  }

  function handleOnError(err) {
    console.log(err);
  }

  function handleOnRemoveFile(data) {
    console.log(data);
  }

  function algoritmoGuloso(sortedData){
    let time1 = [];
    let time2 = [];
    let time3 = [];
    const obj = {
      jogador : sortedData
    }

    // let times = [time1, time2, time3]

    // for(let i = 0; i < 24 ; i++){
    //   times[i % 3].push(sortedData[i])
    // }

    let k = 0
    for(let i = 0; i < 24 ; i += 3){
      if (k % 2 === 0){
        time1.push(obj.jogador[i])
        time2.push(obj.jogador[i + 1])
        time3.push(obj.jogador[i + 2])
      }
      else {
        time1.push(obj.jogador[i + 2])
        time2.push(obj.jogador[i + 1])
        time3.push(obj.jogador[i])
      }
      k++
    }
    setTeam1(time1);
    setTeam2(time2);
    setTeam3(time3);
  }

  useEffect(() => {
  sortTopPlayer(data);
  algoritmoGuloso(sortedData);
  }, [data, sortedData]);

  function sortTopPlayer(data) {
      data.sort((a, b) =>
      a[overall] > b[overall] ? 1 : b[overall] > a[overall] ? -1 : 0
    );
    setSortedData(data);
  }
  console.log(team1, team2, team3)
  return (
    <>
      <button onClick={handleClickWeb}>readRemoteFile</button>
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
          {!checked && 
          <div>
            <img src={logo} alt="logo"/>
            <p>Vai um Gundanzim ai Fei?</p>
          </div>}
          {checked && <p>MEME</p>}
          <button onClick={handleClick}>Clica Aqui Bonitão</button>
        </div> 
        {(checked && data.length) && (
          <div className="Main-Team">
            <div className="Team">
              <p className="titulo">Time 1</p>
              {team1.map((element, index) => (
                <p className="LoL blue" key={index}>{element[name]}</p>
              ))}
            </div>
            <div className="Team">
            <p className="titulo">Time 2</p>
            {team2.map((element, index) => (
                <p className="LoL red" key={index}>{element[name]}</p>
              ))}
            </div>
            <div className="Team">
            <p className="titulo">Time 3</p>
            {team3.map((element, index) => (
                <p className="LoL green" key={index}>{element[name]}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CSVReader2;
