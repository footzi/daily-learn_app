import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { InputProps } from './interfaces';
import { themes } from './themes';

export const Input: React.FC<InputProps> = ({ theme = 'primary', value = '', paddingRight, ...restProps }) => {
  const currentTheme = themes[theme];
  const [borderColor, setBorderColor] = useState(value ? currentTheme.borderFocusColor : currentTheme.borderColor);

  const onFocus = () => setBorderColor(currentTheme.borderFocusColor);
  const onBlur = () => setBorderColor(currentTheme.borderColor);

  return (
    <TextInput
      placeholderTextColor={currentTheme.placeholderColor}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        fontFamily: 'Museo',
        fontSize: 16,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingRight,
        color: currentTheme.color,
      }}
      value={value}
      {...restProps}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
