import React from 'react';
import styled from 'styled-components/native';
import { CenterModal, Button } from '@components';
import { DeleteWordModalProps } from '../interfaces';

export const DeleteWordModal: React.FC<DeleteWordModalProps> = ({
  word,
  isOpenModal,
  isLoading,
  closeModal,
  onDeleteWord,
}) => {
  if (!word) {
    return null;
  }

  return (
    <CenterModal
      theme="secondary"
      isOpenModal={isOpenModal}
      closeModal={closeModal}
      title={
        <>
          Удалить слово{'\n'}
          <Name>«{word.name}»</Name>?
        </>
      }>
      <Buttons>
        <Button theme="secondary" onPress={closeModal} text="Нет" width={100} />
        <Button theme="secondary" onPress={onDeleteWord} text="Да" width={100} useLoader={isLoading} />
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
