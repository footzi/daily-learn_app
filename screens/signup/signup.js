import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { LOADING_ITEMS } from '@constants';
import { Button, Input, Title } from '@components';
import { toSignUp } from './effects';

export const SignUpScreen = ({ navigation = {} }) => {
  const { loading } = useSelector((state) => state);
  const isLoading = loading[LOADING_ITEMS.INNER];
  const [fields, setFields] = useState({
    login: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onChange = (text, name) => {
    setFields({
      ...fields,
      [name]: text,
    });
  };

  const onSubmit = () => {
    const body = {
      login: fields.login,
      email: fields.email,
      password: fields.password,
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
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/images/entry-figure.png')}
      style={{ width: '100%', height: '100%' }}>
      <Container>
        <Title>Регистрация</Title>
        <Form>
          <Field>
            <Input placeholder="Логин *" value={fields.login} onChangeText={(text) => onChange(text, 'login')} />
          </Field>
          <Field>
            <Input placeholder="Е-mail" value={fields.login} onChangeText={(text) => onChange(text, 'login')} />
          </Field>
          <Field>
            <Input
              placeholder="Пароль *"
              secureTextEntry
              value={fields.password}
              onChangeText={(text) => onChange(text, 'password')}
            />
          </Field>
          <Field>
            <Input
              placeholder="Повторите пароль *"
              secureTextEntry
              value={fields.password2}
              onChangeText={(text) => onChange(text, 'password2')}
            />
          </Field>
        </Form>
        <Buttons>
          <Button
            theme="secondary"
            onPress={onSubmit}
            text="Создать аккаунт"
            testID="submit"
            width={170}
            disabled={!isValid}
            useLoader={isLoading}
          />
          <Button theme="secondary" onPress={onSignIn} text="Войти" width={110} />
        </Buttons>
      </Container>
    </ImageBackground>
  );
};
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 35px;
  padding-right: 35px;
`;

const Form = styled.View`
  margin-top: 56px;
`;

const Field = styled.View`
  margin-bottom: 20px;
`;

const Buttons = styled.View`
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

SignUpScreen.navigationOptions = {
  title: 'Регистрация',
};
