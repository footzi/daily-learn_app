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
      style={{
        ...currentTheme,
        borderColor,
      }}
      placeholderTextColor={currentTheme.placeholderTextColor}
      selectionColor={currentTheme.selectionColor}
      value={value}
      {...restProps}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
