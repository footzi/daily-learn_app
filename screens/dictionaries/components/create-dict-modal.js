import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, CenterModal, Input } from '@/components';

export const CreateDictModal = ({ isOpenModal, isLoading, closeModal, onCreate }) => {
  const [name, setName] = useState('');

  const handleChangeName = (text) => setName(text);
  const handleSave = () => onCreate({ name });

  return (
    <CenterModal isOpenModal={isOpenModal} closeModal={closeModal} title="Создаем новый словарь">
      <Container>
        <Field>
          <Input theme="bordered" placeholder="Название" onChangeText={handleChangeName} value={name} />
        </Field>

        <Save>
          <Button text="Сохранить" theme="secondary" onPress={handleSave} isLoading={isLoading} />
        </Save>
      </Container>
    </CenterModal>
  );
};

const Container = styled.View``;

const Field = styled.View`
  flex-direction: row;
`;

const Save = styled.View`
  margin-top: 32px;
`;
