import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@components';
import { SCREENS, Colors } from '@constants';
import { HomeScreenProps, DictionaryItemProps } from './interfaces';
import { normalizePreviewDictionaries } from './utils';
import { useAppContext } from '@store';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { state } = useAppContext();
  const { dictionaries = [] } = state;
  const [dictionariesList, setDictionariesList] = useState([]);

  const onStart = () => {
    const selectedDictionaries = dictionariesList.filter((item) => item.isChecked).map((dict) => dict.id);

    // @ts-ignore
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

  const haveSelected = dictionariesList.some((item) => item.isChecked);

  useEffect(() => {
    if (!dictionaries.length) {
      // @ts-ignore
      navigation.navigate(SCREENS.DICTIONARIES);

      return;
    }

    const normalized = normalizePreviewDictionaries(dictionaries);
    setDictionariesList(normalized);
  }, [dictionaries]);

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
        <Button theme="green" text="Начать тренировку" width={190} disabled={!haveSelected} onPress={onStart} />
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

const Item = styled.View<DictionaryItemProps>`
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

const Name = styled.Text<DictionaryItemProps>`
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
