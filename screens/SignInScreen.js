import React, { useState, useEffect } from 'react';
import { Item, Input, H2, Button, Text, View } from 'native-base';
import styled from 'styled-components';
import { toSignIn, checkInitAuth } from '../store';
import ButtonLoader from '../components/buttons';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  signIn: fields => dispatch(toSignIn(fields)),
  checkInitAuth: () => dispatch(checkInitAuth())
});

const mapStateToProps = state => ({
  auth: state.auth
});

const SignInScreen = ({ signIn, navigation, checkInitAuth, auth }) => {
  console.log(auth);

  const [fields, setFields] = useState({
    login: '',
    password: ''
  });

  const [isValid, setIsValid] = useState(false);

  const onChangeText = (name, text) => {
    setFields({
      ...fields,
      [name]: text
    });
  };

  const onSubmit = () => {
    const body = {
      login: fields.login,
      password: fields.password
    };

    signIn({ body });
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    if (fields.login && fields.password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fields]);

  useEffect(() => {
    checkInitAuth();
  }, []);

  useEffect(() => {
    if (auth) {
      navigation.navigate('Main');
    }
  }, [auth]);

  if (auth) {
    return <View />;
  }

  return (
    <Container>
      <Header>
        <H2>Вход</H2>
      </Header>
      <Item>
        <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login.value} />
      </Item>
      <Item>
        <Input
          placeholder="Пароль"
          onChangeText={text => onChangeText('password', text)}
          value={fields.password.value}
        />
      </Item>
      <GroupButtons>
        <ButtonLoader theme="primary" disabled={!isValid} onPress={onSubmit} width={150} name="Войти" />
        <SignUp>
          <Button primary onPress={onSignUp}>
            <Text>Создать аккаунт</Text>
          </Button>
        </SignUp>
      </GroupButtons>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-left: 15px;
  padding-right: 15px;
`;

const Header = styled.Text`
  margin-bottom: 30;
  text-align: center;
`;

const GroupButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20;
`;

const SignUp = styled.View`
  margin-left: 10px;
`;

SignInScreen.navigationOptions = {
  title: 'Вход'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
