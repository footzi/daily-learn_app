import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  processing: state.processing
});

const ButtonLoader = ({ theme, onPress, width, disabled, name, processing }) => {
  return (
    <Button theme={theme} disabled={disabled} onPress={onPress} style={{ width }}>
      {processing ? (
        <Spinner color="white" style={{ flex: 1 }} />
      ) : (
        <Text style={{ flex: 1, textAlign: 'center' }}>{name}</Text>
      )}
    </Button>
  );
};

export default connect(mapStateToProps)(ButtonLoader);
