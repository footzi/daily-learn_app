import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { CenterModal, Button, Input } from '@components';
import { LOADING_ITEMS } from '@constants';
import { InitStateInterface } from '@store';
import { CreateDictModalProps } from '../interfaces';

export const CreateDictModal: React.FC<CreateDictModalProps> = ({ isOpenModal, closeModal, onCreate }) => {
  const [name, setName] = useState<string>('');
  const { loading } = useSelector((state: InitStateInterface) => state);
  const isLoading = loading[LOADING_ITEMS.INNER];

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
