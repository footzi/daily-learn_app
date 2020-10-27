import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Item } from 'native-base';
import { ButtonLoader } from '@components';

export const CreateDictModal = ({ onCreate = () => {} }) => {
  const [name, setName] = useState('');

  const onChangeName = (text) => setName(text);

  return (
    <Container>
      <Name>
        <Item inlineLabel>
          <Input placeholder="Название" onChangeText={onChangeName} value={name} />
        </Item>
      </Name>
      <Save>
        <ButtonLoader
          success={!!name}
          name="Сохранить"
          width={130}
          disabled={!name}
          onPress={() => onCreate({ name })}
        />
      </Save>
    </Container>
  );
};

const Container = styled.View``;

const Name = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Save = styled.View`
  margin-top: 20px;
  align-items: center;
`;
