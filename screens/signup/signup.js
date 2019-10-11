import React, { useState, useEffect } from 'react';
import { Item, Input, H2, Button, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import ButtonLoader from '../../components/buttons';
import { connect } from 'react-redux';
import * as effects from './effects';

const initFields = {
  login: '',
  email: '',
  password: '',
  password2: ''
};

const mapDispatchToProps = {
  toSignUp: effects.toSignUp
};

const mapStateToProps = state => ({
  auth: state.auth
});

const SignUpScreen = ({ toSignUp, navigation, auth }) => {
  const [fields, setFields] = useState(initFields);
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
      email: fields.email,
      password: fields.password
    };

    toSignUp({ body });
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    const isPasswordsMatch = fields.password === fields.password2;
    const isPasswordNotEmpty = fields.password && fields.password2;

    if (fields.login && isPasswordsMatch && isPasswordNotEmpty) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fields]);

  useEffect(() => {
    if (auth) {
      navigation.navigate('Main');
    }
  }, [auth]);

  return (
    <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Container>
        <Header>
          <H2>Регистрация</H2>
        </Header>
        <Item>
          <Input placeholder="Логин *" onChangeText={text => onChangeText('login', text)} value={fields.login} />
        </Item>
        <Item>
          <Input placeholder="Е-mail" onChangeText={text => onChangeText('email', text)} value={fields.email} />
        </Item>
        <Item>
          <Input
            placeholder="Пароль *"
            secureTextEntry
            onChangeText={text => onChangeText('password', text)}
            value={fields.password}
          />
        </Item>
        <Item>
          <Input
            type="password"
            secureTextEntry
            placeholder="Подтвердите пароль *"
            onChangeText={text => onChangeText('password2', text)}
            value={fields.password2}
          />
        </Item>
        <GroupButtons>
          <ButtonLoader theme="primary" disabled={!isValid} onPress={onSubmit} width={200} name="Создать аккаунт" />
          <SignIn>
            <Button primary onPress={onSignIn}>
              <Text>Войти</Text>
            </Button>
          </SignIn>
        </GroupButtons>
      </Container>
    </KeyboardAwareScrollView>
  );
};

const Container = styled.View`
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

const SignIn = styled.View`
  margin-left: 10px;
`;

SignUpScreen.navigationOptions = {
  title: 'Регистрация'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
