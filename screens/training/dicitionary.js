import React from 'react';
import styled from 'styled-components';
import { DeckSwiper, Card, Text, Icon, Item, H3, Input, Button } from 'native-base';

const words = [
  {
    id: '1',
    ru: 'Привет',
    en: 'Hello'
  },
  {
    id: '2',
    ru: 'Пока',
    en: 'Goodbay'
  }
];

const DictionaryTrainingScreen = () => {
  return (
    <Container>
      <DeckSwiper
        dataSource={words}
        renderItem={item => (
          <Card>
            <CardWrapper>
              <H3 style={{ textAlign: 'center' }}>{item.ru}</H3>
              <Answer>
                <Item error>
                  <Input placeholder="Ответь на русском" />
                  <Icon name="checkmark-circle" />
                  <Icon name="close-circle" />
                </Item>
              </Answer>
              <Сonfirm>
                <Button success transparent>
                  <Icon name="paw" style={{ fontSize: 40 }} />
                </Button>
              </Сonfirm>
              <Finsihed>
                <Button info>
                  <Text style={{ textAlign: 'center', flex: 1 }}>Завершить</Text>
                </Button>
              </Finsihed>
            </CardWrapper>
          </Card>
        )}></DeckSwiper>
    </Container>
  );
};

DictionaryTrainingScreen.navigationOptions = {
  title: 'Тренировка 1234'
};

const Container = styled.View`
  /* flex: 1; */
  padding: 10px;
  /* justify-content: center; */
`;

const CardWrapper = styled.View`
  padding: 20px;
`;

const Answer = styled.View`
  margin-top: 10px;
`;

const Сonfirm = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const Finsihed = styled.View`
  margin-top: 40px;
`;

export default DictionaryTrainingScreen;
