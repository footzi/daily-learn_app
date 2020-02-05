import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Item, Input, H2, Button, Text, Content } from 'native-base';
import styled from 'styled-components/native';
import { ButtonLoader } from '@components';
import { toSignIn } from './effects';

export const SignInScreen = ({ navigation }) => {
  const [fields, setFields] = useState({
    login: '',
    password: ''
  });

  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = () => {
    const body = {
      login: fields.login,
      password: fields.password
    };

    dispatch(toSignIn(navigation, body));
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onChange = (text, name) => {
    setFields({
      ...fields,
      [name]: text
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
    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Container>
        <Header>
          <H2>Вход</H2>
        </Header>
        <Item>
          <Input placeholder="Логин" onChangeText={text => onChange(text, 'login')} value={fields.login} />
        </Item>
        <Item>
          <Input
            placeholder="Пароль"
            secureTextEntry
            onChangeText={text => onChange(text, 'password')}
            value={fields.password}
          />
        </Item>
        <GroupButtons>
          <ButtonLoader
            theme="primary"
            disabled={!isValid}
            onPress={onSubmit}
            width={150}
            name="Войти"
            testID="submit"
          />
          <SignUp>
            <Button primary onPress={onSignUp}>
              <Text>Создать аккаунт</Text>
            </Button>
          </SignUp>
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

const SignUp = styled.View`
  margin-left: 10px;
`;

SignInScreen.navigationOptions = {
  title: 'Вход'
};
