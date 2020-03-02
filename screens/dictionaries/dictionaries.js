import React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Content, Button, List, ListItem, Icon, H3 } from 'native-base';
import { SCREENS } from '@constants';
import { BottomModal, useModal } from '@components';
import { CreateDict } from './organism';
import * as effects from './effects';

export const DictionariesScreen = ({ navigation }) => {
  const { dictionaries } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal();

  const onCreate = body => dispatch(effects.createDictionary({ navigation, body, closeModal }));
  const onPreview = preview_dictionary => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary }); //NAVIGATION_PARAMS.preview_dictionary
  };
  const onSettings = dictionary => navigation.navigate(SCREENS.SETTINGS_DICTIONARY, { dictionary });

  return (
    <Content>
      <Container>
        {!dictionaries.length && (
          <H3 style={{ textAlign: 'center' }} testID="empty-title">
            У вас еще нет словаря(
          </H3>
        )}

        {dictionaries.length > 0 && (
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

const Container = styled.View`
  padding: 10px;
`;

const Create = styled.View`
  margin-top: 20px;
  flex: 1;
  align-items: center;
`;

DictionariesScreen.navigationOptions = {
  title: 'Словари'
};
