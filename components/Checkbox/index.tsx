import { Feather } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';

import { CheckboxProps } from './interfaces';
import { themes } from './themes';

export const Checkbox: React.FC<CheckboxProps> = ({ theme = 'primary', isChecked = false, onPress }) => (
  <ThemeProvider theme={themes[theme]}>
    <Container onPress={onPress}>
      {isChecked && <Feather name="check" size={18} color={themes[theme].iconColor} />}
    </Container>
  </ThemeProvider>
);

const Container = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
