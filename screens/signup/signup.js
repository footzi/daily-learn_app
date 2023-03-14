import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { LOADING_ITEMS } from '@constants';
import { Button, Input, Title } from '@components';
import BackgroundImage from '@/assets/images/entry-background.svg';
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
    <>
      <Background />
      <Container>
        <Title>Регистрация</Title>
        <Form>
          <Field>
            {/*@todo разобраться с данными для регистрации пользователя*/}
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
            theme="primary"
            onPress={onSubmit}
            text="Создать аккаунт"
            testID="submit"
            isDisabled={!isDisabled}
            isLoading={isLoading}
          />
          <LastButton>
            <Button theme="secondary" onPress={onSignIn} text="Войти" />
          </LastButton>
        </Buttons>
      </Container>
    </>
  );
};

const Background = styled(BackgroundImage)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const Form = styled.View`
  margin-top: 32px;
`;

const Field = styled.View`
  margin-bottom: 20px;
`;

const Buttons = styled.View`
  margin-top: 26px;
`;

const LastButton = styled.View`
  margin-top: 12px;
`;
