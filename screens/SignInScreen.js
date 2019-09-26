import React, { useState, useEffect } from 'react';
import { Form, Item, Input, H2, Button, Text, Icon } from 'native-base';
import styled from 'styled-components';
import { toSignIn } from '../store';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  signIn: fields => dispatch(toSignIn(fields))
});

const SignInScreen = ({ signIn }) => {
  const [fields, setFields] = useState({
    login: {
      value: ''
    },
    password: {
      value: ''
    }
  });

  const [isValid, setIsValid] = useState(false);

  const onChangeText = (name, text) => {
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value: text
      }
    });
  };

  const onSubmit = () => {
    const body = {
      login: fields.login.value,
      password: fields.password.value
    };

    signIn({ body });
  };

  useEffect(() => {
    if (fields.login.value && fields.password.value) {
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
        <Item error={fields.login.error}>
          <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login.value} />
        </Item>
        <Item error={fields.login.error}>
          <Input
            placeholder="Пароль"
            onChangeText={text => onChangeText('password', text)}
            value={fields.password.value}
          />
        </Item>
      </Form>
      <Submit>
        <Button primary disabled={!isValid} onPress={onSubmit}>
          <Text>Войти</Text>
          <Spinner color='red' />
        </Button>
      </Submit>
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

const Submit = styled.View`
  align-items: center;
  margin-top: 20;
`;

SignInScreen.navigationOptions = {
  title: 'Вход'
};

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
