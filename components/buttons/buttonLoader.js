import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  processing: state.processing
});

const ButtonLoader = ({ onPress, width, disabled, name, processing, ...rest }) => {
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

export default connect(mapStateToProps)(ButtonLoader);
