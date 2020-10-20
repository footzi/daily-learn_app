import React from 'react';
import styled from 'styled-components/native';
import { CenterModal, Button } from '@components';
import { NewColors as Colors } from '@constants';
import { DeleteWordModalProps } from '../interfaces';

export const DeleteWordModal: React.FC<DeleteWordModalProps> = ({ word, isOpenModal, closeModal, onDeleteWord }) => {
  if (!word) {
    return null;
  }
  const isLoading = false;

  return (
    <CenterModal theme="secondary" isOpenModal={isOpenModal} closeModal={closeModal}>
      <Text>
        Удалить слово <Name>{word.name}</Name>?
      </Text>
      <Buttons>
        <Button theme="secondary" onPress={closeModal} text="Нет" width={100} />
        <Button theme="secondary" onPress={onDeleteWord} text="Да" width={100} useLoader={isLoading} />
      </Buttons>
    </CenterModal>
  );
};

const Text = styled.Text`
  font-family: Museo;
  font-size: 16px;
  text-align: center;
  color: ${Colors.coal};
  margin-top: 20px;
`;

const Buttons = styled.View`
  margin-top: auto;
  justify-content: space-around;
  flex-direction: row;
`;

const Name = styled.Text`
  font-weight: bold;
`;
