import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { LOADING_ITEMS, SCREENS } from '@constants';
import { Button, Input, Title } from '@components';
import { InitStateInterface } from '@store';
import { SignInScreenProps, Fields } from './interfaces';
import { toSignIn } from './effects';
import { Container, Form, Field, Buttons } from "./styles";

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [fields, setFields] = useState<Fields>({
    login: '',
    password: '',
  });

  const isLoading = true;

  const [isValid, setIsValid] = useState<boolean>(false);
  // const dispatch = useDispatch();

  const onSubmit = () => {
    const body = {
      login: fields.login,
      password: fields.password,
    };

    // dispatch(toSignIn(body));
  };

  const onSignUp = () => {
    navigation.navigate(SCREENS.SIGN_UP);
  };

  const onChange = (text: string, name: string) => {
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
            <Input
              theme="secondary"
              placeholder="Логин"
              value={fields.login}
              onChangeText={(text: string) => onChange(text, 'login')}
            />
          </Field>
          <Field>
            <Input
              theme="secondary"
              placeholder="Пароль"
              secureTextEntry
              value={fields.password}
              onChangeText={(text: string) => onChange(text, 'password')}
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
