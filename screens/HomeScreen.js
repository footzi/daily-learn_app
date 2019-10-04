import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import Loader from '../components/loader';
import { getMainData } from '../store';

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getMainData())
});

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home
});

const HomeScreen = ({ getData, home, navigation }) => {
  const { routeName } = navigation.state;
  useEffect(() => {
    getData();
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
