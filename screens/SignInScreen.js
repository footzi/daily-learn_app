import React from 'react';
import {Form, Item, Input, H2, Button, Text } from 'native-base';
import styled from 'styled-components';

const SignInScreen = () => {
  return (
    <Container>
      <Header>
        <H2>Вход</H2>
      </Header>
      <Form>
        <Item>
          <Input placeholder="Логин" />
        </Item>
        <Item last>
          <Input placeholder="Пароль" />
        </Item>
      </Form>
      <Submit>
        <Button primary>
          <Text>Войти</Text>
        </Button>
      </Submit>
      
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
	align-items: stretch;
`;

const Header = styled.Text`
  margin-bottom: 30;
  text-align: center;
`;

const Submit = styled.View`
  align-items: center;
  margin-top: 20;
`;

SignInScreen.navigationOptions = {
  title: 'Вход',
};

export default SignInScreen;