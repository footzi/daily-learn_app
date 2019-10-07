import React, { useEffect } from 'react';
import styled from 'styled-components';
import { H2, Text, Button } from 'native-base';
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
    <Container>
      <Title>
        <H2>Настройки</H2>
      </Title>
      <Content>
        <ButtonLoader warning onPress={toSignOut} name="Выйти" width={100} />
      </Content>
    </Container>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings'
};

const Container = styled.ScrollView`
  padding: 10px;
`;

const Title = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 20px;
`;

const Content = styled.View`
  flex: 1;
  align-items: flex-start;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
