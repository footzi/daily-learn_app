import React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Content, Button } from 'native-base';
import { ScrollView, TouchableNativeFeedback } from 'react-native';
import { SCREENS, NewColors as Colors } from '@constants';
import { Title, BottomModal, useModal } from '@components';
import { CreateDict } from './organism';
import * as effects from './effects';

export const DictionariesScreen = ({ navigation = {} }) => {
  const { dictionaries = [] } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal();

  const onCreate = (body) => dispatch(effects.createDictionary({ navigation, body, closeModal }));
  const onPreview = (preview_dictionary) => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  };
  // const onSettings = (dictionary) => navigation.navigate(SCREENS.SETTINGS_DICTIONARY, { dictionary });

  return (
    <Content>
      <Container>
        {dictionaries.length ? (
          <Title>Ваши словари:</Title>
        ) : (
          <Title testID="empty-title">Создайте свой первый словарь</Title>
        )}

        {dictionaries.length > 0 && (
          <ScrollView>
            <List>
              {dictionaries.map((item) => (
                <TouchableNativeFeedback
                  key={item.id}
                  background={TouchableNativeFeedback.Ripple(Colors.secondary)}
                  onPress={() => onPreview(item)}>
                  <Item>
                    <Name>{item.name}</Name>
                  </Item>
                </TouchableNativeFeedback>
              ))}
            </List>
          </ScrollView>
        )}

        <Create>
          <Button info onPress={openModal}>
            <Text testID="create-button">{dictionaries.length ? 'Добавить' : 'Создать'}</Text>
          </Button>
        </Create>

        <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Новый словарь">
          <CreateDict onCreate={onCreate} />
        </BottomModal>
      </Container>
    </Content>
  );
};

const Container = styled.View``;

const Create = styled.View`
  margin-top: 20px;
  flex: 1;
  align-items: center;
`;

const List = styled.View`
  align-items: center;
`;

const Item = styled.View`
  width: 315px;
  height: 115px;
  border-radius: 18px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Name = styled.Text`
  font-family: Museo;
  font-size: 20px;
  color: ${Colors.white};
`;
