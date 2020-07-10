import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Spinner = ({ size = 'large', color }) => {
  return <ActivityIndicator size={size} color={color} />;
};
