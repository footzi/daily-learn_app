import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { getSettingsData } from '../store';

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getSettingsData())
});

const mapStateToProps = state => ({
  auth: state.auth
});

const SettingsScreen = ({ getData }) => {
  useEffect(() => {
    getData();
  }, []);

  return <Text>Settings</Text>;
};

SettingsScreen.navigationOptions = {
  title: 'Settings'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

// import React from 'react';
// import { ExpoConfigView } from '@expo/samples';

// export default function SettingsScreen() {
//   /**
//    * Go ahead and delete ExpoConfigView and replace it with your content;
//    * we just wanted to give you a quick view of your config.
//    */
//   return <ExpoConfigView />;
// }

// SettingsScreen.navigationOptions = {
//   title: 'app.json',
// };
