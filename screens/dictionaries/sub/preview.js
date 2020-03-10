import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text, Button, Icon, H3, Content } from 'native-base';
import { NAVIGATION_PARAMS, Colors } from '@constants';
import { useModal, Checkbox } from '@components';
import { AddWord, RemoveWord } from '../organism';
import * as effects from '../effects';

export const PreviewDictionaryScreen = ({ navigation }) => {
  const { dictionaryWords } = useSelector(state => state.dictionariesScreen);
  const words = dictionaryWords;
  const dispatch = useDispatch();

  const dictionary = navigation.getParam(NAVIGATION_PARAMS.preview_dictionary);

  const [isEn, setIsEn] = useState(true);
  const [isRu, setIsRu] = useState(true);
  const [isMix, setIsMix] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deletedWord, setDeletedWord] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isDeleteWordOpenModal, deleteWordOpenModal, deleteWordCloseModal] = useModal();

  const onOnlyRu = () => setIsRu(!isRu);
  const onOnlyEn = () => setIsEn(!isEn);
  const onMix = () => setIsMix(!isMix);
  const onDelete = () => setIsDelete(!isDelete);

  const onSaveWord = async fields => {
    await dispatch(effects.saveWord({ fields, dictionary }));
    closeModal();
  };

  const onDeleteWord = item => {
    setDeletedWord(item);
    deleteWordOpenModal();
  };

  const onSubmitDeleteWord = id => {
    dispatch(effects.removeWord(id));
    deleteWordCloseModal();
  };

  useEffect(() => {
    dispatch(effects.setDictionaryWords(dictionary.words));
    setIsLoaded(true);

    return () => {
      dispatch(effects.setDictionaryWords([]));
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      dispatch(effects.setMixDictionaryWords(isMix));
    }
  }, [isMix]);

  if (!isLoaded) {
    return null;
  }

  return (
    //<KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={100}>
    <Content>
      <Container>
        {!words.length && <H3 style={{ textAlign: 'center' }}>У вас еще нет слов(</H3>}

        <CheckLine>
          <Checkbox checked={!isRu} text="только русский" onPress={onOnlyRu} />
          <Checkbox checked={!isEn} text="только английский" onPress={onOnlyEn} />
        </CheckLine>
        <CheckLine>
          <Checkbox checked={isMix} text="перемешать слова" onPress={onMix} />
          <Checkbox checked={isDelete} text="удалить слова" onPress={onDelete} />
        </CheckLine>

        {words.map(item => (
          <Line key={item.id}>
            <Item isShow={isRu}>
              <Text>{item.en.name}</Text>
            </Item>
            <Item isShow={isEn}>
              {item.ru.name.map((name, index) => (
                <Text key={index}>{name}</Text>
              ))}
            </Item>

            {!isDelete && (
              <Remove>
                <Button transparent onPress={() => onDeleteWord(item)}>
                  <Icon name="trash" />
                </Button>
              </Remove>
            )}
          </Line>
        ))}

        <Add>
          <Button bordered success onPress={openModal}>
            <Icon name="add" />
          </Button>
        </Add>

        <AddWord isOpenModal={isOpenModal} closeModal={closeModal} onSaveWord={onSaveWord} />
        <RemoveWord
          word={deletedWord}
          isOpenModal={isDeleteWordOpenModal}
          closeModal={deleteWordCloseModal}
          onDeleteWord={onSubmitDeleteWord}
        />
      </Container>
    </Content>
    //</KeyboardAvoidingView>
  );
};

PreviewDictionaryScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam(NAVIGATION_PARAMS.preview_dictionary).name
});

const CheckLine = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Line = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray};
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
`;

const Item = styled.View`
  flex: 1;
  flex-direction: column;
  opacity: ${p => (p.isShow ? 1 : 0)};
  padding-bottom: 10px;
  padding-top: 10px;
`;

const Remove = styled.View`
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const Add = styled.View`
  margin-top: 20px;
  align-items: center;
`;
