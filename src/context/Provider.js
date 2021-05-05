import React, { useState, useEffect } from 'react';
import Context from './Context';
import { readRemoteFile } from 'react-papaparse';
import imgUrl from '../dataImages';

function Provider({ children }) {
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
  const context = {
    overall,
    name,
    randomImg,
    setRandomImg,
    data,
    setData,
    sortedData,
    setSortedData,
    checked,
    setChecked,
    teamX,
    setTeamX,
    handleClick,
    handleClickWeb,
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile,
    imgUrl,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Provider;
