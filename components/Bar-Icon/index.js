import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NewColors as Colors } from '@constants';

export const BarIcon = ({ name, focused }) => (
  <Ionicons name={name} size={30} style={{ marginBottom: -3 }} color={focused ? Colors.grey : Colors.greyLight} />
);
