import { Button, Input, Title } from '@components';
import { SCREENS } from '@constants';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import { useSignUp } from '../../hooks';
import { Fields, SignUpScreenProps } from './interfaces';

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [fields, setFields] = useState<Fields>({
    login: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isValid, setIsValid] = useState<boolean>(false);

  const { signUp, isLoading } = useSignUp();

  const onChange = (text: string, name: string) => {
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

    signUp(body);
  };

  // @ts-ignore
  const onSignIn = () => navigation.navigate(SCREENS.SIGN_IN);

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
            <Input
              theme="secondary"
              placeholder="Логин *"
              value={fields.login}
              onChangeText={(text) => onChange(text, 'login')}
            />
          </Field>
          <Field>
            <Input
              theme="secondary"
              placeholder="Е-mail"
              value={fields.email}
              onChangeText={(text) => onChange(text, 'email')}
            />
          </Field>
          <Field>
            <Input
              theme="secondary"
              placeholder="Пароль *"
              secureTextEntry
              value={fields.password}
              onChangeText={(text) => onChange(text, 'password')}
            />
          </Field>
          <Field>
            <Input
              theme="secondary"
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
