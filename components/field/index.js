import React, { useState }from 'react';
import { Input, View } from 'native-base';

export const Field = () => {
  const [field, setField] = useState('');

  return (
    <View>
      <Input testID="test" placeholder="Логин" onChangeText={text => setField(text)} value={field} />
    </View>
  )
}