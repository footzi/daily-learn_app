import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Input, H2, Button, Text } from 'native-base';
import styled from 'styled-components';
import ButtonLoader from '../../components/buttons';
import * as effects from './effects';

const mapDispatchToProps = {
  toSignIn: effects.toSignIn
};

const mapStateToProps = state => ({
  auth: state.auth
});

const SignInScreen = ({ toSignIn, navigation, auth }) => {
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

    toSignIn({ body });
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    if (fields.login && fields.password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fields]);

  useEffect(() => {
    if (auth) {
      navigation.navigate('Main');
    }
  }, [auth]);

  return (
    <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Container>
        <Header>
          <H2>Вход</H2>
        </Header>
        <Item>
          <Input placeholder="Логин" onChangeText={text => onChangeText('login', text)} value={fields.login.value} />
        </Item>
        <Item>
          <Input
            placeholder="Пароль"
            secureTextEntry
            onChangeText={text => onChangeText('password', text)}
            value={fields.password.value}
          />
        </Item>
        <GroupButtons>
          <ButtonLoader theme="primary" disabled={!isValid} onPress={onSubmit} width={150} name="Войти" />
          <SignUp>
            <Button primary onPress={onSignUp}>
              <Text>Создать аккаунт</Text>
            </Button>
          </SignUp>
        </GroupButtons>
      </Container>
    </KeyboardAwareScrollView>
  );
};

const Container = styled.View`
  padding-left: 15px;
  padding-right: 15px;
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
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
