import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

export const Spinner: React.FC<ActivityIndicatorProps> = ({ size = 50, color }) => (
  <ActivityIndicator size={size} color={color} />
);
