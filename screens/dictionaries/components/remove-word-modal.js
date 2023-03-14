import React from 'react';
import styled from 'styled-components/native';
import { Button, CenterModal } from '@/components';
import { NewColors as Colors } from '@/constants';

export const RemoveWordModal = ({ word, isOpenModal, isLoading, closeModal, onDeleteWord }) => {
  if (!word) {
    return null;
  }

  return (
    <CenterModal isOpenModal={isOpenModal} closeModal={closeModal} isInverse>
      <Text>
        Удалить слово{'\n'}"<Name>{word.name}</Name>"?
      </Text>
      <Buttons>
        <Item style={{ marginRight: 20 }}>
          <Button text="Отмена" onPress={closeModal} theme="white" />
        </Item>

        <Item>
          <Button text="Да" onPress={onDeleteWord} theme="ultram" isLoading={isLoading} />
        </Item>
      </Buttons>
    </CenterModal>
  );
};

const Buttons = styled.View`
  margin-top: 30px;
  flex-direction: row;
`;

const Item = styled.View`
  flex-basis: 50%;
`;

const Text = styled.Text`
  font-family: RobotoRegular;
  font-size: 16px;
  text-align: center;
`;

const Name = styled.Text`
  font-weight: bold;
  color: ${Colors.secondary};
`;
