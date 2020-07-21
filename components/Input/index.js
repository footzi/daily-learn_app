import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { themes } from './themes';

export const Input = ({ theme = 'primary', value = '', ...restProps }) => {
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
        color: currentTheme.color,
      }}
      value={value}
      {...restProps}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
