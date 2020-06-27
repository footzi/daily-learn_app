import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import { useSelector } from 'react-redux';
import { LOADING_ITEMS } from '@constants';

export const ButtonLoader = ({ onPress, width, disabled, name, ...rest }) => {
  const { loading } = useSelector((state) => state);
  const isLoader = loading[LOADING_ITEMS.INNER];

  return (
    <Button disabled={disabled} onPress={onPress} style={{ width }} {...rest}>
      {isLoader ? (
        <Spinner color="white" style={{ flex: 1 }} />
      ) : (
        <Text style={{ flex: 1, textAlign: 'center' }}>{name}</Text>
      )}
    </Button>
  );
};
