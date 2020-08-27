import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { SCREENS, NewColors as Colors } from '@constants';
import { BottomModal, useModal } from '@components';
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
    <Container>
      {/*{dictionaries.length ? (*/}
      {/*  <Title>Ваши словари:</Title>*/}
      {/*) : (*/}
      {/*  <Title testID="empty-title">Создайте свой первый словарь</Title>*/}
      {/*)}*/}

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

      <CreateButton>
        <TouchableWithoutFeedback onPress={openModal}>
          <FontAwesome name="plus" size={40} color={Colors.secondary} />
        </TouchableWithoutFeedback>
      </CreateButton>

      <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Новый словарь">
        <CreateDict onCreate={onCreate} />
      </BottomModal>
    </Container>
  );
};

const Container = styled.View``;

const List = styled.View`
  align-items: center;
  padding: 30px;
`;

const Item = styled.View`
  width: 100%;
  max-width: 315px;
  height: 115px;
  border-radius: 18px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  elevation: 4;
`;

const Name = styled.Text`
  font-family: Museo;
  font-size: 20px;
  color: ${Colors.white};
`;

const CreateButton = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${Colors.green};
  elevation: 4;
`;
