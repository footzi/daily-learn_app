import { Button, CenterModal, Input } from '@components';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { CreateDictModalProps } from '../interfaces';

export const CreateDictModal: React.FC<CreateDictModalProps> = ({ isOpenModal, isLoading, closeModal, onCreate }) => {
  const [name, setName] = useState<string>('');

  const onChangeName = (text: string) => setName(text);
  const onSave = () => onCreate(name);

  useEffect(() => {
    if (!isLoading) {
      setName('');
    }
  }, [isLoading]);

  return (
    <CenterModal theme="primary" title="Введите название" isOpenModal={isOpenModal} closeModal={closeModal}>
      <Input theme="secondary" onChangeText={onChangeName} value={name} />
      <Save>
        <Button theme="secondary" text="Создать" onPress={onSave} useLoader={isLoading} disabled={!name} />
      </Save>
    </CenterModal>
  );
};

const Save = styled.View`
  margin-top: 30px;
`;
