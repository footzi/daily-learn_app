import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

import {
  NewColors as Colors,
  PREVIEW_SLIDE_MENU_LEFT,
  PREVIEW_SLIDE_MENU_RIGHT,
  PREVIEW_SLIDE_MENU_DURATION,
  PREVIEW_FILTER_MODE,
  DICTIONARIES_EMPTY_MODE,
} from '@constants';
import { useModal, ButtonIcon } from '@components';
import { shuffleArray } from '@libs';
import { AddWordModal, DeleteWordModal } from './modals';
import { Empty } from '../empty';
import { PreviewScreenProps, PreviewScreenItemProps, SaveTranslateFields } from './interfaces';
import { normalizePreviewWords } from './utils';
import * as effects from './effects';

import { SlideMenu } from './slide-menu';

export const PreviewDictionaryScreen: React.FC<PreviewScreenProps> = ({ navigation, route }) => {
  const { dictionaries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { preview_dictionary = {} } = route.params;

  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState(PREVIEW_FILTER_MODE.NONE);
  const [isMix, setIsMix] = useState(false);
  const [deletedWord, setDeletedWord] = useState(null);

  const slideMenuRef = useRef(null);
  const [isOpenSlideMenu, setIsOpenSlideMenu] = useState(true);

  const [isOpenModal, openModal, closeModal] = useModal();
  const [isDeleteWordOpenModal, deleteWordOpenModal, deleteWordCloseModal] = useModal();

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

  const onSaveWord = async (fields: SaveTranslateFields) => {
    await dispatch(effects.saveWord({ fields, preview_dictionary }));
    closeModal();
  };

  const onDeleteWord = async () => {
    const ids = deletedWord.translates.map((item) => item.id);

    await dispatch(effects.removeWord(ids));
    deleteWordCloseModal();
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
        <ButtonIcon style={{ marginRight: 20 }} onPress={openModal}>
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
          <Container>
            <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
              {words.map((item) => (
                <TouchableWithoutFeedback key={item.groupId} onPress={() => onPressWordLine(item)}>
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

            <DeleteWordModal
              word={deletedWord}
              isOpenModal={isDeleteWordOpenModal}
              closeModal={deleteWordCloseModal}
              onDeleteWord={onDeleteWord}
            />
          </Container>

          <Animatable.View ref={slideMenuRef} easing="ease-in-out" useNativeDriver>
            <SlideMenu onMix={onMix} onFilter={onFilter} />
          </Animatable.View>
        </>
      )}

      <AddWordModal isOpenModal={isOpenModal} closeModal={closeModal} onSaveWord={onSaveWord} />
    </>
  );
};

const Container = styled.ScrollView`
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
