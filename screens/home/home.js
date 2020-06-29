import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { Content, ListItem, Text, Button, CheckBox } from 'native-base';
import { useSelector } from 'react-redux';
import { Title } from '@components';
import { SCREENS } from '@constants';
import { normalizeDictionaries } from './normalize';

export const HomeScreen = ({ navigation = {} }) => {
  const { dictionaries = [] } = useSelector((state) => state);
  const [dictionariesList, setDictionariesList] = useState([]);

  const onStart = () => {
    const selectedDictionaries = dictionariesList.filter((item) => item.checked).map((dict) => dict.id);

    navigation.navigate(SCREENS.DICTIONARY_TRAINING, { selectedDictionaries });
  };

  const onSelect = (id) => {
    const selected = dictionariesList.map((item) => {
      if (id === item.id) {
        item.checked = !item.checked;
      }

      return item;
    });

    setDictionariesList(selected);
  };

  const onClearSelect = () => {
    if (dictionariesList.length) {
      const unSelected = dictionariesList.map((item) => {
        item.checked = false;
        return item;
      });

      setDictionariesList(unSelected);
    }
  };

  const haveSelected = dictionariesList.some((item) => item.checked);

  useEffect(() => {
    if (!dictionaries.length) {
      navigation.navigate(SCREENS.DICTIONARIES);

      return;
    }

    const normalized = normalizeDictionaries(dictionaries);
    setDictionariesList(normalized);
  }, [dictionaries]);

  useFocusEffect(
    useCallback(() => {
      return () => onClearSelect();
    }, [])
  );

  return (
    <Content>
      <Container>
        {dictionaries.length ? (
          <Title>Выберите словарь для старта</Title>
        ) : (
          <Title>Чтобы начать тренировку, создайте свой первый словарь</Title>
        )}

        <Dictionaries>
          {dictionariesList.map((item) => (
            <ListItem key={item.id}>
              <CheckBox onPress={() => onSelect(item.id)} checked={item.checked} />
              <Item onPress={() => onSelect(item.id)}>
                <Name>{item.name}</Name>
              </Item>
            </ListItem>
          ))}
        </Dictionaries>

        {dictionariesList.length > 0 && (
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
