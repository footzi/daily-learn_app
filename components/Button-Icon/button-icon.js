import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

export const ButtonIcon = ({ children, onPress = () => {}, style = {} }) => {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={onPress}>{children}</TouchableWithoutFeedback>
    </View>
  );
};
