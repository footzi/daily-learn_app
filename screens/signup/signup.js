import React, { useState, useEffect } from 'react';
import { Item, Input, H2, Button, Text, Content } from 'native-base';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { ButtonLoader } from '@components';
import { toSignUp } from './effects';

export const SignUpScreen = ({ navigation }) => {
  const [fields, setFields] = useState({
    login: '',
    email: '',
    password: '',
    password2: ''
  });
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onChange = (text, name) => {
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

    dispatch(toSignUp(body));
  };

  const onSignIn = () => navigation.navigate('SignIn');

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
    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Container>
        <Header>
          <H2>Регистрация</H2>
        </Header>
        <Item>
          <Input placeholder="Логин *" onChangeText={text => onChange(text, 'login')} value={fields.login} />
        </Item>
        <Item>
          <Input placeholder="Е-mail" onChangeText={text => onChange(text, 'email')} value={fields.email} />
        </Item>
        <Item>
          <Input
            placeholder="Пароль *"
            secureTextEntry
            onChangeText={text => onChange(text, 'password')}
            value={fields.password}
          />
        </Item>
        <Item>
          <Input
            type="password"
            secureTextEntry
            placeholder="Подтвердите пароль *"
            onChangeText={text => onChange(text, 'password2')}
            value={fields.password2}
          />
        </Item>
        <GroupButtons>
          <ButtonLoader
            theme="primary"
            disabled={!isValid}
            onPress={onSubmit}
            width={200}
            name="Создать аккаунт"
            testID="submit"
          />
          <SignIn>
            <Button primary onPress={onSignIn}>
              <Text>Войти</Text>
            </Button>
          </SignIn>
        </GroupButtons>
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding-left: 15px;
  padding-right: 15px;
`;

const Header = styled.Text`
  margin-bottom: 30px;
  text-align: center;
`;

const GroupButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SignIn = styled.View`
  margin-left: 10px;
`;

SignUpScreen.navigationOptions = {
  title: 'Регистрация'
};
