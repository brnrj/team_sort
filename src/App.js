import React, { useState, useEffect } from 'react';
import { CSVReader } from 'react-papaparse';
import { readRemoteFile } from 'react-papaparse';
import './App.css';
import logo from './images/logo.jpeg';
import imgUrl from './dataImages';

function CSVReader2() {
  const [overall] = useState(5);
  const [name] = useState(0);
  const [randomImg, setRandomImg] = useState();
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [teamX, setTeamX] = useState([]);

  function handleClickWeb() {
    readRemoteFile(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoADoJc-w_dAjQ_GNlSX99KpDsdzYJ6Kau3OI50_f2CamLySulbEStphsrrvtiYns0Mk8aVlLyNSXl/pub?gid=238086313&single=true&output=csv',
      {
        complete: (results) => {
          console.log('Results:', results);
          let newData = results.data.map((element) => ({ ...element }));
          setData(newData);
        },
      }
    );
  }

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

  useEffect(() => {
    data.sort((a, b) =>
      a[overall] > b[overall]
        ? 1
        : b[overall] > a[overall]
        ? -1
        : Math.floor(Math.random() * 2) || -1
    );
    setRandomImg(getRandomArbitrary(0, imgUrl.length));
    setSortedData(data);
    if (sortedData.length === 25) {
      algoritmoGuloso(sortedData);
    } else if (sortedData.length > 25) {
      algoritmoGuloso2(sortedData.filter((element) => element.length > 1));
    }
  }, [data, sortedData, overall]);

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function algoritmoGuloso(sortedData) {
    let jogadoresX = [];
    let jogadoresY = [];
    let jogadoresZ = [];

    let k = 0;
    for (let i = 0; i < 24; i += 3) {
      if (k % 2 === 0) {
        jogadoresX.push(sortedData[i]);
        jogadoresY.push(sortedData[i + 1]);
        jogadoresZ.push(sortedData[i + 2]);
      } else {
        jogadoresX.push(sortedData[i + 2]);
        jogadoresY.push(sortedData[i + 1]);
        jogadoresZ.push(sortedData[i]);
      }
      k++;
    }
    setTeamX([[...jogadoresX], [...jogadoresY], [...jogadoresZ]]);
  }
  function algoritmoGuloso2(sortedData) {
    let jogadoresX = [];
    let jogadoresY = [];
    let jogadoresZ = [];
    let jogadoresN = [];

    let j = 0;
    for (let i = 0; i < 32; i += 4) {
      if (j % 2 === 0) {
        jogadoresX.push(sortedData[i]);
        jogadoresY.push(sortedData[i + 1]);
        jogadoresZ.push(sortedData[i + 2]);
        jogadoresN.push(sortedData[i + 3]);
      } else {
        jogadoresX.push(sortedData[i + 3]);
        jogadoresY.push(sortedData[i + 2]);
        jogadoresZ.push(sortedData[i + 1]);
        jogadoresN.push(sortedData[i]);
      }
      j++;
    }
    setTeamX([
      [...jogadoresX],
      [...jogadoresY],
      [...jogadoresZ],
      [...jogadoresN],
    ]);
  }
  return (
    <>
      <div className="App">
        {!checked && (
          <div className="Inputs">
            <button onClick={handleClickWeb}>Load from Google Drive</button>
            <CSVReader
              onDrop={handleOnDrop}
              onError={handleOnError}
              addRemoveButton
              onRemoveFile={handleOnRemoveFile}
            >
              <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
          </div>
        )}
        <div className="Meme">
          {!checked ? (
            <div>
              <img src={logo} alt="logo" />
              <p>Vai um Gundanzim ai Fei? Carrega o Arquivo CSV ae!</p>
            </div>
          ) : (
            <p>IXQUECE</p>
          )}
          {checked && (
            <div>
              <img src={imgUrl[randomImg]} alt="meme" />
            </div>
          )}
          <button
            disabled={!data.length}
            onClick={handleClick}
            className={
              !data.length || checked
                ? 'displayButtonFalse'
                : 'displayButtonTrue'
            }
          >
            Agora Clica Aqui!
          </button>
        </div>
        <div className="Main-Team">
          {checked &&
            teamX.map((element, index) => (
              <div key={index} className="Team">
                <p className="titulo">{`Time${index + 1}`}</p>
                {element.map((value, i) => (
                  <p
                    key={i}
                    className={
                      index === 0
                        ? 'LoL blue'
                        : index === 1
                        ? 'LoL red'
                        : index === 2
                        ? 'LoL green'
                        : 'LoL pink'
                    }
                  >
                    {value[name]}
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default CSVReader2;
