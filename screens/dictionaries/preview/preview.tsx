import { ButtonIcon, useModal } from '@components';
import {
  Colors,
  DICTIONARIES_EMPTY_MODE,
  PREVIEW_FILTER_MODE,
  PREVIEW_SLIDE_MENU_DURATION,
  PREVIEW_SLIDE_MENU_LEFT,
  PREVIEW_SLIDE_MENU_RIGHT,
} from '@constants';
import { Feather } from '@expo/vector-icons';
import { shuffleArray } from '@libs';
import { useAppContext } from '@store';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';

import { Empty } from '../Empty';
import { AddWordModal, DeleteWordModal } from './Modals';
import { SlideMenu } from './Slide-menu';
import { useCreateWord } from './hooks/useCreateWord';
import { useDeleteWord } from './hooks/useDeleteWord';
import { PreviewScreenItemProps, PreviewScreenProps, SaveFieldsWord } from './interfaces';
import { normalizePreviewWords } from './utils';

export const PreviewDictionaryScreen: React.FC<PreviewScreenProps> = ({ navigation, route }) => {
  const { state } = useAppContext();
  const { dictionaries } = state;
  const { preview_dictionary } = route.params;

  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState(PREVIEW_FILTER_MODE.NONE);
  const [isMix, setIsMix] = useState(false);
  const [deletedWord, setDeletedWord] = useState(null);

  const slideMenuRef = useRef(null);
  const [isOpenSlideMenu, setIsOpenSlideMenu] = useState(true);

  const { isOpenModal: isAddWordOpenModal, openModal: addWordOpenModal, closeModal: addWordCloseModal } = useModal();
  const {
    isOpenModal: isDeleteWordOpenModal,
    openModal: deleteWordOpenModal,
    closeModal: deleteWordCloseModal,
  } = useModal();

  const { createWord, isLoading: isLoadingCreateWord } = useCreateWord();
  const { deleteWord, isLoading: isLoadingDeleteWord } = useDeleteWord();

  const isEmptyDictionary = !words.length;

  const getCurrentWords = () => {
    const currentDictionary = dictionaries.find((item) => item.id === preview_dictionary.id);

    if (currentDictionary) {
      const dictionaryWords = currentDictionary.words;
      return normalizePreviewWords(dictionaryWords);
    } else {
      return [];
    }
  };

  const openSlideMenu = () => {
    if (!isOpenSlideMenu) {
      slideMenuRef.current.animate(PREVIEW_SLIDE_MENU_LEFT, PREVIEW_SLIDE_MENU_DURATION);
      setIsOpenSlideMenu(true);
    }
  };

  const closeSlideMenu = () => {
    if (isOpenSlideMenu) {
      slideMenuRef.current.animate(PREVIEW_SLIDE_MENU_RIGHT, PREVIEW_SLIDE_MENU_DURATION);
      setIsOpenSlideMenu(false);
    }
  };

  const onMix = () => {
    const newWords = isMix ? getCurrentWords() : shuffleArray([...words]);

    setWords(newWords);
    setIsMix(!isMix);
  };

  const onFilter = () => {
    switch (filter) {
      case PREVIEW_FILTER_MODE.NONE:
        setFilter(PREVIEW_FILTER_MODE.RU);
        break;
      case PREVIEW_FILTER_MODE.RU:
        setFilter(PREVIEW_FILTER_MODE.EN);
        break;
      case PREVIEW_FILTER_MODE.EN:
        setFilter(PREVIEW_FILTER_MODE.NONE);
        break;
    }
  };

  const onSaveWord = async (fields: SaveFieldsWord) => {
    createWord(fields, preview_dictionary.id, addWordCloseModal);
  };

  const onDeleteWord = async () => {
    const ids = deletedWord.translates.map((item) => item.id);
    deleteWord(ids, deleteWordCloseModal);
  };

  const onSwipeRight = () => closeSlideMenu();

  const onSwipeLeft = () => openSlideMenu();

  const onPressWordLine = (item) => {
    setDeletedWord(item);
    deleteWordOpenModal();
  };

  useEffect(() => {
    const currentWords = getCurrentWords();
    setWords(currentWords);
  }, [dictionaries]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: preview_dictionary.name,
      headerRight: () => (
        <ButtonIcon style={{ marginRight: 20 }} onPress={addWordOpenModal}>
          <Feather name="plus-circle" size={26} color={Colors.primary} />
        </ButtonIcon>
      ),
    });
  }, [navigation]);

  return (
    <>
      {isEmptyDictionary && <Empty mode={DICTIONARIES_EMPTY_MODE.PREVIEW} />}

      {!isEmptyDictionary && (
        <>
          <ScrollView>
            <List>
              <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
                {words.map((item) => (
                  <TouchableWithoutFeedback key={item.groupId} onLongPress={() => onPressWordLine(item)}>
                    <Line>
                      <Item isHide={filter === PREVIEW_FILTER_MODE.RU}>
                        <WordName>{item.name}</WordName>
                      </Item>
                      <Item isHide={filter === PREVIEW_FILTER_MODE.EN}>
                        {item.translates.map(({ id, translate }) => (
                          <WordName key={id}>{translate}</WordName>
                        ))}
                      </Item>
                    </Line>
                  </TouchableWithoutFeedback>
                ))}
              </GestureRecognizer>
            </List>
          </ScrollView>

          <DeleteWordModal
            word={deletedWord}
            isOpenModal={isDeleteWordOpenModal}
            isLoading={isLoadingDeleteWord}
            closeModal={deleteWordCloseModal}
            onDeleteWord={onDeleteWord}
          />

          <Animatable.View ref={slideMenuRef} easing="ease-in-out" useNativeDriver>
            <SlideMenu onMix={onMix} onFilter={onFilter} />
          </Animatable.View>
        </>
      )}

      <AddWordModal
        isOpenModal={isAddWordOpenModal}
        isLoading={isLoadingCreateWord}
        closeModal={addWordCloseModal}
        onSaveWord={onSaveWord}
      />
    </>
  );
};

const List = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const Line = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.whisper};
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
`;

const Item = styled.View<PreviewScreenItemProps>`
  flex: 1;
  flex-direction: column;
  opacity: ${({ isHide }) => (isHide ? 0 : 1)};
  padding-bottom: 12px;
  padding-top: 12px;
`;

const WordName = styled.Text`
  font-family: Museo;
  font-size: 17px;
  color: ${Colors.coal};
  margin-right: 10px;
`;
