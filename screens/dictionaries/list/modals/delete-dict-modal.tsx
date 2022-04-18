import { Button, CenterModal } from '@components';
import React from 'react';
import styled from 'styled-components/native';

import { DeleteDictModalProps } from '../interfaces';

export const DeleteDictModal: React.FC<DeleteDictModalProps> = ({
  dict,
  isOpenModal,
  isLoading,
  closeModal,
  onDelete,
}) => {
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
