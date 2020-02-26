import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Text, Button, ListItem, Icon, H3, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NAVIGATION_PARAMS, Colors } from '@constants';
import { useModal, Checkbox } from '@components';
import { AddWord } from '../organism';
import * as effects from '../effects';

export const PreviewDictionaryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const dictionary = navigation.getParam(NAVIGATION_PARAMS.preview_dictionary);
  const [words, setWords] = useState(dictionary.words || []);
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isEn, setIsEn] = useState(true);
  const [isRu, setIsRu] = useState(true);
  const [isMix, setIsMix] = useState(false);

  const onOnlyRu = () => setIsRu(!isRu);
  const onOnlyEn = () => setIsEn(!isEn);
  const onMix = () => setIsMix(!isMix);

  const onSaveWord = async fields => {
    const body = {
      ru: fields.ru,
      en: fields.en.map((item) => item.value),
      dictionary_id: dictionary.id
    };

    console.log(body);
    //const word = { id: words.length + 1, ru: { name: fields.ru[0] }, en: { name: fields.en } };

    //setWords([...words, word]);
    closeModal();
    //dispatch(effects.saveWord({ navigation, body }));
  };

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
        </CheckLine>

        {words.map(item => (
          <Line key={item.id}>
            <En>{isRu && <Text>{item.en.name}</Text>}</En>
            <Ru>
              {isEn && (
                <>
                  <Text>{item.ru.name}</Text>
                  <Text>{item.ru.name}</Text>
                  <Text>{item.ru.name}</Text>
                  <Text>{item.ru.name}</Text>
                </>
              )}
            </Ru>

            <Remove>
              <Button transparent>
                <Icon name="trash" />
              </Button>
            </Remove>
          </Line>
        ))}

        <Add>
          <Button bordered success onPress={openModal}>
            <Icon name="add" />
          </Button>
        </Add>

        <AddWord isOpenModal={isOpenModal} closeModal={closeModal} onSaveWord={onSaveWord} />
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
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray};
  padding: 10px;
`;

const Ru = styled.View`
  flex: 1;
  flex-direction: column;
`;

const En = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Remove = styled.View`
  position: absolute;
  top: 0;
  right: -10px;
`;

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const List = styled.View`
  margin-top: 10px;
`;

const Add = styled.View`
  margin-top: 20px;
  align-items: center;
`;
