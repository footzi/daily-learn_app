import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, Input, Item, H3, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ButtonLoader from '../../components/buttons';

const words = [
  {
    ru: 'Привет',
    en: 'Hello'
  },
  {
    ru: 'Пока',
    en: 'Goodbye'
  },
  {
    ru: 'Собака',
    en: 'Dog'
  },
  {
    ru: 'Кошка',
    en: 'Cat'
  },
  {
    ru: 'Обычно',
    en: 'Usually'
  },
  {
    ru: 'Всегда',
    en: 'Аlways'
  },
  {
    ru: 'Дом',
    en: 'House'
  },
  {
    ru: '1',
    en: 'Usually'
  },
  {
    ru: '2',
    en: 'Аlways'
  },
  {
    ru: '3',
    en: 'House'
  },
  {
    ru: '4',
    en: 'Usually'
  },
  {
    ru: '5',
    en: 'Аlways'
  },
  {
    ru: '6',
    en: 'House'
  },
  {
    ru: '7',
    en: 'Usually'
  },
  {
    ru: '8',
    en: 'Аlways'
  },
  {
    ru: '9',
    en: 'House'
  }
];

const PreviewDictionaryScreen = () => {
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

  const onSave = () => {
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
        <List>
          <Grid>
            {words.map(item => (
              <Row style={{ height: 40 }} key={item.ru}>
                <Col>
                  <Text style={{ textAlign: 'center' }}>{item.ru}</Text>
                </Col>
                <Col>
                  <Text style={{ textAlign: 'center' }}>{item.en}</Text>
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
              <ButtonLoader success name="Cохранить" width={130} onPress={onSave} disabled={!isValid} />
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
  title: navigation.getParam('name')
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

export default PreviewDictionaryScreen;
