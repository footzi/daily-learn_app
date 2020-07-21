import React, { useState, useEffect, useCallback } from 'react';
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@components';
import { SCREENS } from '@constants';
import { normalizeDictionaries } from './normalize';
import { NewColors as Colors } from '../../constants';

export const HomeScreen = ({ navigation = {} }) => {
  const { dictionaries = [] } = useSelector((state) => state);
  const [dictionariesList, setDictionariesList] = useState([]);

  const onStart = () => {
    const selectedDictionaries = dictionariesList.filter((item) => item.isChecked).map((dict) => dict.id);

    navigation.navigate(SCREENS.DICTIONARY_TRAINING, { selectedDictionaries });
  };

  const onSelect = (id) => {
    const selected = dictionariesList.map((item) => {
      if (id === item.id) {
        item.isChecked = !item.isChecked;
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

  const haveSelected = dictionariesList.some((item) => item.isChecked);

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
    <>
      <ScrollView>
        <Dictionaries>
          {dictionariesList.map(({ id, name, isChecked }) => (
            <TouchableWithoutFeedback key={id} onPress={() => onSelect(id)}>
              <Item isChecked={isChecked}>
                <Name isChecked={isChecked}>{name}</Name>
                <AntDesign name="plus" size={40} color={Colors.primary} style={{ opacity: isChecked ? 0 : 1 }} />
              </Item>
            </TouchableWithoutFeedback>
          ))}
        </Dictionaries>
      </ScrollView>

      <Start>
        <Button theme="green" text="Начать тренировку" width={190} disabled={!haveSelected} onPress={onStart}/>
      </Start>
    </>
  );
};

const Dictionaries = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  flex: 1;
  align-items: center;
`;

const Item = styled.View`
  width: 320px;
  height: 60px;
  border: 1px solid ${Colors.primary};
  background-color: ${({ isChecked }) => (isChecked ? Colors.primary : Colors.secondary)};
  border-radius: 15px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 25px;
  padding-right: 25px;
`;

const Name = styled.Text`
  font-family: Museo;
  font-size: 20px;
  color: ${({ isChecked }) => (isChecked ? Colors.secondary : Colors.primary)};
`;

const Start = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10px;
  align-items: center;
`;
// const Container = styled.View`
//   padding: 10px;
//   flex-direction: column;
// `;
//
// const Dictionaries = styled.View`
//   margin-top: 20px;
// `;
//
// const Start = styled.View`
//   margin-top: 20px;
//   align-items: center;
// `;
//
// const Item = styled.TouchableOpacity`
//   padding-left: 15px;
//   flex: 1;
// `;
//
// const Name = styled.Text`
//   align-self: flex-start;
// `;
