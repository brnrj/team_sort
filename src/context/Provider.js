import React, { useState, useEffect } from 'react';
import Context from './Context';
import { readRemoteFile } from 'react-papaparse';
import imgUrl from '../dataImages';
import emailjs from 'emailjs-com';

function Provider({ children }) {
  const [overall] = useState(5);
  const [name] = useState(0);
  const [posicao] = useState(1);
  const [confirmado] = useState(6);
  const [randomImg, setRandomImg] = useState();
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [teams, setTeams] = useState([]);

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

  const sendEmail = (e) => {
    let teamList=["","","",""];
    for (const key in teams) {
      if (Object.hasOwnProperty.call(teams, key)) {
        const element = teams[key];
        for (let index = 0; index < element.length; index++) {
          const element2 = element[index];
          if(element2 !== undefined){
            teamList[key]+= element2[0]+", " 
          }
        }
      }
    }

    var templateParams = {
      team1: teamList[0],
      team2: teamList[1],
      team3: teamList[2],
      team4: teamList[3]
    };
    emailjs.send('service_29m1yon', 'template_i32jkmf', templateParams, 'user_vTDPwdmxg7t4L1q1rYMIS')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  function handleClick() {
    setChecked(true);
    sendEmail();
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

  function algoritmoGuloso(playingPlayers, nrplayersPerTeam, nrTeams) {
    let time1 = [];
    let time2 = [];
    let time3 = [];
    let time4 = [];

    if (nrTeams === '3') {
      let k = 0;
      for (let i = 0; i < 24; i += 3) {
        if (k % 2 === 0) {
          time1.push(playingPlayers[i]);
          time2.push(playingPlayers[i + 1]);
          time3.push(playingPlayers[i + 2]);
        } else {
          time1.push(playingPlayers[i + 2]);
          time2.push(playingPlayers[i + 1]);
          time3.push(playingPlayers[i]);
        }
        k++;
      }
      setTeams([[...time1], [...time2], [...time3]]);
    }

    if (nrTeams === '4') {
      let k = 0;
      for (let i = 0; i < 32; i += 4) {
        if (k % 2 === 0) {
          time1.push(playingPlayers[i]);
          time2.push(playingPlayers[i + 1]);
          time3.push(playingPlayers[i + 2]);
          time4.push(playingPlayers[i + 3]);
        } else {
          time1.push(playingPlayers[i + 3]);
          time2.push(playingPlayers[i + 2]);
          time3.push(playingPlayers[i + 1]);
          time4.push(playingPlayers[i]);
        }
        k++;
      }
      setTeams([[...time1], [...time2], [...time3], [...time4]]);
    }
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getPlayersPerTeam(data) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] != null) {
        if (data[i][0] === 'Jogadores por time') {
          return data[i][1];
        }
      }
    }
  }

  function getNumberOfTeams(data) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] != null) {
        if (data[i][2] === 'Times na pelada') {
          return data[i][3];
        }
      }
    }
  }

  function handleTeamOverall(data, index) {
    const teamOverAll = data.map((e) => e.filter((e) => e !== undefined)).map((value) => value.reduce((acc, curr) => {
      if (curr) {
        return acc + Number(curr[overall].replace(',', '.'))
      }
    }, 0))
    
    return teamOverAll[index];
  }

  useEffect(() => {
    function getAllPlayers(data) {
      let allplayers = [];
      for (let i = 0; i <= data.length; i++) {
        if (data[i] != null) {
          if (data[i][confirmado] === 'sim') {
            allplayers.push(data[i]);
          }
        }
      }
      return allplayers;
    }

    function sortRandomly(data) {
      if (data) {
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
    let nrplayersPerTeam = getPlayersPerTeam(data);
    let nrTeams = getNumberOfTeams(data);

    console.log('Number of players per team= ' + nrplayersPerTeam);
    console.log('Number of teams = ' + nrTeams);
    console.log('Number of players on list = ' + playingPlayers.length);
    playingPlayers = sortRandomly(playingPlayers);

    algoritmoGuloso(playingPlayers, nrplayersPerTeam, nrTeams);
  }, [data, overall, confirmado]);

  const context = {
    overall,
    name,
    randomImg,
    data,
    checked,
    teams,
    setTeams,
    handleClick,
    handleClickWeb,
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile,
    imgUrl,
    posicao,
    handleTeamOverall
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Provider;
