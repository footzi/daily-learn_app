import React, { useState, useEffect } from 'react';
import { Item, Input, H2, Button, Text, Spinner } from 'native-base';
import styled from 'styled-components';
import { toSignUp } from '../store';
import { connect } from 'react-redux';

const initFields = {
  login: '',
  email: '',
  password: '',
  password2: ''
};

const mapDispatchToProps = dispatch => ({
  signUp: fields => dispatch(toSignUp(fields))
});

const SignUpScreen = ({ signUp }) => {
  const [fields, setFields] = useState(initFields);
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
      email: fields.email,
      password: fields.password
    };

    signUp({ body });
  };

  useEffect(() => {
    const isPasswordsMatch = fields.password === fields.password2;

    if (fields.login && isPasswordsMatch) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fields]);

  return (
    <Container>
      <Header>
        <H2>Регистрация</H2>
      </Header>
      <Item>
        <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login} />
      </Item>
      <Item>
        <Input placeholder="Е-mail" onChangeText={text => onChangeText('email', text)} value={fields.email} />
      </Item>
      <Item>
        <Input
          placeholder="Пароль"
          secureTextEntry
          onChangeText={text => onChangeText('password', text)}
          value={fields.password}
        />
      </Item>
      <Item>
        <Input
          type="password"
          secureTextEntry
          placeholder="Подтвердите пароль"
          onChangeText={text => onChangeText('password2', text)}
          value={fields.password2}
        />
      </Item>
      <Submit>
        <Button primary disabled={!isValid} onPress={onSubmit} style={{width: 200}}>
          <Spinner color='white' style={{flex: 1}}/>
          {/* <Text>Создать аккаунт</Text> */}
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
  padding-left: 15px;
  padding-right: 15px;
`;

const Header = styled.Text`
  margin-bottom: 30;
  text-align: center;
`;

const Submit = styled.View`
  align-items: center;
  margin-top: 20;
`;

SignUpScreen.navigationOptions = {
  title: 'Регистрация'
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);
