import React, { useState, useEffect } from 'react';
import { Form, Item, Input, H2, Button, Text } from 'native-base';
import styled from 'styled-components';
import { toSignIn } from '../store';
import { ButtonLoader } from '../components/buttons';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  signIn: fields => dispatch(toSignIn(fields))
});

const SignInScreen = ({ signIn }) => {
  const [fields, setFields] = useState({
    login: '',
    password: ''
  });

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
      password: fields.password
    };

    signIn({ body });
  };

  const onSignUp = () => {};

  useEffect(() => {
    if (fields.login && fields.password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fields]);

  return (
    <Container>
      <Header>
        <H2>Вход</H2>
      </Header>
      <Form>
        <Item>
          <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login.value} />
        </Item>
        <Item>
          <Input
            placeholder="Пароль"
            onChangeText={text => onChangeText('password', text)}
            value={fields.password.value}
          />
        </Item>
      </Form>
      <GroupButtons>
        <ButtonLoader theme="primary" disabled={!isValid} onPress={onSubmit} width={150} name="Войти" />
        <SignUp>
          <Button primary onPress={onSignUp}>
            <Text>Создать аккаунт</Text>
          </Button>
        </SignUp>
      </GroupButtons>
    </Container>
  );
};

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

const GroupButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20;
`;

const SignUp = styled.View`
  margin-left: 10px;
`;

SignInScreen.navigationOptions = {
  title: 'Вход'
};

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
