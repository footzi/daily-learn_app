import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Text, Button, ListItem, Icon, H3, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NAVIGATION_PARAMS } from '@constants';
import { useModal } from '@components';
import { AddWord } from '../organism';
import * as effects from '../effects';

export const PreviewDictionaryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const dictionary = navigation.getParam(NAVIGATION_PARAMS.preview_dictionary);
  const [words, setWords] = useState(dictionary.words || []);
  const [isOpenModal, openModal, closeModal] = useModal();

  const onSaveWord = async fields => {
    // const body = {
    //   ru: fields.ru,
    //   en: fields.en,
    //   dictionary_id: dictionary.id
    // };
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

        <List>
            {words.map(item => (
              <ListItem noIndent>
                <Rows>
                  <Ru>

                    <Text>{item.en.name}</Text>
                  </Ru>

                  <En>
                    <Text>{item.ru.name}</Text>
                    <Text>{item.ru.name}</Text>
                    <Text>{item.ru.name}</Text>
                  </En>
                </Rows>

                {/*<Remove>*/}
                {/*  <Button transparent>*/}
                {/*    <Icon name="trash" />*/}
                {/*  </Button>*/}
                {/*</Remove>*/}
              </ListItem>

            ))}
        </List>

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


const Rows = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const Ru = styled.View`
flex: 0.5;
align-items: flex-start;
justify-content: flex-start;
text-align: left;
`;

const En = styled.View`
flex: 0.5;
`;

const Remove = styled.View`
  position: absolute;
  right: 0;
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
