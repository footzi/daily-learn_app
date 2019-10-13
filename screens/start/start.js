import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as effects from './effects';
import * as commonEffects from '../../store/common-effects';

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data
});

const mapDispatchToProps = {
  checkInitAuth: effects.checkInitAuth,
  getMainData: commonEffects.getMainData,
  clearMainData: commonEffects.clearMainData
};

const StartScreen = ({ auth, data, navigation, checkInitAuth, getMainData, clearMainData }) => {
  useEffect(() => {
    checkInitAuth();

    console.log('')
  }, []);

  useEffect(() => {
    if (auth) {
      console.log('getData')
      getMainData();
    }

    if (!auth && auth !== '') {
      clearMainData();
      navigation.navigate('SignIn');
    }
  }, [auth]);

  useEffect(() => {
    if (data && data.dictionaries) {
      navigation.navigate('Main');
    }
  }, [data]);

  return <Loader />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
