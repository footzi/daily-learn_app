import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { render, fireEvent, wait } from '@testing-library/react-native';
import { Field } from './index';
import { Field2 } from './field2';
import { store } from '../../store';

describe('test', () => {
  it.skip('hello', () => {
    const component = shallow(<Field />);
    expect(component).toMatchSnapshot();
  });
});
