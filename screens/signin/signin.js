import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { LOADING_ITEMS } from '@constants';
import { Button, Input, Title } from '@components';
import { toSignIn } from './effects';

export const SignInScreen = ({ navigation = {} }) => {
  const { loading } = useSelector((state) => state);
  const isLoading = loading[LOADING_ITEMS.INNER];
  const [fields, setFields] = useState({
    login: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = () => {
    const body = {
      login: fields.login,
      password: fields.password,
    };

    dispatch(toSignIn(body));
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onChange = (text, name) => {
    setFields({
      ...fields,
      [name]: text,
    });
  };

  useEffect(() => {
    if (fields.login && fields.password) {
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
        <Title>Вход</Title>
        <Form>
          <Field>
            <Input placeholder="Логин" value={fields.login} onChangeText={(text) => onChange(text, 'login')} />
          </Field>
          <Field>
            <Input
              placeholder="Пароль"
              secureTextEntry
              value={fields.password}
              onChangeText={(text) => onChange(text, 'password')}
            />
          </Field>
        </Form>
        <Buttons>
          <Button
            theme="secondary"
            onPress={onSubmit}
            text="Войти"
            width={110}
            disabled={!isValid}
            useLoader={isLoading}
          />
          <Button theme="secondary" onPress={onSignUp} text="Создать аккаунт" testID="submit" width={170} />
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

SignInScreen.navigationOptions = {
  title: 'Вход',
};
