import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Item } from 'native-base';
import ButtonLoader from '../../components/buttons';

const CreateDictionaryScreen = () => {
  const [name, setName] = useState('');

  const onChangeName = text => {
    setName(text);
  };

  return (
    <Container>
      <Name>
        <Item inlineLabel>
          <Input placeholder="Название" onChangeText={onChangeName} value={name} />
        </Item>
      </Name>

      <Save>
        <ButtonLoader success name="Cохранить" width={130} disabled={!name} />
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

export default CreateDictionaryScreen;
