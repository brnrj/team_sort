import React, { useContext } from 'react';
import { CSVReader } from 'react-papaparse';
import './App.css';
import logo from './images/logo.jpeg';
import Context from './context/Context';

function CSVReader2() {
  const {
    randomImg,
    data,
    checked,
    teamX,
    handleClick,
    handleClickWeb,
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile,
    imgUrl,
    handleChange,
  } = useContext(Context);

  return (
    <>
      <div className="App">
        <label htmlFor="">Jogadores:
          <input name="input1" onChange={handleChange} type="number" />
        </label>
        <label htmlFor="">Times:
          <input name="input2" type="number" onChange={handleChange} />
        </label>
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
                      {value[0]}
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
export default CSVReader2;
