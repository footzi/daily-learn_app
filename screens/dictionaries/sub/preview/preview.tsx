import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { Button, Icon, H3, Content } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import {
  NewColors as Colors,
  PREVIEW_SLIDE_MENU_LEFT,
  PREVIEW_SLIDE_MENU_RIGHT,
  PREVIEW_SLIDE_MENU_DURATION,
} from '@constants';
import { useModal, HeaderModal, Checkbox, ButtonIcon } from '@components';
import { shuffleArray } from '@libs';
import { AddWord } from '../../organism/index';
import { DeleteWordModal } from './modals';
import { PreviewScreenProps, PreviewScreenItemProps } from './interfaces';
import { normalizePreviewWords } from '../../normalize';
import * as effects from '../../effects';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { SlideMenu } from './slide-menu';

enum FILTER_MODE {
  NONE = 'NONE',
  EN = 'EN',
  RU = 'RU',
}
export const PreviewDictionaryScreen: React.FC<PreviewScreenProps> = ({ navigation, route }) => {
  const { dictionaries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { preview_dictionary = {} } = route.params;

  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState(FILTER_MODE.NONE);
  const [isMix, setIsMix] = useState(false);
  const [deletedWord, setDeletedWord] = useState(null);

  const slideMenuRef = useRef(null);
  const [isOpenSlideMenu, setIsOpenSlideMenu] = useState(true);

  const [isOpenModal, openModal, closeModal] = useModal();
  const [isHeaderOpenModal, headerOpenModal, headerCloseModal] = useModal();
  const [isDeleteWordOpenModal, deleteWordOpenModal, deleteWordCloseModal] = useModal();

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
      case FILTER_MODE.NONE:
        setFilter(FILTER_MODE.RU);
        break;
      case FILTER_MODE.RU:
        setFilter(FILTER_MODE.EN);
        break;
      case FILTER_MODE.EN:
        setFilter(FILTER_MODE.NONE);
        break;
    }
  };

  const onSaveWord = async (fields) => {
    await dispatch(effects.saveWord({ fields, preview_dictionary }));
    closeModal();
  };

  const onDeleteWord = (item) => {
    console.log('test');
    // setDeletedWord(item);
    // deleteWordOpenModal();
  };

  const onSubmitDeleteWord = async () => {
    console.log('test');
    // const ids = deletedWord.translates.map((item) => item.id);

    // await dispatch(effects.removeWord(ids));
    // setDeletedWord(null);
    // deleteWordCloseModal();
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
    // setCurrentWords();
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
  }, [navigation, isHeaderOpenModal]);

  return (
    <>
      <Content>
        <Container>
          {!words.length && <H3 style={{ textAlign: 'center' }}>У вас еще нет слов(</H3>}

          <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
            {words.map((item) => (
              <TouchableNativeFeedback key={item.groupId} onPress={() => onPressWordLine(item)}>
                <Line>
                  <Item isHide={filter === FILTER_MODE.RU}>
                    <WordName>{item.name}</WordName>
                  </Item>
                  <Item isHide={filter === FILTER_MODE.EN}>
                    {item.translates.map(({ id, translate }) => (
                      <WordName key={id}>{translate}</WordName>
                    ))}
                  </Item>
                </Line>
              </TouchableNativeFeedback>
            ))}
          </GestureRecognizer>

          <AddWord isOpenModal={isOpenModal} closeModal={closeModal} onSaveWord={onSaveWord} />
          <DeleteWordModal
            word={deletedWord}
            isOpenModal={isDeleteWordOpenModal}
            closeModal={deleteWordCloseModal}
            onDeleteWord={onSubmitDeleteWord}
          />
        </Container>
      </Content>

      <Animatable.View ref={slideMenuRef} easing="ease-in-out" useNativeDriver>
        <SlideMenu onMix={onMix} onFilter={onFilter} />
      </Animatable.View>
    </>
  );
};

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

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;
