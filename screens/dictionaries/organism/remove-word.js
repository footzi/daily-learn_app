import React from 'react';
import styled from 'styled-components';
import { Button, Text } from 'native-base';
import { BottomModal, ButtonLoader } from '@components';

export const RemoveWord = ({ word = {}, isOpenModal = true, closeModal = () => {}, onDeleteWord = () => {} }) => {
  if (!Object.keys(word).length) {
    return null;
  }

  return (
    <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Удалить слово">
      <Text>
        Вы действительно хотите удалить <Name>{word.name}</Name>?
      </Text>
      <Buttons>
        <Item style={{ marginRight: 20 }}>
          <Button success onPress={closeModal}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Закрыть</Text>
          </Button>
        </Item>

        <Item>
          <ButtonLoader name="Удалить" danger onPress={onDeleteWord} />
        </Item>
      </Buttons>
    </BottomModal>
  );
};

const Buttons = styled.View`
  margin-top: 30px;
  flex-direction: row;
`;

const Item = styled.View`
  flex-basis: 50%;
`;

const Name = styled.Text`
  font-weight: bold;
`;
