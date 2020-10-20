import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { themes } from './themes';

type Props = {
  theme: 'primary' | 'secondary';
  isChecked: boolean;
  onPress: () => void;
};

type ContainerProps = {
  theme: themes.primary | themes.secondary;
};

export const Checkbox: React.FC<Props> = ({ theme = 'primary', isChecked = false, onPress }) => (
  <ThemeProvider theme={themes[theme]}>
    <Container onPress={onPress}>
      {isChecked && <Feather name="check" size={18} color={themes[theme].iconColor} />}
    </Container>
  </ThemeProvider>
);

const Container = styled.TouchableOpacity<ContainerProps>`
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
