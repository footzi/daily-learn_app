import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as commonEffects from '../../store/common-effects';

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = {
  getMainData: commonEffects.getMainData
};

const StartScreen = ({ data, navigation, getMainData }) => {
  useEffect(() => {
    getMainData({ navigation });
  }, []);

  useEffect(() => {
    if (data) {
      navigation.navigate('Main');
    } else {
      // navigation.navigate('SignIn');
    }
  }, [data]);

  return <Loader />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
