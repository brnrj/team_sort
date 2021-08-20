import React from 'react';
import { render } from '@testing-library/react';
import Provider from './context/Provider';
import App from './App';
import userEvent from '@testing-library/user-event';

test('Renderiza a logo do futebol, o aviso e os botões para carregar o arquivo csv', async () => {
  const { findByTestId, getByText } = render(
    <Provider>
      <App />
    </Provider>
  );
  const logo = await findByTestId('logo-image');
  const warning = await findByTestId('warning');
  const dropCsv = getByText('Drop CSV file here or click to upload.');
  const loadCsv = getByText('Load from Google Drive');

  expect(logo).toBeTruthy();
  expect(warning).toBeTruthy();
  expect(dropCsv).toBeTruthy();
  expect(loadCsv).toBeTruthy();
});

test('Ao clicar em load from Google Drive o botão para o sorteio dos times deve aparecer e ao clicar em sortear times o sorteio deve ser feito', async() => {
  const { getByTestId, findByTestId } = render(
    <Provider>
      <App />
    </Provider>
  )

  userEvent.click(getByTestId('load-button'));

  const sortButton = await findByTestId('sort-button');
  
  expect(sortButton).toBeTruthy();

  userEvent.click(getByTestId('sort-button'));
  
  const message = await findByTestId('message');
  const memeImage = await findByTestId('meme-image');
  const teams = await findByTestId('teams');
  
  expect(message).toBeTruthy();
  expect(memeImage).toBeTruthy();
  expect(teams).toBeTruthy();
})