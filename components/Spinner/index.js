import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Spinner = ({ size = 50, color }) => <ActivityIndicator size={size} color={color} />;
