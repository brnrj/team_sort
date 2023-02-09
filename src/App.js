import React, { useContext, useRef } from 'react';
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
    teamOverall
  } = useContext(Context);

  const form = useRef();

  return (
    <>
      <div className="App">
        <div data-testid="meme-image" className="Meme">
          {!checked ? (
            <div data-testid="logo-image" className="Logo">
            </div>
          ) : (
            <p data-testid="message">Boa Sorte a Todos!</p>
          )}
          {checked && (
            <div className="MemeCard">
              <img className="golden_border" src={imgUrl[randomImg]} alt="meme" />
            </div>
          )}
        </div>
        {!checked && !data.length ? (
          <div className="Inputs">
            <p data-testid="warning">Carregue o Arquivo CSV</p>
            <div className="inputs-buttons">
              <button data-testid="load-button" onClick={handleClickWeb}>Load from Google Drive</button>
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
          <button data-testid="sort-button"
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
        <form ref={form}>
          <div data-testid="teams" className="Main-Team">
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
                            ? 'player-info yellow'
                            : 'player-info white'}`
                        }
                      >
                        <span className="player_position">{value[posicao]}</span>
                        {value[name]}
                      </p>
                    ) : null
                  )}
                  <span>{teamOverall[index]}</span>
                </div>
              ))}
          </div>
        </form>
      </div>
    </>
  );
}
export default App;
