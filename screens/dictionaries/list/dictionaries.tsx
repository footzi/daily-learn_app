import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SCREENS, Colors, DICTIONARIES_EMPTY_MODE } from '@constants';
import { useModal } from '@components';
import { Dictionary } from '@interfaces';
import { DictionariesListScreenProps } from './interfaces';
import { CreateDictModal, DeleteDictModal } from './modals';
import { Empty } from '../Empty';
import { AppContext } from '../../../store/new-store';
import { useCreateDictionary } from '../hooks/useCreateDictionary';
import { useDeleteDictionary } from '../hooks/useDeleteDictionary';

export const DictionariesListScreen: React.FC<DictionariesListScreenProps> = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const { dictionaries = [] } = state;

  const { createDictionary, isLoading: isLoadingCreateDictionary } = useCreateDictionary();
  const { deleteDictionary, isLoading: isLoadingDeleteDictionary } = useDeleteDictionary();

  const { isOpenModal: isCreateOpenModal, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpenModal: isDeleteOpenModal, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [deletedDict, setDeletedDict] = useState(null);
  const isEmptyList = !dictionaries.length;

  const onCreate = (name: string) => {
    createDictionary(name, closeCreateModal);
  };

  const onPreview = (preview_dictionary: Dictionary) => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  };

  const onLongPress = (id: number, name: string) => {
    setDeletedDict({ id, name });
    openDeleteModal();
  };

  const onDelete = () => {
    const { id } = deletedDict;
    deleteDictionary(id, closeDeleteModal);
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
            isLoading={isLoadingDeleteDictionary}
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
      <CreateDictModal
        isOpenModal={isCreateOpenModal}
        closeModal={closeCreateModal}
        onCreate={onCreate}
        isLoading={isLoadingCreateDictionary}
      />
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
