import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as effects from './effects';

const mapDispatchToProps = {
  getMainData: effects.getMainData
};

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home
});

const HomeScreen = ({ getMainData, home, navigation }) => {
  const { routeName } = navigation.state;
  useEffect(() => {
    getMainData();
  }, [routeName]);

  if (!home) {
    return <Loader />;
  }

  return <Text>{home.dictionary}</Text>;
};

HomeScreen.navigationOptions = {
  title: 'HomeScreen'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
