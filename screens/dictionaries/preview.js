import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, Input, Item, Icon, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ButtonLoader from '../../components/buttons';
import * as effects from './effects';

const mapDispatchToProps = {
  saveWord: effects.saveWord
};

const PreviewDictionaryScreen = ({ navigation, saveWord }) => {
  const dictionary = navigation.getParam('dictionary');
  const { words = [] } = dictionary;

  const [isAdd, setIsAdd] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [fields, setFields] = useState({
    ru: '',
    en: ''
  });

  const onChangeInput = (text, name) => {
    setFields({
      ...fields,
      [name]: text
    });
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onSaveWord = () => {
    const body = {
      ru: fields.ru,
      en: fields.en,
      dictionary_id: dictionary.id
    };

    console.log('onSaveWord');

    saveWord({ navigation, body });
    setIsAdd(false);
    setFields({ ru: '', en: '' });
  };

  // todo Проверить правильность валидации. сделать проверку на языки
  useEffect(() => {
    setIsValid(fields.ru && fields.en);
  }, [fields]);

  return (
    <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={100}>
      <Container>
        {!words.length && <H3 style={{ textAlign: 'center' }}>У вас еще нет слов(</H3>}

        <List>
          <Grid>
            {words.map(item => (
              <Row style={{ height: 40 }} key={item.id}>
                <Col>
                  <Text style={{ textAlign: 'center' }}>{item.ru.name}</Text>
                </Col>
                <Col>
                  <Text style={{ textAlign: 'center' }}>{item.en.name}</Text>
                </Col>
              </Row>
            ))}
          </Grid>
        </List>

        {isAdd && (
          <InputGroup>
            <Item inlineLabel>
              <Input placeholder="English" onChangeText={text => onChangeInput(text, 'en')} value={fields.en} />
            </Item>
            <Item inlineLabel>
              <Input placeholder="Русский" onChangeText={text => onChangeInput(text, 'ru')} value={fields.ru} />
            </Item>

            <Save>
              <ButtonLoader success={!!isValid} name="Cохранить" width={130} onPress={onSaveWord} disabled={!isValid} />
            </Save>
          </InputGroup>
        )}

        {!isAdd && (
          <Add>
            <Button bordered success onPress={onAdd}>
              <Icon name="add" />
            </Button>
          </Add>
        )}
      </Container>
    </KeyboardAwareScrollView>
  );
};

PreviewDictionaryScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('dictionary').name
});

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const List = styled.View`
  margin-top: 10px;
`;

const InputGroup = styled.View``;

const Add = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Save = styled.View`
  flex: 1;
  margin-top: 30px;
  align-items: center;
`;

export default connect(
  null,
  mapDispatchToProps
)(PreviewDictionaryScreen);
