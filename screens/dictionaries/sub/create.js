import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Input, Item } from 'native-base';
import { ButtonLoader } from '@components';
import * as effects from '../effects';

const mapDispatchToProps = {
  createDictionary: effects.createDictionary
};

const CreateDictionaryScreen = ({ navigation, createDictionary }) => {
  const [name, setName] = useState('');

  const onChangeName = text => {
    setName(text);
  };

  const onSave = () => {
    const body = { name };
    createDictionary({ navigation, body });
  };

  return (
    <Container>
      <Name>
        <Item inlineLabel>
          <Input placeholder="Название" onChangeText={onChangeName} value={name} />
        </Item>
      </Name>

      <Save>
        <ButtonLoader success={!!name} name="Cохранить" width={130} disabled={!name} onPress={onSave} />
      </Save>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const Name = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Save = styled.View`
  flex: 1;
  margin-top: 30px;
  align-items: center;
`;

CreateDictionaryScreen.navigationOptions = {
  title: 'Новый словарь'
};

export default connect(
  null,
  mapDispatchToProps
)(CreateDictionaryScreen);
