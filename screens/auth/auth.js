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

const AuthScreen = ({ auth, navigation, checkInitAuth }) => {
  useEffect(() => {
    checkInitAuth();
  }, []);

  useEffect(() => {
    if (auth) {
      navigation.navigate('Start');
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
)(AuthScreen);
