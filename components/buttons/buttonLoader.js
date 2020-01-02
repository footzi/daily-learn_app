import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import { useSelector } from 'react-redux';

export const ButtonLoader = ({ onPress, width, disabled, name, ...rest }) => {
  const processing = useSelector(state => state.processing);

  return (
    <Button disabled={disabled} onPress={onPress} style={{ width }} {...rest}>
      {processing ? (
        <Spinner color="white" style={{ flex: 1 }} />
      ) : (
        <Text style={{ flex: 1, textAlign: 'center' }}>{name}</Text>
      )}
    </Button>
  );
};
