import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { LOADING_ITEMS } from '@constants';
import { Button, Input, Title } from '@components';
import { toSignIn } from './effects';
import BackgroundImage from '@/assets/images/entry-background.svg';

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
    <>
      <Background />
      <Container>
        <Title>Вход</Title>
        <Form>
          <Field>
            <Input placeholder="E-mail" value={fields.login} onChangeText={(text) => onChange(text, 'login')} />
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
          <Button theme="primary" onPress={onSubmit} text="Войти" isDisabled={!isValid} isLoading={isLoading} />
          <LastButton>
            <Button theme="secondary" onPress={onSignUp} text="Создать аккаунт" testID="submit" />
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
