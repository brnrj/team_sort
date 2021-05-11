import React, { useContext } from 'react';
import { CSVReader } from 'react-papaparse';
import './App.css';
import logo from './images/logo.png';
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
              <h4>Random Team Generator</h4>
              <img src={logo} alt="logo" />
            </div>
          ) : (
            <p>Boa Sorte a Todos!</p>
          )}
          {checked && (
            <div className="MemeCard">
              <img src={imgUrl[randomImg]} alt="meme" />
            </div>
          )}
        </div>
        {!checked && !data.length ? (
          <div className="Inputs">
            <p>Carregue o Arquivo CSV</p>
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
        Agora Clica Aqui!
      </button>
        </div>}
        <div className="Main-Team">
          {checked &&
            teams.map((element, index) => (
              <div key={index} className="Team">
                <p className="titulo">{`Time${index + 1}`}</p>
                {element.map((value, i) =>
                  value !== undefined ? (
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
                      {`${value[posicao]} - ${value[name]}`}
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
