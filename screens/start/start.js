import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as effects from './effects';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  checkInitAuth: effects.checkInitAuth
};

const StartScreen = ({ auth, navigation, checkInitAuth }) => {
  useEffect(() => {
    checkInitAuth();
  }, []);

  useEffect(() => {
    console.log(auth);
    if (auth) {
      navigation.navigate('Main');
    } else {
      // navigation.navigate('SignIn');
    }

    if (!auth && auth !== '') {
      navigation.navigate('SignIn');
    }
  }, [auth]);

  return <Loader />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
