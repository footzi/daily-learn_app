import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { ButtonLoader } from '@components';
import * as effects from './effects';

const mapDispatchToProps = {
  toSignOut: effects.toSignOut
};

const mapStateToProps = state => ({
  // auth: state.auth
});

const SettingsScreen = ({ toSignOut, navigation }) => {
  const onSignOut = () => {
    toSignOut({ navigation });
  };

  return (
    <Content>
      <Container>
        <ButtonLoader warning onPress={onSignOut} name="Выйти" width={100} />
      </Container>
    </Content>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Настройки'
};

const Container = styled.View`
  padding: 10px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
