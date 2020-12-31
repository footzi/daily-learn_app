import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { SCREENS, Colors, DICTIONARIES_EMPTY_MODE } from '@constants';
import { useModal } from '@components';
import { InitStateInterface, Dictionary } from '@store';
import { DictionariesListScreenProps } from './interfaces';
import { CreateDictModal, DeleteDictModal } from './modals';
import * as effects from './effects';
import { Empty } from '../empty';

export const DictionariesListScreen: React.FC<DictionariesListScreenProps> = ({ navigation }) => {
  const { dictionaries = [] } = useSelector((state: InitStateInterface) => state);
  const dispatch = useDispatch();
  const [isCreateOpenModal, openCreateModal, closeCreateModal] = useModal();
  const [isDeleteOpenModal, openDeleteModal, closeDeleteModal] = useModal();
  const [deletedDict, setDeletedDict] = useState(null);
  const isEmptyList = !dictionaries.length;

  const onCreate = async (name: string) => {
    await dispatch(effects.createDictionary({ navigation, name }));
    closeCreateModal();
  };

  const onPreview = (preview_dictionary: Dictionary) => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  };

  const onLongPress = (id: number, name: string) => {
    setDeletedDict({ id, name });
    openDeleteModal();
  };

  const onDelete = async () => {
    const { id } = deletedDict;
    await dispatch(effects.deleteDictionary({ id }));
    closeDeleteModal();
  };

  return (
    <>
      {isEmptyList && <Empty mode={DICTIONARIES_EMPTY_MODE.LIST} />}

      {!isEmptyList && (
        <>
          <ScrollView>
            <List>
              {dictionaries.map((item: Dictionary) => (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => onPreview(item)}
                  onLongPress={() => onLongPress(item.id, item.name)}>
                  <Item>
                    <Name>{item.name}</Name>
                  </Item>
                </TouchableWithoutFeedback>
              ))}
            </List>
          </ScrollView>

          <DeleteDictModal
            dict={deletedDict}
            isOpenModal={isDeleteOpenModal}
            closeModal={closeDeleteModal}
            onDelete={onDelete}
          />
        </>
      )}

      <CreateButton>
        <TouchableWithoutFeedback onPress={openCreateModal}>
          <FontAwesome name="plus" size={40} color={Colors.secondary} />
        </TouchableWithoutFeedback>
      </CreateButton>
      <CreateDictModal isOpenModal={isCreateOpenModal} closeModal={closeCreateModal} onCreate={onCreate} />
    </>
  );
};

const List = styled.View`
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
  padding-top: 3px;
`;
