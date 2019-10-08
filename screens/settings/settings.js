import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import ButtonLoader from '../../components/buttons';
import * as effects from './effects';

const mapDispatchToProps = {
  getData: effects.getSettingsData,
  toSignOut: effects.toSignOut
};

const mapStateToProps = state => ({
  auth: state.auth
});

const SettingsScreen = ({ getData, auth, toSignOut, navigation }) => {
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!auth) {
      navigation.navigate('SignIn');
    }
  }, [auth]);

  return (
    <Content>
      <Container>
        <ButtonLoader warning onPress={toSignOut} name="Выйти" width={100} />
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
