import React, { useContext } from 'react';
import { CSVReader } from 'react-papaparse';
import './App.css';
import imgUrl from './dataImages';
import Context from './context/Context';

function App() {
  const {
    checked,
    handleClick,
    handleClickWeb,
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile,
    randomImg,
    data,
    teams,
    posicao,
    name,
  } = useContext(Context);
  return (
    <>
      <div className="App">
        <div className="Meme">
          {!checked ? (
            <div className="Logo">
            </div>
          ) : (
            <p>Boa Sorte a Todos!</p>
          )}
          {checked && (
            <div className="MemeCard">
              <img className="golden_border" src={imgUrl[randomImg]} alt="meme" />
            </div>
          )}
        </div>
        {!checked && !data.length ? (
          <div className="Inputs">
            <p>Carregue o Arquivo CSV</p>
            <div className="inputs-buttons">
              <button onClick={handleClickWeb}>Load from Google Drive</button>
              <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
              >
                <span className="upload-button">Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>
          </div>
        ) : <div className="Inputs">
          <button
        disabled={!data.length}
        onClick={handleClick}
        className={
          !data.length || checked
            ? 'displayButtonFalse'
            : 'displayButtonTrue'
        }
      >
        #### Sortear Times ####
      </button>
        </div>}
        <div className="Main-Team">
          {checked &&
            teams.map((element, index) => (
              <div key={index} className="Team">
                <p className="titulo golden_border">{`Time ${index + 1}`}</p>
                {element.map((value, i) =>
                  value !== undefined ? (
                    <p
                      key={i}
                      className={`golden_border ${
                        index === 0
                          ? 'player-info blue'
                          : index === 1
                          ? 'player-info red'
                          : index === 2
                          ? 'player-info green'
                          : 'player-info pink'}`
                      }
                    >
                      <span className="player_position">{value[posicao]}</span>
                      {value[name]}
                    </p>
                  ) : null
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default App;
