import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Content, Button, List, ListItem, Icon, H3, View, Input, Item } from 'native-base';
import { SCREENS } from '@constants';
import { BottomModal, useModal } from '@components';
import Modal from "react-native-modal";
import { Create } from './organism';
import * as effects from './effects';

import { ButtonLoader } from '@components';

export const DictionariesScreen = ({ navigation }) => {
  const { dictionaries } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal();
  //const [isOpen, setIsOpen] = useState(false);

  // const onClose = () => setIsOpen(false);
  // const onOpen = () => setIsOpen(true);

  const onCreate = body => {
    dispatch(effects.createDictionary({ navigation, body }));
  };

  const onPreview = dictionary => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { dictionary });
  };

  const onSettings = dictionary => {
    navigation.navigate(SCREENS.SETTINGS_DICTIONARY, { dictionary });
  };

  return (
    <Content>
      <Container>


        <Button info onPress={openModal}>
          <Text testID="create-button">{dictionaries.length ? 'Добавить' : 'Создать'}</Text>
        </Button>

        {/*<BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title='Hello'>*/}
        {/*  <Text>I am the modal content!</Text>*/}


        {/*  <Input placeholder="Название" />*/}
        {/*  <Text>I am the modal content!</Text>*/}
        {/*  <Button title="Hide modal" onPress={closeModal} />*/}
        {/*  <Text>I am the modal content!</Text>*/}
        {/*  <ButtonLoader*/}
        {/*    success*/}
        {/*    name="Cохранить"*/}
        {/*    width={130}*/}
        {/*  />*/}

        {/*</BottomModal>*/}


        {/*<Modal isVisible={isOpen} swipeDirection={['up', 'left', 'right', 'down']} onSwipeComplete={onClose} onBackdropPress={onClose} style={{ justifyContent: 'flex-end', margin: 0 }} useNativeDriver={true}>*/}
        {/*  <View style={{ justifyContent: 'flex-end', margin: 0 }}>*/}
        {/*    */}
        {/*  </View>*/}
        {/*</Modal>*/}

        {!dictionaries.length && (
          <H3 style={{ textAlign: 'center' }} testID="empty-title">
            У вас еще нет словаря(
          </H3>
        )}

        {dictionaries.length && (
          <List testID="list">
            {dictionaries.map(item => (
              <ListItem key={item.id} onPress={() => onPreview(item)} noIndent>
                <Text>{item.name}</Text>
                <Button
                  warning
                  transparent
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onPress={() => onSettings(item)}>
                  <Icon name="settings" />
                </Button>
              </ListItem>
            ))}
          </List>
        )}

        <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Новый словарь">
          <Create onCreate={onCreate} />
        </BottomModal>
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;
//
// const Create = styled.View`
//   margin-top: 20px;
//   flex: 1;
//   align-items: center;
// `;

DictionariesScreen.navigationOptions = {
  title: 'Словари'
};
