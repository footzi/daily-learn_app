import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, wait } from '@testing-library/react-native';
import { Field } from './index';
import { Field2 } from './field2';
import { store } from '../../store';

test('amm', async () => {
  const { queryByTestId } = render(<Field />);
  const text = 'Привет';

  const input = queryByTestId('test');

  fireEvent.changeText(input, text);

  await wait(() => {
    expect(queryByTestId('test').props.value).toBe(text);
  });
});



test('can render with redux with defaults', async () => {
  const { queryByTestId } = renderWithRedux(<Field2 />);
  const text = 'Привет';

  const input = queryByTestId('test');

  fireEvent.changeText(input, text);

  await wait(() => {
    expect(queryByTestId('test').props.value).toBe(text);
  });
});
