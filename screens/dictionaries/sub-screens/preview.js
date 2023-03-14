import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import PlusIcon from '@/assets/icons/plus.svg';
import { useModal, ButtonIcon } from '@/components';
import { NewColors as Colors, LOADING_ITEMS } from '@constants';
import { normalizePreviewWords } from '../normalize';
import * as effects from '../effects';
import { AddWordModal, RemoveWordModal } from '../components';

export const PreviewDictionaryScreen = ({ navigation = {}, route = {} }) => {
  const { dictionaries, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isDeleteWordOpenModal, deleteWordOpenModal, deleteWordCloseModal] = useModal();
  const { preview_dictionary = {} } = route.params;
  const isLoading = loading[LOADING_ITEMS.INNER];

  const [words, setWords] = useState([]);
  const [deletedWord, setDeletedWord] = useState(null);

  const handleSaveWord = async (fields) => {
    await dispatch(effects.saveWord({ fields, preview_dictionary }));
  };

  const handleLineClick = (item) => {
    setDeletedWord(item);
    deleteWordOpenModal();
  };

  const handleSubmitDeleteWord = async () => {
    const ids = deletedWord.translates.map((item) => item.id);

    await dispatch(effects.removeWord(ids));
    setDeletedWord('');
    deleteWordCloseModal();
  };

  useEffect(() => {
    const currentDictionary = dictionaries.find((item) => item.id === preview_dictionary.id);

    if (currentDictionary) {
      const dictionaryWords = currentDictionary.words;
      const currentWords = normalizePreviewWords(dictionaryWords);

      setWords(currentWords);
    }
  }, [dictionaries]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <ButtonIcon onPress={openModal}>
            <PlusIcon color={Colors.primary} />
          </ButtonIcon>
        </HeaderRight>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      {!words.length && (
        <ImageContainer>
          <Image style={{ width: 195, height: 270 }} source={require('@/assets/images/not-words.png')} />
        </ImageContainer>
      )}

      {words.length > 0 && (
        <ScrollView>
          <List>
            {words.map((item) => (
              <TouchableWithoutFeedback onPress={() => handleLineClick(item)} key={item.groupId}>
                <Line>
                  <Item>
                    <Text>{item.name}</Text>
                  </Item>

                  <Item>
                    {item.translates.map(({ id, translate }) => (
                      <Text key={id}>{translate}</Text>
                    ))}
                  </Item>
                </Line>
              </TouchableWithoutFeedback>
            ))}
          </List>
        </ScrollView>
      )}

      <AddWordModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        onSaveWord={handleSaveWord}
        isLoading={isLoading}
      />

      <RemoveWordModal
        word={deletedWord}
        isOpenModal={isDeleteWordOpenModal}
        closeModal={deleteWordCloseModal}
        onDeleteWord={handleSubmitDeleteWord}
        isLoading={isLoading}
      />
    </Container>
  );
};

const HeaderRight = styled.View`
  margin-right: 20px;
`;

const Container = styled.View``;

const ImageContainer = styled.View`
  align-items: center;
  margin-top: 96px;
`;

const List = styled.View`
  padding: 32px 20px;
`;

const Line = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.light};
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
`;

const Item = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: 7px;
  padding-top: 7px;
`;

const Text = styled.Text`
  color: ${Colors.dust};
  font-size: 16px;
  font-family: RobotoRegular;
`;
