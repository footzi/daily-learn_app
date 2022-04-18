import { Colors } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { BarIconProps } from './interface';

export const BarIcon: React.FC<BarIconProps> = ({ name, focused }) => (
  // @ts-ignore
  <Ionicons name={name} size={30} style={{ marginBottom: -3 }} color={focused ? Colors.primary : Colors.grey} />
);
