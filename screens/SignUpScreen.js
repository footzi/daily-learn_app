import React, { useState, useEffect } from 'react';
import { Item, Input, H2, Button, Text } from 'native-base';
import styled from 'styled-components';
import { toSignUp } from '../store';
import ButtonLoader from '../components/buttons';
import { connect } from 'react-redux';

const initFields = {
  login: '',
  email: '',
  password: '',
  password2: ''
};

const mapDispatchToProps = dispatch => ({
  signUp: fields => dispatch(toSignUp(fields))
});

const SignUpScreen = ({ signUp, navigation }) => {
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

    signUp({ body });
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

  return (
    <Container>
      <Header>
        <H2>Регистрация</H2>
      </Header>
      <Item>
        <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login} />
      </Item>
      <Item>
        <Input placeholder="Е-mail" onChangeText={text => onChangeText('email', text)} value={fields.email} />
      </Item>
      <Item>
        <Input
          placeholder="Пароль"
          secureTextEntry
          onChangeText={text => onChangeText('password', text)}
          value={fields.password}
        />
      </Item>
      <Item>
        <Input
          type="password"
          secureTextEntry
          placeholder="Подтвердите пароль"
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

const SignIn = styled.View`
  margin-left: 10px;
`;

SignUpScreen.navigationOptions = {
  title: 'Регистрация'
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);
