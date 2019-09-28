import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/loader';
import { getMainData } from '../store';

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getMainData())
});

const mapStateToProps = state => ({
  auth: state.auth
});

const HomeScreen = ({ getData, navigation }) => {
  const { routeName } = navigation.state;
  useEffect(() => {
    getData();
  }, [routeName]);

  return <Loader />;
};

HomeScreen.navigationOptions = {
  title: 'HomeScreen'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
