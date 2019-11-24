import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as commonEffects from '../../store/common-effects';

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = {
  setMainData: commonEffects.setMainData
};

const StartScreen = ({ data, navigation, setMainData }) => {
  useEffect(() => {
    setMainData({ navigation });
  }, []);

  useEffect(() => {
    if (data) {
      navigation.navigate('Main');
    }
  }, [data]);

  return <Loader />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
