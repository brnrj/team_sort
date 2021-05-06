import React, { useState, useEffect } from 'react';
import { CSVReader } from 'react-papaparse';
import { readRemoteFile } from 'react-papaparse';
import './App.css';
import logo from './images/logo.jpeg';
import imgUrl from './dataImages';

function CSVReader2() {
  const [overall] = useState(5);
  const [name] = useState(0);
  const [posicao] = useState(1);
  const [confirmado] = useState(6);
  const [randomImg, setRandomImg] = useState();
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [team4, setTeam4] = useState([]);

  function handleClickWeb() {
    readRemoteFile(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoADoJc-w_dAjQ_GNlSX99KpDsdzYJ6Kau3OI50_f2CamLySulbEStphsrrvtiYns0Mk8aVlLyNSXl/pub?gid=238086313&single=true&output=csv',
      {
        complete: (results) => {
          //console.log('Results:', results);
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

  function algoritmoGuloso(sortedData,nrplayersPerTeam,nrTeams) {
    let time1 = [];
    let time2 = [];
    let time3 = [];
    let time4 = [];

    const obj = {
      jogador: sortedData,
    };

    //let times = [time1, time2, time3]
    // for(let i = 0; i < 24 ; i++){
    //   times[i % 3].push(sortedData[i])
    // }
    if(nrTeams==='3'){
      let k = 0;
      for (let i = 0; i < 24; i += 3) {
        if (k % 2 === 0) {
          time1.push(obj.jogador[i]);
          time2.push(obj.jogador[i + 1]);
          time3.push(obj.jogador[i + 2]);
        } else {
          time1.push(obj.jogador[i + 2]);
          time2.push(obj.jogador[i + 1]);
          time3.push(obj.jogador[i]);
        }
        k++;
      }
    }

    if(nrTeams==='4'){
      let k = 0;
      for (let i = 0; i < 32; i += 4) {
        if (k % 2 === 0) {
          time1.push(obj.jogador[i]);
          time2.push(obj.jogador[i + 1]);
          time3.push(obj.jogador[i + 2]);
          time4.push(obj.jogador[i + 3]);
        } else {
          time1.push(obj.jogador[i + 3]);
          time2.push(obj.jogador[i + 2]);
          time3.push(obj.jogador[i + 1]);
          time4.push(obj.jogador[i]);
        }
        k++;
      }

      setTeam4(time4);
    }
    setTeam1(time1);
    setTeam2(time2);
    setTeam3(time3);
    // console.log(time1);
    // console.log(time2);
    // console.log(time3);
    // console.log(time4);
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  

  function getPlayersPerTeam(data) {
    for (let i = 0; i <= data.length; i++) {
      if(data[i]!=null){ 
        if(data[i][0]==='Jogadores por time'){
          return data[i][1];
        }
      }
    }
  }

  function getNumberOfTeams(data) {
    for (let i = 0; i <= data.length; i++) {
      if(data[i]!=null){ 
        if(data[i][2]==='Times na pelada'){
          return data[i][3];
        }
      }
    }
  }



  useEffect(() => {
    function getAllPlayers(data) {
      let allplayers=[]
      for (let i = 0; i <= data.length; i++) {
        if(data[i]!=null){ 
          if(data[i][confirmado]==='sim'){
            
            allplayers.push(data[i])
          }
        }
      }
      return allplayers;
    }

    function sortRandomly(data){
      if(data){
        data.sort((a, b) =>
        a[overall] > b[overall]
          ? 1
          : b[overall] > a[overall]
          ? -1
          : Math.floor(Math.random() * 2) || -1
        );
      }
      return data;
    }

    setRandomImg(getRandomArbitrary(0, imgUrl.length));
    let playingPlayers = getAllPlayers(data);
    let nrplayersPerTeam = getPlayersPerTeam(data)
    let nrTeams = getNumberOfTeams(data);

    console.log("Number of players per team= " + nrplayersPerTeam)
    console.log("Number of teams = " + nrTeams);
    console.log("Number of players on list = " + playingPlayers.length);
    playingPlayers=sortRandomly(playingPlayers);

    algoritmoGuloso(playingPlayers,nrplayersPerTeam,nrTeams);
  }, [data, overall,confirmado]);
  
  return (
    <>
      <div className="App">
        {!checked &&  <div className="Inputs">
          <button onClick={handleClickWeb}>Load from Google Drive</button>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
        </div>}
        <div className="Meme">
          {!checked ? (
            <div>
              <img src={logo} alt="logo" />
              <p>Vai um Gundanzim ai Fei? Carrega o Arquivo CSV ae!</p>
            </div>
          ) : <p>IXQUECE</p>}
          {checked && (
            <div>
              <img src={imgUrl[randomImg]} alt="meme" />
            </div>
          )}
          <button disabled={!data.length} onClick={handleClick} className={!data.length || checked ? "displayButtonFalse" : "displayButtonTrue"}>
            Agora Clica Aqui!
          </button>
        </div>
        {checked && data.length && (
          <div className="Main-Team">
            <div className="Team">
              <p className="titulo">Time 1</p>
              {team1.map((element, index) => (
                <p className="LoL blue" key={index}>
                  {element[posicao] + " - " + element[name]}
                </p>
              ))}
            </div>
            <div className="Team">
              <p className="titulo">Time 2</p>
              {team2.map((element, index) => (
                <p className="LoL red" key={index}>
                  {element[posicao] + " - " + element[name]}
                </p>
              ))}
            </div>
            <div className="Team">
              <p className="titulo">Time 3</p>
              {team3.map((element, index) => (
                <p className="LoL green" key={index}>
                  {element[posicao] + " - " + element[name]}
                </p>
              ))}
            </div>
            <div className="Team">
              <p className="titulo">Time 4</p>
              {team4.map((element, index) => (
                <p className="LoL test" key={index}>
                  {element[posicao] + " - " + element[name]}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CSVReader2;
