import React, { useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, View } from 'native-base';
import { actions } from '../../store';

export const Field2 = () => {
  const test = useSelector(state => state.test)
  const dispatch = useDispatch();

  const onChange = (text) => dispatch(actions.setTest(text));

  return (
    <View>
      <Input testID="test" placeholder="Логин" onChangeText={text => onChange(text)} value={test} />
    </View>
  )
}