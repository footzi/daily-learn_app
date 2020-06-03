import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Content, ListItem, Text, Button, CheckBox } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '@components';
import { SCREENS } from '@constants';
import * as effects from './effects';

export const HomeScreen = ({ navigation }) => {
  const { data = {}, homeScreen = {} } = useSelector((state) => state);
  const { dictionaries = [] } = homeScreen;
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  const onStart = () => dispatch(effects.startTraining(navigation));
  const onSelect = (id) => dispatch(effects.selectDictionary(id));

  const haveSelected = dictionaries.some((item) => item.checked);

  useEffect(() => {
    dispatch(effects.setDictionaries(data));
    setIsReady(true);

    return () => setIsReady(false);
  }, [data]);

  useEffect(() => {
    if (!dictionaries.length && isReady) {
      navigation.navigate(SCREENS.DICTIONARIES);
    }
  }, [dictionaries]);

  return (
    <Content>
      <Container>
        {dictionaries.length ? (
          <Title>Выберите словарь для старта</Title>
        ) : (
          <Title>Чтобы начать тренировку, создайте свой первый словарь</Title>
        )}

        <Dictionaries>
          {dictionaries.map((item) => (
            <ListItem key={item.id}>
              <CheckBox onPress={() => onSelect(item.id)} checked={item.checked} />
              <Item onPress={() => onSelect(item.id)}>
                <Name>{item.name}</Name>
              </Item>
            </ListItem>
          ))}
        </Dictionaries>

        {dictionaries.length > 0 && (
          <Start>
            <Button info={haveSelected} disabled={!haveSelected} onPress={onStart}>
              <Text>Начать</Text>
            </Button>
          </Start>
        )}
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const Dictionaries = styled.View`
  margin-top: 20px;
`;

const Start = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Item = styled.TouchableOpacity`
  padding-left: 15px;
  flex: 1;
`;

const Name = styled.Text`
  align-self: flex-start;
`;
