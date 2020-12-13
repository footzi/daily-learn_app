import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { CenterModal, Button } from '@components';
import { LOADING_ITEMS } from '@constants';
import { InitStateInterface } from '@store';
import { DeleteDictModalProps } from '../interfaces';

export const DeleteDictModal: React.FC<DeleteDictModalProps> = ({ dict, isOpenModal, closeModal, onDelete }) => {
  const { loading } = useSelector((state: InitStateInterface) => state);
  const isLoading = loading[LOADING_ITEMS.INNER];

  if (!dict) {
    return null;
  }

  return (
    <CenterModal
      theme="secondary"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
      title={
        <>
          Удалить словарь{'\n'}
          <Name>«{dict.name}»</Name>?
        </>
      }>
      <Buttons>
        <Button theme="secondary" onPress={closeModal} text="Нет" width={100} />
        <Button theme="secondary" onPress={onDelete} text="Да" width={100} useLoader={isLoading} />
      </Buttons>
    </CenterModal>
  );
};

const Buttons = styled.View`
  margin-top: auto;
  justify-content: space-around;
  flex-direction: row;
`;

const Name = styled.Text`
  font-weight: bold;
`;
