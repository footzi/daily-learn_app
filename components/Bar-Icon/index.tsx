import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@constants';
import { BarIconProps } from './interface';

export const BarIcon: React.FC<BarIconProps> = ({ name, focused }) => (
  <Ionicons name={name} size={30} style={{ marginBottom: -3 }} color={focused ? Colors.primary : Colors.grey} />
);
